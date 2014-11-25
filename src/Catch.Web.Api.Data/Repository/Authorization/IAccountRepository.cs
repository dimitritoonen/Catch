﻿#region using directives

using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Data.Repository
{
    public interface IAccountRepository : IDisposable
    {
        Task<IdentityResult> RegisterUser(UserAccount user);

        Task<UserAccountEntity> FindUser(string email, string password);
        Client FindClient(string clientId);

        #region operations for external logon (Facebook, Google, etc)

        Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo);
        Task<IdentityResult> CreateAsync(UserAccountEntity user);
        Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login);

        #endregion
    }
}