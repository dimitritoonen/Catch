#region using directives

using Chirping.Web.Api.Common.Data;
using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Context;
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

            return (user != null);
        }

        public bool NicknameInUse(string nickname)
        {
            var user = this.Context.Users.Where(u => string.Compare(u.Profile.NickName, nickname, true) == 0).FirstOrDefault();

            return (user != null);
        }

        public Profile GetProfileById(int profileId)
        {
            ProfileEntity profile = this.Context.Users
                .Where(user => user.ProfileId == profileId)
                .Select(x => x.Profile)
                .FirstOrDefault();

            if (profile == null)
            {
                return null;
            }

            return ToProfileDomainModel(profile);
        }

        #region Mapping operators

        protected override UserEntity ToDataEntity(User domainModel)
        {
            return new UserEntity
            {
                Name = domainModel.GetName(),
                Email = domainModel.GetEmail(),
                Age = domainModel.GetAge(),
                InterestedIn = domainModel.GetInterestedIn(),
                ProfileImage = domainModel.GetProfileImage()
            };
        }

        private ProfileEntity ToProfileDataEntity(Profile profile)
        {
            return new ProfileEntity
            {
                Id = profile.Id,
                City = profile.City,
                Age = profile.Age,
                Gender = profile.Gender,
                NickName = profile.NickName,
                ProfileImage = profile.ProfileImage.FileName
            };
        }


        protected override User ToDomainModel(UserEntity dataEntity)
        {
            return new User(dataEntity.Name, 
                dataEntity.Email, 
                dataEntity.Age, 
                dataEntity.InterestedIn,
                dataEntity.ProfileImage);
        }

        private Profile ToProfileDomainModel(ProfileEntity dataEntity)
        {
            return new Profile(dataEntity.Id)
            {
                City = dataEntity.City,
                Age = dataEntity.Age,
                Gender = dataEntity.Gender,
                NickName = dataEntity.NickName,
                ProfileImage = new ProfileImage(dataEntity.ProfileImage)
            };
        }

        #endregion
    }
}