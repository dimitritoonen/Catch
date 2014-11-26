#region using directives

using AutoMapper;

using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Models;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators
{
    public class UserToNewUserMapping
        : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            //Mapper.CreateMap<Domain.User, NewUser>()
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.GetName()));
        }
    }
}