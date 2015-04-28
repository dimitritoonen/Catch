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
using Chirping.Web.Api.Data.Repository;

#endregion

namespace Chirping.Web.Api.Processors
{
    public class ActivityProcessor : IActivityProcessor
    {
        private IActivityRepository _activityRepository;
        private IUserRepository _userRepository;
        private IAutoMapper _automapper;

        public ActivityProcessor(IAutoMapper automapper, IActivityRepository activityRepository, IUserRepository userRepository)
        {
            this._automapper = automapper;
            this._activityRepository = activityRepository;
            this._userRepository = userRepository;
        }

        public IEnumerable<ActivityBindingModel> GetActivities(FilterBindingModel model)
        {
            var filter = _automapper.Map<Filter>(model);

            return _activityRepository.GetAll(filter)
                // map list of Activities to ActivityBindingModel list
                .Select(activity => _automapper.Map<ActivityBindingModel>(activity));
        }

        public void Add(AddActivityBindingModel model)
        {
            Common.Domain.Profile profile = _userRepository.GetProfileById(model.ProfileId);

            if (profile == null)
            {
                throw new NullReferenceException(string.Format("Unable to find profile with Id: '{0}'", model.ProfileId.ToString()));
            }
            
            var activity = _automapper.Map<Activity>(model);
            activity.Owner = profile;

            _activityRepository.Add(activity);
        }
    }
}