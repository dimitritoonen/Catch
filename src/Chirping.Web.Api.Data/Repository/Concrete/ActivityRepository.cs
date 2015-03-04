#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Domain.Activity;
using Chirping.Web.Api.Data.Context;
using Chirping.Web.Api.Data.Repository.Abstract;

using LinqKit;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

#endregion

namespace Chirping.Web.Api.Data.Repository.Concrete
{
    public class ActivityRepository : AbstractRepository<Activity, ActivityEntity>, IActivityRepository
    {
        #region constructors

        public ActivityRepository() { }

        public ActivityRepository(ChirpingContext context)
            : base(context)
        {}

        #endregion

        public override Activity Find(int id)
        {
            var activity = Context.Set<ActivityEntity>().Find(id);
            
            return ToDomainModel(activity);
        }

        // gets all activities based on a particular filter
        public IEnumerable<Activity> GetAll(Filter filter)
        {
            var whereClause = GetWhereClauseFromFilter(filter);

            var query = this.Context.Activities.AsExpandable()
                .Where(whereClause);
            
            // after filtering create a concrete list and convert each item to the Activity domain model
            return query.ToList().Select(x => ToDomainModel(x));
        }

        // build an linq expression tree based on the passed filter
        private Expression<Func<ActivityEntity, bool>> GetWhereClauseFromFilter(Filter filter)
        {
            var predicate = PredicateBuilder.True<ActivityEntity>();

            // filter category
            if (!string.IsNullOrWhiteSpace(filter.Category))
            {
                predicate = predicate.And(c => string.Compare(c.Category.Code, filter.Category, true) == 0);
            }

            // filter on # of participants
            predicate = predicate.And(p => p.MaxParticipants <= filter.NrOfParticipants);

            // search on activity content text
            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                predicate = predicate.And(s => s.ContentText.Contains(filter.Search));
            }

            // filter between from and till date
            if (filter.DateDuration != null)
            {
                predicate = predicate.And(d => d.Date >= filter.DateDuration.FromDate && d.Date <= filter.DateDuration.TillDate);
            }

            // filter between begin and end time based on hours
            if (filter.BetweenTime != null)
            {
                predicate = predicate.And(t =>
                    t.Date.Hour >= filter.BetweenTime.BeginTime &&
                    t.Date.Hour <= filter.BetweenTime.EndTime);
            }

            return predicate;
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
