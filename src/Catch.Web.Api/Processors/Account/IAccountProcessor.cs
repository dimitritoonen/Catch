#region using directives

using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Net.Http;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Processors.Account
{
    public interface IAccountProcessor : IDisposable
    {
        Task<IdentityResult> RegisterUser(RegisterBindingModel registerUser);
        void Logout(HttpRequestMessage request);
        Task<IdentityResult> ChangePassword(ChangePasswordBindingModel changedPassword);

        Client FindClient(string clientId);

        #region operations for external logon (Facebook, Google, etc)

        Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo);
        Task<IdentityResult> CreateAsync(UserAccountEntity user);
        Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login);

        #endregion
    }
}
