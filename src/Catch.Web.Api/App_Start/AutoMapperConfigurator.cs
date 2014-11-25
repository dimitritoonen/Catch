using AutoMapper;
using Chirping.Web.Api.Common.TypeMapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chirping.Web.Api
{
    public class AutoMapperConfigurator
    {
        public void Config(IEnumerable<IAutoMapperTypeConfigurator> autoMapperTypes)
        {
            autoMapperTypes.ToList().ForEach(x => x.Configure());

            Mapper.AssertConfigurationIsValid();
        }
    }
}