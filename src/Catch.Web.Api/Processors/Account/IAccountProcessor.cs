using Catch.Web.Api.BindingModels.Account;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Catch.Web.Api.Processors.Account
{
    public interface IAccountProcessor : IDisposable
    {
        Task<IdentityResult> RegisterUser(RegisterBindingModel registerUser);

        void Logout(HttpRequestMessage request);

        Task<IdentityResult> ChangePassword(ChangePasswordBindingModel changedPassword);
    }
}
