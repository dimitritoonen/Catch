using AutoMapper;

using Catch.Web.Api.BindingModels.Account;
using Catch.Web.Api.Common.Domain;
using Catch.Web.Api.Common.TypeMapping;

using System;

namespace Catch.Web.Api.AutoMapperConfigurators
{
    public class RegisterUserToAccountUserMapping
        : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<RegisterBindingModel, UserAccount>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.NickName))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Age))
                .ForMember(dest => dest.InterestedIn, opt => opt.MapFrom(src => src.InterestedIn));
        }
    }
}