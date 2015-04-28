#region using directives

using AutoMapper;
using Chirping.Web.Api.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators.TypeConverter
{
    public class ProfileImageTypeConverter : ITypeConverter<string, ProfileImage>
    {
        public ProfileImage Convert(ResolutionContext context)
        {
            var model = System.Convert.ToString(context.SourceValue);
            return new ProfileImage(model);
        }
    }
}