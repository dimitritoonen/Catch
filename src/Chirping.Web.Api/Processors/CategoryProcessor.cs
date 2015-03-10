#region using directives

using AutoMapper;
using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Repository.Abstract;
using Chirping.Web.Api.Domain;
using Chirping.Web.Api.Processors.Interfaces;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Processors
{
    public class CategoryProcessor : ICategoryProcessor
    {
        #region constructors

        private ICategoryRepository _repository = null;

        public CategoryProcessor(ICategoryRepository repository)
        {
            this._repository = repository;
        }

        #endregion

        public IEnumerable<CategoryBindingModel> GetAll()
        {
            return this._repository.GetAll()
                .Select(category => Mapper.Map<Category, CategoryBindingModel>(category));
        }
    }
}