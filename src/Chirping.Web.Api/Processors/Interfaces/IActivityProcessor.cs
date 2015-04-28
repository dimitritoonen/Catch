#region using directives

using Chirping.Web.Api.BindingModels.Activity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

#endregion

namespace Chirping.Web.Api.Processors.Interfaces
{
    public interface IActivityProcessor
    {
        IEnumerable<ActivityBindingModel> GetActivities(FilterBindingModel filter);
        void Add(AddActivityBindingModel activity);
    }
}