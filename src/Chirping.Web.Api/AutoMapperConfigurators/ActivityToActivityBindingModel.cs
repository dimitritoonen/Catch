#region using directives

using AutoMapper;
using Chirping.Web.Api.BindingModels;
using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Domain;
using System;
using System.Linq;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators
{
    public class ActivityToActivityBindingModel : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<Activity, ActivityBindingModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.ContentText))
                .ForMember(dest => dest.Owner, opt => opt.MapFrom(src => src.Owner))
                .ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.Participants))
                .ForMember(dest => dest.MaxParticipants, opt => opt.MapFrom(src => src.MaxParticipants));

            Mapper.CreateMap<Category, CategoryBindingModel>();

            Mapper.CreateMap<Common.Domain.Profile, ProfileBindingModel>()
                .ForMember(dest => dest.NickName, opt => opt.MapFrom(src => src.NickName))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Age))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.ProfileImage));

        }
    }
}