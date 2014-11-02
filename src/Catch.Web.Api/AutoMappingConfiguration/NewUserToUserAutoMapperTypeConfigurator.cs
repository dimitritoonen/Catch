#region using directives

using AutoMapper;

using Catch.Web.Api.Common.TypeMapping;
using Catch.Web.Api.Models;

using System;

#endregion

namespace Catch.Web.Api.AutoMappingConfiguration
{
    public class NewUserToUserAutoMapperTypeConfigurator
        : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<NewUser, Domain.User>()
                .ConstructUsing((Func<NewUser, Domain.User>)
                    (src => new Domain.User(src.Name, src.Email, src.Age, src.InterestedIn, null)));
        }
    }
}