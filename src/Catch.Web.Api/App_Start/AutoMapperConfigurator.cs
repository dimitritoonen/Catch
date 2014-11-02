using AutoMapper;
using Catch.Web.Api.Common.TypeMapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catch.Web.Api
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