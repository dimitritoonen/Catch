#region using directives

using Catch.Web.Api.Common.Domain;
using Catch.Web.Api.Data.Context;
using Catch.Web.Api.Data.Entities;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

using System;
using System.Threading.Tasks;

#endregion

namespace Catch.Web.Api.Data.Repository
{
    public class AccountRepository : IAccountRepository, IDisposable
    {
        private CatchContext _context;

        private UserManager<UserAccountEntity> _userManager;

        public AccountRepository()
        {
            _context = new CatchContext();

            _userManager = GetUserManager();
        }

        private UserManager<UserAccountEntity> GetUserManager()
        {
//            var manager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_context));
            var manager = new UserManager<UserAccountEntity>(new UserStore<UserAccountEntity>(_context));

            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<UserAccountEntity>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };

            return manager;
        }

        public async Task<IdentityResult> RegisterUser(UserAccount user)
        {
            UserAccountEntity newUser = new UserAccountEntity
            {
                UserName = user.Email,
                Email = user.Email,
                Age = user.Age,
                InterestedIn = user.InterestedIn
            };

            var result = await _userManager.CreateAsync(newUser, user.Password);

            return result;
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

        #region operations for external logon (Facebook, Google, etc)

        public async Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo)
        {
            UserAccountEntity user = await _userManager.FindAsync(loginInfo);

            return user;
        }

        public async Task<IdentityResult> CreateAsync(UserAccountEntity user)
        {
            var result = await _userManager.CreateAsync(user);

            return result;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _userManager.AddLoginAsync(userId, login);

            return result;
        }

        #endregion

        public void Dispose()
        {
            _context.Dispose();
            _userManager.Dispose();
        }
    }
}
