using Catch.Web.Api.Common.Repository;
using Catch.Web.Api.Domain;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Data.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        bool EmailAddressInUse(string emailAddress);
    }
}
