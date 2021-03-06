﻿#region using directives

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
using Microsoft.Owin;
using Chirping.Web.Api.Data.Context;

#endregion

namespace Chirping.Web.Api.Data.Security
{
    public class ApplicationUserManager : UserManager<UserAccountEntity>
    {
        public ApplicationUserManager(IUserStore<UserAccountEntity> store)
            : base(store)
        { }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            //var manager = new UserManager<UserAccountEntity>(new UserStore<UserAccountEntity>(_context));
            var manager = new ApplicationUserManager(new UserStore<UserAccountEntity>(context.Get<ChirpingContext>()));

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

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<UserAccountEntity>(dataProtectionProvider.Create("ASP.NET Identity"));
            }

            return manager;
        }
    }
}
