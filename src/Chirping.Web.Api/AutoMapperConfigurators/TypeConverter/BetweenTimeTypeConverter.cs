#region using directives

using AutoMapper;

using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Common.Domain.Activity;

using System;
using System.Linq;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators.TypeConverter
{
    public class BetweenTimeTypeConverter : ITypeConverter<BetweenTimeBindingModel, BetweenTime>
    {
        public BetweenTime Convert(ResolutionContext context)
        {
            var model = (BetweenTimeBindingModel)context.SourceValue;
            return new BetweenTime(model.BeginTime, model.EndTime);
        }
    }
}