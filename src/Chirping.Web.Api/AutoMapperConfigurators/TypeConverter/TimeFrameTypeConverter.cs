#region using directives

using AutoMapper;

using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Common.Domain.Activity;

using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators.TypeConverter
{
    public class TimeFrameTypeConverter : ITypeConverter<TimeFrameBindingModel, TimeFrame>
    {
        public TimeFrame Convert(ResolutionContext context)
        {
            var model = (TimeFrameBindingModel)context.SourceValue;
            return new TimeFrame(model.FromDate, model.TillDate);
        }
    }
}