#region using directives

using AutoMapper;
using Chirping.Web.Api.AutoMapperConfigurators.TypeConverter;
using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Common.Domain.Activity;
using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Infrastructure;
using System;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators
{
    public class FilterBindingModelToFilterDomain : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<FilterBindingModel, Filter>()
                .ForMember(dest => dest.Search, opt => opt.MapFrom(src => src.Search))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.DateDuration,
                    opt => opt.Condition(
                        src => src.Date != null)
                    )
                .ForMember(dest => dest.DateDuration, opt => opt.MapFrom(src => src.Date))

                .ForMember(dest => dest.BetweenTime,
                    opt => opt.Condition(
                        src => src.Time != null)
                    )
                .ForMember(dest => dest.BetweenTime, opt => opt.MapFrom(src => src.Time))

                .ForMember(dest => dest.NrOfParticipants, opt => opt.MapFrom(src => src.Participants));

            Mapper.CreateMap<BetweenTimeBindingModel, BetweenTime>().ConvertUsing<BetweenTimeTypeConverter>();
            Mapper.CreateMap<TimeFrameBindingModel, TimeFrame>().ConvertUsing<TimeFrameTypeConverter>();
        }
    }
}