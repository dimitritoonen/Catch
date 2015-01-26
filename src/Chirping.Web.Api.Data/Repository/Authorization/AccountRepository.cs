#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Security;
using Chirping.Web.Api.Data.Context;
using Chirping.Web.Api.Diagnostics;
using Microsoft.AspNet.Identity;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Data.Repository.Authorization
{
    public class AccountRepository : IAccountRepository, IDisposable
    {
        #region constructor

        private ChirpingContext _context;
        private UserManager<UserAccountEntity> _userManager;

        public AccountRepository()
        {
            _context = new ChirpingContext();

            var manager = new UserManagerWrapper(_context);
            _userManager = manager.GetUserManager();
        }

        #endregion

        // register the user via the UserManager (ASP.NET Identity 2.0)
        public async Task<RegisterUserResult> RegisterUser(UserAccount user)
        {
            RegisterUserResult result = new RegisterUserResult();

            UserAccountEntity newUser = GetUserEntityFromUser(user);
            result.UserId = newUser.Id;
            result.IdentityResult = await TryRegisteringUser(newUser, user);

            return result;
        }

        private async Task<IdentityResult> TryRegisteringUser(UserAccountEntity newUser, UserAccount user)
        {
            try
            {
                return await _userManager.CreateAsync(newUser, user.Password);
            }
            catch (Exception ex)
            {
                using (var logContext = new LogOperationScope("Account"))
                {
                    var message = "Error occurred while registering user with id: '{0}', and e-mail: '{1}'";
                    logContext.TraceError(LogEvent.ErrorAccountRegisteringUser, ex, message, newUser.Id, newUser.Email);
                }

                throw ex;
            }
        }
        

        public async Task<UserAccountEntity> FindUser(string email, string password)
        {
            UserAccountEntity user = await _userManager.FindAsync(email, password);

            return user;
        }

        public Client FindClient(string clientId)
        {
            var clientEntity = _context.Clients.Find(clientId);

            return new Client
            {
                Id = clientEntity.Id,
                Secret = clientEntity.Secret,
                Name = clientEntity.Name,
                ApplicationType = clientEntity.ApplicationType,
                Active = clientEntity.Active,
                RefreshTokenLifeTime = clientEntity.RefreshTokenLifeTime,
                AllowedOrigin = clientEntity.AllowedOrigin
            };
        }


        #region e-mail confirmation and password reset

        public async Task<IdentityResult> ConfirmEmailAsync(string userId, string code)
        {
            return await _userManager.ConfirmEmailAsync(userId, code);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(string userid)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(userid);
        }

        public async Task<bool> IsEmailConfirmedAsync(string userId)
        {
            return await _userManager.IsEmailConfirmedAsync(userId);
        }


        public async Task<string> GeneratePasswordResetTokenAsync(string userId)
        {
            return await _userManager.GeneratePasswordResetTokenAsync(userId);
        }

        public async Task SendEmailAsync(string userId, string subject, string body)
        {
            await _userManager.SendEmailAsync(userId, subject, body);
        }

        #endregion


        #region operations for external logon (Facebook, Google, etc)

        public async Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo)
        {
            UserAccountEntity user = await _userManager.FindAsync(loginInfo);

            return user;
        }

        public async Task<UserAccountEntity> FindByEmailAsync(string email)
        {
            UserAccountEntity user = await _userManager.FindByEmailAsync(email);

            return user;
        }

        public async Task<RegisterUserResult> CreateAsync(UserAccount user)
        {
            RegisterUserResult result = new RegisterUserResult();

            UserAccountEntity newUser = GetUserEntityFromUser(user);
            result.UserId = newUser.Id;
            
            result.IdentityResult = await _userManager.CreateAsync(newUser);

            return result;
        }

        private UserAccountEntity GetUserEntityFromUser(UserAccount user)
        {
            return new UserAccountEntity
            {
                UserName = user.Email,
                Email = user.Email,
                NickName = user.NickName,
                Age = user.Age,
                Gender = user.Gender,
                City = user.City,
                InterestedIn = user.InterestedIn,
                ProfileImage = user.ProfileImage
            };
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _userManager.AddLoginAsync(userId, login);

            return result;
        }

        #endregion


        #region disposal operations

        public void Dispose()
        {
            _context.Dispose();
            _userManager.Dispose();
        }

        #endregion
    }
}
