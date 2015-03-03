#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Context;
using Chirping.Web.Api.Data.Entities;

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Data.Repository.Concrete
{
    public class ActivityRepository : AbstractRepository<Activity, ActivityEntity>
    {
        public override Activity Find(int id)
        {
            var activity = Context.Set<ActivityEntity>().Find(id);
            
            return ToDomainModel(activity);
        }

        

        #region domain object to/from data entity implementations

        protected override ActivityEntity ToDataEntity(Activity domainModel)
        {
            ActivityEntity entity = new ActivityEntity();

            entity.Id = domainModel.Id;
            entity.Category = new CategoryEntity
            {
                Id = domainModel.Category.Id,
                Code = domainModel.Category.Code,
                Description = domainModel.Category.Description
            };
            entity.Date = domainModel.Date;
            entity.Location = domainModel.Location;
            entity.Owner = new ProfileEntity
            {
                Id = domainModel.Owner.Id
            };
            entity.ContentText = domainModel.ContentText;
            entity.Participants = GetParticipantsFromDomainModel(domainModel);
            entity.MaxParticipants = domainModel.MaxParticipants;

            return entity;
        }

        private ICollection<ProfileEntity> GetParticipantsFromDomainModel(Activity domainModel)
        {
            var collection = new List<ProfileEntity>();

            foreach (var domainParticipant in domainModel.Participants)
            {
                collection.Add(new ProfileEntity
                    {
                        Id = domainParticipant.Id
                    });
            }

            return collection;
        }


        protected override Activity ToDomainModel(ActivityEntity dataEntity)
        {
            return new Activity(dataEntity.Id)
            {
                Category = new Category(dataEntity.Category.Id)
                {
                    Code = dataEntity.Category.Code,
                    Description = dataEntity.Category.Description
                },
                Date = dataEntity.Date,
                Location = dataEntity.Location,
                Owner = new Profile(dataEntity.Owner.Id)
                {
                    NickName = dataEntity.Owner.NickName,
                    Gender = dataEntity.Owner.Gender,
                    City = dataEntity.Owner.City,
                    Age = dataEntity.Owner.Age,
                    ProfileImage = dataEntity.Owner.ProfileImage
                },
                ContentText = dataEntity.ContentText,
                Participants = GetParticipantsFromEntity(dataEntity),
                MaxParticipants = dataEntity.MaxParticipants
            };
        }

        private List<Profile> GetParticipantsFromEntity(ActivityEntity dataEntity)
        {
            var list = new List<Profile>(dataEntity.Participants.Count);

            foreach (var entityParticipant in dataEntity.Participants)
            {
                list.Add(new Profile(entityParticipant.Id)
                    {
                        NickName = entityParticipant.NickName,
                        Gender = entityParticipant.Gender,
                        City = entityParticipant.City,
                        Age = entityParticipant.Age,
                        ProfileImage = entityParticipant.ProfileImage
                    });
            }

            return list;
        }

        #endregion
    }
}
