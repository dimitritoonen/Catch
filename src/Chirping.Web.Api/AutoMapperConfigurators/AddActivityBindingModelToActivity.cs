#region using directives

using AutoMapper;
using Chirping.Web.Api.AutoMapperConfigurators.TypeConverter;
using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Common;
using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Domain;
using Chirping.Web.Api.Infrastructure;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators
{
    public class AddActivityBindingModelToActivity : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<AddActivityBindingModel, Activity>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.ContentText, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.MaxParticipants, opt => opt.MapFrom(src => src.MaxParticipants))
                .ForMember(dest => dest.ChainAccept, opt => opt.MapFrom(src => src.ChainAccept))
                .IgnoreAllNonExisting();

            Mapper.CreateMap<CategoryBindingModel, Category>();

            Mapper.CreateMap<string, ProfileImage>().ConvertUsing<ProfileImageTypeConverter>();
        }
    }
}