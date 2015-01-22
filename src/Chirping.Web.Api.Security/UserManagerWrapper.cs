#region using directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Chirping.Web.Api.Common.Data.Entities;
using Microsoft.Owin.Security.DataProtection;
using Microsoft.AspNet.Identity.Owin;
using Chirping.Web.Api.Security;

#endregion

namespace Chirping.Web.Api.Common.Security
{
    public class UserManagerWrapper
    {
        private IdentityDbContext<UserAccountEntity> _context;

        public UserManagerWrapper(IdentityDbContext<UserAccountEntity> context)
        {
            this._context = context;
        }

        public UserManager<UserAccountEntity> GetUserManager()
        {
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

            manager.RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<UserAccountEntity>
            {
                Subject = "Security Code",
                BodyFormat = "Your security code is {0}",
            });
            manager.EmailService = new EmailService();

            //manager.UserTokenProvider = new EmailTokenProvider<UserAccountEntity, string>();

            var dataProtectorProvider = new DpapiDataProtectionProvider("Chirping");
            var dataProtector = dataProtectorProvider.Create("Asp.Net Identity");

            manager.UserTokenProvider = new DataProtectorTokenProvider<UserAccountEntity, string>(dataProtector)
            {
                TokenLifespan = TimeSpan.FromHours(24)
            };
            
            //var provider = new DpapiDataProtectionProvider("Chirping");
            //var dataProtectionProvider = options.DataProtectionProvider;

            //manager.UserTokenProvider = new dpapi

            //manager.UserTokenProvider = new DataProtectorTokenProvider<UserAccountEntity>(provider.Create("ASP.NET Identity"));

            return manager;
        }
    }
}
