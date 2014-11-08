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

        private UserManager<IdentityUser> _userManager;

        public AccountRepository()
        {
            _context = new CatchContext();

            _userManager = GetUserManager();
        }

        private UserManager<IdentityUser> GetUserManager()
        {
            var manager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_context));

            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<IdentityUser>(manager)
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

        public async Task<IdentityUser> FindUser(string email, string password)
        {
            IdentityUser user = await _userManager.FindAsync(email, password);

            return user;
        }

        public void Dispose()
        {
            _context.Dispose();
            _userManager.Dispose();
        }
    }
}
