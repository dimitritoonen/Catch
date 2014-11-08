#region using directives

using AutoMapper;
using Catch.Web.Api.BindingModels.Account;
using Catch.Web.Api.Common.Domain;
using Catch.Web.Api.Data.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Cookies;
using System;
using System.Net.Http;
using System.Threading.Tasks;

#endregion

namespace Catch.Web.Api.Processors.Account
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


        public void Dispose()
        {
            _repository.Dispose();
        }
    }
}