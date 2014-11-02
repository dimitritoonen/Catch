using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Common.TypeMapping
{
    public class AutoMapperAdapter : IAutoMapper
    {
        public T Map<T>(object objectToMap)
        {
            return Mapper.Map<T>(objectToMap);
        }
    }
}
