#region using directives

using AutoMapper;
using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Entities;
using Chirping.Web.Api.Data.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Net.Http;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Processors.Account
{
    public class AccountProcessor : IAccountProcessor, IDisposable
    {
        #region constructor

        private IAccountRepository _repository;

        public AccountProcessor(IAccountRepository repository)
        {
            this._repository = repository;
        }

        #endregion

        public async Task<IdentityResult> RegisterUser(RegisterBindingModel registerUser)
        {
            var user = Mapper.Map<RegisterBindingModel, UserAccount>(registerUser);

            IdentityResult result = await _repository.RegisterUser(user);

            return result;
        }

        public void Logout(HttpRequestMessage request)
        {
            request.GetOwinContext().Authentication.SignOut();
        }

        public Task<IdentityResult> ChangePassword(ChangePasswordBindingModel changedPassword)
        {
            throw new NotImplementedException();
        }

        public Client FindClient(string clientId)
        {
            return _repository.FindClient(clientId);
        }

        #region operations for external logon (Facebook, Google, etc)

        public async Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo)
        {
            UserAccountEntity user = await _repository.FindAsync(loginInfo);

            return user;
        }

        public async Task<IdentityResult> CreateAsync(UserAccountEntity user)
        {
            var result = await _repository.CreateAsync(user);

            return result;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _repository.AddLoginAsync(userId, login);

            return result;
        }

        #endregion
        

        public void Dispose()
        {
            _repository.Dispose();
        }
    }
}