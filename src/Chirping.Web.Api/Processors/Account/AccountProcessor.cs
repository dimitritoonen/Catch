#region using directives

using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Storage;
using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Data.Repository.Authorization;
using Chirping.Web.Api.Domain;
using Microsoft.AspNet.Identity;
using System;
using System.Configuration;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

#endregion

namespace Chirping.Web.Api.Processors.Account
{
    // processes the Http requests related to account/security requests (i.e. registering user, log a user in, etc)
    public class AccountProcessor : IAccountProcessor, IDisposable
    {
        private IAccountRepository _repository;
        private IProfileImageStore _store;
        private IAutoMapper _automapper;

        #region constructor
        
        public AccountProcessor(IAccountRepository repository, IProfileImageStore store, IAutoMapper automapper)
        {
            this._repository = repository;
            this._store = store;
            this._automapper = automapper;
        }

        #endregion

        // processes the Http request for a user registration
        public async Task<IdentityResult> RegisterUser(RegisterBindingModel registerUser)
        {
            Trace.WriteLine(string.Format("Start registering user with e-mail: '{0}'", registerUser.Email));

            var user = _automapper.Map<UserAccount>(registerUser);

            if (ProfileImageSelected(registerUser.Profile.Image))
            {
                user.ProfileImage = Guid.NewGuid().ToString("N");
            }

            RegisterUserResult result = await _repository.RegisterUser(user);

            if (result.IdentityResult.Succeeded)
            {
                // send confirmation e-mail
                await SendConfirmationEmail(result.UserId);

                // store the profile picture in Azure cloud storage
                StoreProfileImage(registerUser.Profile.Image, user.ProfileImage, result.UserId);
            }

            return result.IdentityResult;
        }

        // sends a confirmation e-mail to the just registered user
        private async Task SendConfirmationEmail(string userId)
        {
            Trace.WriteLine(string.Format("Start sending confirmation e-mail for userId: '{0}'", userId));

            // generate confirm email token and encode the Url
            var code = await _repository.GenerateEmailConfirmationTokenAsync(userId);
            var encodedCode = HttpUtility.UrlEncode(code);

            var baseUri = GetChirpingUri();
            var url = string.Format("/#ActivateAccount?userId={0}&confirmCode={1}", userId, encodedCode);
            var callbackUrl = new Uri(baseUri, url).ToString();

            var subject = "Confirm your account";
            var body = "Chirping logo here<br /><br />Please confirm your account by click this link: <a href=\"" + callbackUrl + "\">link</a>";

            await _repository.SendEmailAsync(userId, subject, body);
        }
        
        private void StoreProfileImage(string profileImage, string imageFileName, string userId)
        {
            if (!ProfileImageSelected(profileImage))
                return;

            Trace.WriteLine(string.Format("Storing profile in azure storage for user: '{0}'", userId));

            TryStoringProfileImage(profileImage, imageFileName, userId);
        }

        private void TryStoringProfileImage(string profileImage, string imageFileName, string userId)
        {
            try
            {
                _store.StoreImage(profileImage, imageFileName);
            }
            catch (Exception ex)
            {
                Trace.TraceError("Unable to store image for user Id: '{0}', imageFileName: '{1}', Exception: {2}", userId, imageFileName, ex.ToString());

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


        public async Task SendResetPasswordEmail(string email, string userId)
        {
            Trace.WriteLine(string.Format("Start sending password reset e-mail for userId: '{0}'", userId));

            // generate password reset token and encode the Url
            var code = await _repository.GeneratePasswordResetTokenAsync(userId);
            var encodedCode = HttpUtility.UrlEncode(code);

            var baseUri = GetChirpingUri();
            var url = string.Format("/#ChangePassword?email={0}&userId={1}&confirmCode={2}", email, userId, encodedCode);
            var callbackUrl = new Uri(baseUri, url).ToString();

            var subject = "Reset your account";
            var body = "Please reset your password by clicking here: <a href=\"" + callbackUrl + "\">link</a>";

            await _repository.SendEmailAsync(userId, subject, body);
        }


        public async Task<IdentityResult> ResetPassword(ResetPasswordBindingModel model)
        {
            return await _repository.ResetPassword(model.UserId, model.Code, model.NewPassword);
        }


        public Task<IdentityResult> ChangePassword(ChangePasswordBindingModel changedPassword)
        {
            throw new NotImplementedException();
        }





        public void Logout(HttpRequestMessage request)
        {
            request.GetOwinContext().Authentication.SignOut();
        }
        

        public Client FindClient(string clientId)
        {
            return _repository.FindClient(clientId);
        }



        public async Task<IdentityResult> ConfirmEmailAsync(string userId, string code)
        {
            try
            {
                var decodedCode = HttpUtility.HtmlDecode(code);

                return await _repository.ConfirmEmailAsync(userId, code);
            }
            catch (Exception ex)
            {
                var response = GetConfirmEmailResponse(userId, ex);
                throw new HttpResponseException(response);
            }
        }

        private HttpResponseMessage GetConfirmEmailResponse(string userId, Exception ex)
        {
            Trace.TraceError("Unable to confirm account for user: '{0}', Exception: {1}", userId, ex.ToString());

            return new HttpResponseMessage(HttpStatusCode.NotFound)
            {
                Content = new StringContent(string.Format("Couldn't find user id: {0}", userId)),
                ReasonPhrase = "User ID not found"
            };
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
            Trace.WriteLine(string.Format("Start registering external user with e-mail: '{0}'", registerUser.Email));

            var user = _automapper.Map<UserAccount>(registerUser);

            if (ProfileImageSelected(registerUser.Profile.Image))
            {
                user.ProfileImage = string.Format("{0}.jpg", System.Uri.EscapeDataString(registerUser.Email));
            }

            var result = await _repository.CreateAsync(user);

            if (result.IdentityResult.Succeeded)
            {
                // send confirmation e-mail
                await SendConfirmationEmail(result.UserId);

                // store the profile picture in Azure cloud storage
                StoreProfileImage(registerUser.Profile.Image, user.ProfileImage, result.UserId);
            }

            return result.IdentityResult;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _repository.AddLoginAsync(userId, login);

            return result;
        }

        #endregion


        private Uri GetChirpingUri()
        {
            if (ConfigurationManager.AppSettings["FrontEndUrl"] == null)
                throw new ArgumentNullException("Couldn't find app setting 'FrontEndUrl'");

            return new Uri(ConfigurationManager.AppSettings["FrontEndUrl"]);
        }


        #region disposal operations

        public void Dispose()
        {
            _repository.Dispose();
        }

        #endregion
    }
}