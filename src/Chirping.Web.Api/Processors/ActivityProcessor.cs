#region using directives

using AutoMapper;
using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Data.Repository.Abstract;
using Chirping.Web.Api.Processors.Interfaces;

using System;
using System.Linq;
using System.Collections.Generic;
using Chirping.Web.Api.Domain;

#endregion

namespace Chirping.Web.Api.Processors
{
    public class ActivityProcessor : IActivityProcessor
    {
        private IActivityRepository _repository;

        public ActivityProcessor(IActivityRepository repository)
        {
            this._repository = repository;
        }

        public IEnumerable<ActivityBindingModel> GetActivities(FilterBindingModel model)
        {
            var filter = Mapper.Map<FilterBindingModel, Filter>(model);

            return _repository.GetAll(filter)
                // map list of Activities to ActivityBindingModel list
                .Select(activity => Mapper.Map<Activity, ActivityBindingModel>(activity));
        }
    }
}