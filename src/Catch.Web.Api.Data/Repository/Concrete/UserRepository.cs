#region using directives

using Chirping.Web.Api.Common.Data;
using Chirping.Web.Api.Data.Entities;
using Chirping.Web.Api.Domain;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Data.Repository
{
    public class UserRepository : AbstractRepository<User, UserEntity>, IUserRepository
    {
        public bool EmailAddressInUse(string emailAddress)
        {
            var user = this.Context.Users.Where(x => string.Compare(x.Email, emailAddress, true) == 0).FirstOrDefault();

            return (user == null);
        }

        public bool NicknameInUse(string nickname)
        {
            var user = this.Context.Users.Where(x => string.Compare(x.NickName, nickname, true) == 0).FirstOrDefault();

            return (user == null);
        }

        #region Mapping operators

        protected override UserEntity ToDataEntity(User domainModel)
        {
            return new UserEntity
            {
                Name = domainModel.GetName(),
                Email = domainModel.GetEmail(),
                Age = domainModel.GetAge(),
                InterestedIn = domainModel.GetInterestedIn()
            };
        }

        protected override User ToDomainModel(UserEntity dataEntity)
        {
            return new User(dataEntity.Name, 
                dataEntity.Email, 
                dataEntity.Age, 
                dataEntity.InterestedIn, 
                new List<string>());
        }

        #endregion
    }
}