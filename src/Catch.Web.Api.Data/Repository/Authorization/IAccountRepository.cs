using Catch.Web.Api.Common.Domain;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Data.Repository
{
    public interface IAccountRepository : IDisposable
    {
        Task<IdentityResult> RegisterUser(UserAccount user);
        Task<IdentityUser> FindUser(string email, string password);
    }
}
