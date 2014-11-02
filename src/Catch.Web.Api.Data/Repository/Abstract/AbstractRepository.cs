using Catch.Web.Api.Common.Data;
using Catch.Web.Api.Common.Domain;
using Catch.Web.Api.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Data.Repository
{
    public abstract class AbstractRepository<TDomainModel, TEntityModel> : IRepository<TDomainModel>
        where TDomainModel : DomainModel
        where TEntityModel : EntityModel
    {
        #region Db context

        private DbContext _context = new CatchContext();

        #endregion

        public virtual TDomainModel Find(int id)
        {
            var entity = _context.Set<TEntityModel>().Find(id);

            return ToDomainModel(entity);
        }

        public virtual void Add(TDomainModel item)
        {
            _context.Set<TEntityModel>().Add(ToDataEntity(item));
            _context.SaveChanges();
        }

        public virtual void Update(TDomainModel item)
        {
            var entity = ToDataEntity(item);

            DbEntityEntry dbEntity = _context.Entry<TEntityModel>(entity);

            if (dbEntity.State == EntityState.Detached)
            {
                _context.Set<TEntityModel>().Attach(entity);
                dbEntity.State = EntityState.Modified;
            }
        }

        protected abstract TEntityModel ToDataEntity(TDomainModel domainModel);
        protected abstract TDomainModel ToDomainModel(TEntityModel dataEntity);
    }
}
