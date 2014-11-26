using Chirping.Web.Api.Common.Repository;
using Chirping.Web.Api.Domain;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Data.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        bool EmailAddressInUse(string emailAddress);
        bool NicknameInUse(string nickname);
    }
}
