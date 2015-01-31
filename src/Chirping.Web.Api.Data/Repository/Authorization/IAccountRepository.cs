#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Data.Repository.Authorization
{
    public interface IAccountRepository : IDisposable
    {
        Task<RegisterUserResult> RegisterUser(UserAccount user);

        Task<UserAccountEntity> FindUser(string email, string password);
        Client FindClient(string clientId);

        #region e-mail confirmation and password reset

        Task<IdentityResult> ConfirmEmailAsync(string userId, string code);
        Task<string> GenerateEmailConfirmationTokenAsync(string userid);
        Task SendEmailAsync(string userId, string subject, string body);

        Task<string> GeneratePasswordResetTokenAsync(string userId);
        Task<bool> IsEmailConfirmedAsync(string userId);
        Task<IdentityResult> ResetPassword(string userId, string token, string newPassword);

        #endregion

        #region operations for facebook registration

        Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo);
        Task<UserAccountEntity> FindByEmailAsync(string email);
        Task<RegisterUserResult> CreateAsync(UserAccount user);
        Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login);

        #endregion
    }
}
