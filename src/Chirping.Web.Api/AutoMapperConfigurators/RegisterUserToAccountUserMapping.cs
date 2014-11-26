using AutoMapper;

using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.TypeMapping;

using System;

namespace Chirping.Web.Api.AutoMapperConfigurators
{
    public class RegisterUserToAccountUserMapping
        : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<RegisterBindingModel, UserAccount>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Profile.Gender))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Profile.City))
                .ForMember(dest => dest.NickName, opt => opt.MapFrom(src => src.Profile.NickName))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Profile.Age))
                .ForMember(dest => dest.InterestedIn, opt => opt.MapFrom(src => src.Profile.InterestedIn));
        }
    }
}