#region using directives

using AutoMapper;

using Chirping.Web.Api.BindingModels;
using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Domain.Activity;
using Chirping.Web.Api.Common.TypeMapping;

using System;
using System.Linq;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators
{
    public class ActivityToActivityBindingModel : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<Activity, ActivityBindingModel>();


            Mapper.CreateMap<Category, CategoryBindingModel>();
            Mapper.CreateMap<Common.Domain.Profile, ProfileBindingModel>();
        }
    }
}