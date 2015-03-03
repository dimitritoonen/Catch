#region using directives

using Chirping.Web.Api.Common.Data;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Repository;
using Chirping.Web.Api.Data.Context;

using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

#endregion

namespace Chirping.Web.Api.Data.Repository
{
    public abstract class AbstractRepository<TDomainModel, TEntityModel> : IRepository<TDomainModel>
        where TDomainModel : DomainModel
        where TEntityModel : EntityModel
    {
        #region Db context

        public DbContext Context { get; private set; }

        public AbstractRepository()
        {
            Context = new ChirpingContext();
        }

        public AbstractRepository(DbContext context)
        {
            Context = context;
        }

        #endregion

        public virtual TDomainModel Find(int id)
        {
            var entity = Context.Set<TEntityModel>().Find(id);

            return ToDomainModel(entity);
        }

        public virtual void Add(TDomainModel item)
        {
            Context.Set<TEntityModel>().Add(ToDataEntity(item));
            Context.SaveChanges();
        }

        public virtual void Update(TDomainModel item)
        {
            var entity = ToDataEntity(item);

            DbEntityEntry dbEntity = Context.Entry<TEntityModel>(entity);

            if (dbEntity.State == EntityState.Detached)
            {
                Context.Set<TEntityModel>().Attach(entity);
                dbEntity.State = EntityState.Modified;
            }
        }

        protected abstract TEntityModel ToDataEntity(TDomainModel domainModel);
        protected abstract TDomainModel ToDomainModel(TEntityModel dataEntity);
    }
}
