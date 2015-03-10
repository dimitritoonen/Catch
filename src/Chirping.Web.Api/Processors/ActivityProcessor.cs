#region using directives

using AutoMapper;
using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Data.Repository.Abstract;
using Chirping.Web.Api.Processors.Interfaces;

using System;
using System.Linq;
using System.Collections.Generic;
using Chirping.Web.Api.Domain;
using Chirping.Web.Api.Common.TypeMapping;

#endregion

namespace Chirping.Web.Api.Processors
{
    public class ActivityProcessor : IActivityProcessor
    {
        private IActivityRepository _repository;
        private IAutoMapper _automapper;

        public ActivityProcessor(IAutoMapper automapper, IActivityRepository repository)
        {
            this._automapper = automapper;
            this._repository = repository;
        }

        public IEnumerable<ActivityBindingModel> GetActivities(FilterBindingModel model)
        {
            var filter = _automapper.Map<Filter>(model);

            return _repository.GetAll(filter)
                // map list of Activities to ActivityBindingModel list
                .Select(activity => _automapper.Map<ActivityBindingModel>(activity));
        }
    }
}