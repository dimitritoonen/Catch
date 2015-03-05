#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Repository.Abstract;

using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Data.Repository.Concrete
{
    public class CategoryRepository : AbstractRepository<Category, CategoryEntity>, ICategoryRepository
    {
        public IEnumerable<Category> GetAll()
        {
            var list = this.Context.Categories.ToList()
                .Select(category => ToDomainModel(category));

            return list.AsEnumerable();
        }

        #region domain object to/from data entity implementations

        protected override CategoryEntity ToDataEntity(Category domainModel)
        {
            return new CategoryEntity
            {
                Id = domainModel.Id,
                Code = domainModel.Code,
                Description = domainModel.Description
            };
        }

        protected override Category ToDomainModel(CategoryEntity dataEntity)
        {
            return new Category(dataEntity.Id)
            {
                Code = dataEntity.Code,
                Description = dataEntity.Description
            };
        }

        #endregion
    }
}
