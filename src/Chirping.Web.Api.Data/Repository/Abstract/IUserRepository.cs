#region using directives

using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Repository;
using Chirping.Web.Api.Domain;

#endregion

namespace Chirping.Web.Api.Data.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        bool EmailAddressInUse(string emailAddress);
        bool NicknameInUse(string nickname);
        Profile GetProfileById(int profileId);
    }
}
