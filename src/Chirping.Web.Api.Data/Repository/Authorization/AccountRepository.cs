#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Security;
using Chirping.Web.Api.Data.Context;
using Chirping.Web.Api.Security.Data.Context;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web;

#endregion

namespace Chirping.Web.Api.Data.Repository.Authorization
{
    public class AccountRepository : IAccountRepository, IDisposable
    {
        private ChirpingContext _context;
        private ApplicationUserManager _userManager;

        #region constructor
        
        public AccountRepository(ApplicationUserManager userManager)
            : base()
        {
            this._userManager = userManager;
        }

        public AccountRepository()
        {
            _context = new ChirpingContext();
        }
        
        #endregion

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }


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
                return await UserManager.CreateAsync(newUser, user.Password);
            }
            catch (Exception ex)
            {
                Trace.TraceError("Error occurred while registering user with id: '{0}', and e-mail: '{1}', Exception: {2}", newUser.Id, newUser.Email, ex.ToString());

                throw ex;
            }
        }
        

        public async Task<UserAccountEntity> FindUser(string email, string password)
        {
            UserAccountEntity user = await UserManager.FindAsync(email, password);

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
            return await UserManager.ConfirmEmailAsync(userId, code);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(string userid)
        {
            return await UserManager.GenerateEmailConfirmationTokenAsync(userid);
        }

        public async Task<bool> IsEmailConfirmedAsync(string userId)
        {
            return await UserManager.IsEmailConfirmedAsync(userId);
        }


        public async Task<string> GeneratePasswordResetTokenAsync(string userId)
        {
            return await UserManager.GeneratePasswordResetTokenAsync(userId);
        }

        public async Task SendEmailAsync(string userId, string subject, string body)
        {
            await UserManager.SendEmailAsync(userId, subject, body);
        }

        #endregion


        #region operations for external logon (Facebook, Google, etc)

        public async Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo)
        {
            UserAccountEntity user = await UserManager.FindAsync(loginInfo);

            return user;
        }

        public async Task<UserAccountEntity> FindByEmailAsync(string email)
        {
            UserAccountEntity user = await UserManager.FindByEmailAsync(email);

            return user;
        }

        public async Task<RegisterUserResult> CreateAsync(UserAccount user)
        {
            RegisterUserResult result = new RegisterUserResult();

            UserAccountEntity newUser = GetUserEntityFromUser(user);
            result.UserId = newUser.Id;

            result.IdentityResult = await UserManager.CreateAsync(newUser);

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
            var result = await UserManager.AddLoginAsync(userId, login);

            return result;
        }

        #endregion


        #region disposal operations

        public void Dispose()
        {
            _context.Dispose();

            if (_userManager != null)
            {
                _userManager.Dispose();
            }
        }

        #endregion
    }
}
