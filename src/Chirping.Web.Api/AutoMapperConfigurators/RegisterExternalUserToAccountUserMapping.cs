#region using directives

using AutoMapper;
using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Infrastructure;
using System;


#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators
{
    public class RegisterExternalUserToAccountUserMapping
       : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<RegisterExternalBindingModel, UserAccount>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Profile.Gender))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Profile.City))
                .ForMember(dest => dest.NickName, opt => opt.MapFrom(src => src.Profile.Name))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Profile.Age))
                .ForMember(dest => dest.ProfileImage, opt => opt.MapFrom(src => src.Profile.Image))
                .IgnoreAllNonExisting();
        }
    }
}