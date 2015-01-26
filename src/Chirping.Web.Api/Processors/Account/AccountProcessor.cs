#region using directives

using AutoMapper;
using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Repository.Authorization;
using Chirping.Web.Api.Diagnostics;
using Microsoft.AspNet.Identity;
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

#endregion

namespace Chirping.Web.Api.Processors.Account
{
    // processes the Http requests related to account/security requests (i.e. registering user, log a user in, etc)
    public class AccountProcessor : IAccountProcessor, IDisposable
    {
        #region constructor

        private IAccountRepository _repository;

        public AccountProcessor(IAccountRepository repository)
        {
            this._repository = repository;
        }

        #endregion
        
        // processes the Http request for a user registration
        public async Task<IdentityResult> RegisterUser(RegisterBindingModel registerUser)
        {
            TraceVerbose(LogEvent.InfoRegisteringUser, "Start registering user with e-mail: '{0}'", registerUser.Email);

            var user = Mapper.Map<RegisterBindingModel, UserAccount>(registerUser);

            if (ProfileImageSelected(registerUser.Profile.ProfileImage))
            {
                user.ProfileImage = string.Format("{0}.jpg", System.Uri.EscapeDataString(registerUser.Email));
            }

            RegisterUserResult result = await _repository.RegisterUser(user);
            
            if (result.IdentityResult.Succeeded)
            {
                // send confirmation e-mail
                await SendConfirmationEmail(result.UserId);
                
                // store the profile picture in Azure cloud storage
                StoreProfileImage(registerUser.Profile.ProfileImage, user.ProfileImage, result.UserId);
            }

            return result.IdentityResult;
        }

        // sends a confirmation e-mail to the just registered user
        private async Task SendConfirmationEmail(string userId)
        {
            TraceVerbose(LogEvent.InfoRegisteringUser, "Start sending confirmation e-mail for userId: '{0}'", userId);

            // generate confirm email token and encode the Url
            var code = await _repository.GenerateEmailConfirmationTokenAsync(userId);
            var encodedCode = HttpUtility.UrlEncode(code);

            var baseUri = new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority));
            var url = string.Format("/api/Account/ConfirmEmail/?UserId={0}&Code={1}", userId, encodedCode);
            var callbackUrl = new Uri(baseUri, url).ToString();
            
            var subject = "Confirm your account";
            var body = "Please confirm your account by click this link: <a href=\"" + callbackUrl + "\">link</a>";

            await _repository.SendEmailAsync(userId, subject, body);
        }

        private void StoreProfileImage(string profileImage, string imageFileName, string userId)
        {
            if (!ProfileImageSelected(profileImage))
                return;

            TraceVerbose(LogEvent.InfoRegisteringUser, "Storing profile in azure storage for user: '{0}'", userId);

            TryStoringProfileImage(profileImage, imageFileName, userId);
        }

        private static void TryStoringProfileImage(string profileImage, string imageFileName, string userId)
        {
            try
            {
                var store = new ImageStore();
                store.StoreImage(profileImage, imageFileName);
            }
            catch (Exception ex)
            {
                using (var logScope = new LogOperationScope("Account"))
                {
                    logScope.TraceError(LogEvent.ErrorAccountRegisteringUser, ex,
                        "unable to store image for user Id: '{0}', imageFileName: '{1}'",
                        userId,
                        imageFileName);
                }

                throw ex;
            }
        }

        private bool ProfileImageSelected(string profileImage)
        {
            return !(string.IsNullOrEmpty(profileImage));
        }



        public async Task<bool> IsEmailConfirmedAsync(string userId)
        {
            return await _repository.IsEmailConfirmedAsync(userId);
        }


        public async Task SendResetPasswordEmail(string userId)
        {
            TraceVerbose(LogEvent.InfoRegisteringUser, "Start sending password reset e-mail for userId: '{0}'", userId);

            // generate password reset token and encode the Url
            var code = await _repository.GeneratePasswordResetTokenAsync(userId);
            var encodedCode = HttpUtility.UrlEncode(code);

            var baseUri = new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority));
            var url = string.Format("/api/Account/ResetPassword/?UserId={0}&Code={1}", userId, encodedCode);
            var callbackUrl = new Uri(baseUri, url).ToString();

            var subject = "Reset your account";
            var body = "Please reset your password by clicking here: <a href=\"" + callbackUrl + "\">link</a>";

            await _repository.SendEmailAsync(userId, subject, body);
        }



        public void Logout(HttpRequestMessage request)
        {
            request.GetOwinContext().Authentication.SignOut();
        }


        public Task<IdentityResult> ChangePassword(ChangePasswordBindingModel changedPassword)
        {
            throw new NotImplementedException();
        }


        public Client FindClient(string clientId)
        {
            return _repository.FindClient(clientId);
        }


        public async Task<IdentityResult> ConfirmEmailAsync(string userId, string code)
        {
            var decodedCode = HttpUtility.HtmlDecode(code);

            return await _repository.ConfirmEmailAsync(userId, code);
        }

        #region operations for external logon (Facebook, Google, etc)

        public async Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo)
        {
            UserAccountEntity user = await _repository.FindAsync(loginInfo);

            return user;
        }

        public async Task<UserAccountEntity> FindByEmailAsync(string email)
        {
            UserAccountEntity user = await _repository.FindByEmailAsync(email);

            return user;
        }

        // create user without password
        public async Task<IdentityResult> CreateAsync(RegisterExternalBindingModel registerUser)
        {
            var user = Mapper.Map<RegisterExternalBindingModel, UserAccount>(registerUser);

            if (ProfileImageSelected(registerUser.Profile.ProfileImage))
            {
                user.ProfileImage = string.Format("{0}.jpg", System.Uri.EscapeDataString(registerUser.Email));
            }

            var result = await _repository.CreateAsync(user);

            if (result.IdentityResult.Succeeded)
            {
                // send confirmation e-mail
                await SendConfirmationEmail(result.UserId);

                // store the profile picture in Azure cloud storage
                StoreProfileImage(registerUser.Profile.ProfileImage, user.ProfileImage, result.UserId);
            }

            return result.IdentityResult;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _repository.AddLoginAsync(userId, login);

            return result;
        }

        #endregion


        private void TraceVerbose(LogEvent logEvent, string message, params string[] args)
        {
            using (var logScope = new LogOperationScope("Account"))
            {
                logScope.TraceVerbose(LogEvent.InfoRegisteringUser, message, args);
            }
        }

        #region disposal operations

        public void Dispose()
        {
            _repository.Dispose();
        }

        #endregion
    }
}