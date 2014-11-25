#region using directives

using AutoMapper;

using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Models;

using System;

#endregion

namespace Chirping.Web.Api.AutoMapperConfigurators
{
    public class NewUserToUserMapping
        : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Console.WriteLine("");
            //Mapper.CreateMap<NewUser, Domain.User>()
            //    .ConstructUsing((Func<NewUser, Domain.User>)
            //        (src => new Domain.User(src.Name, src.Email, src.Age, src.InterestedIn, null)));
        }
    }
}