using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Catch.Backend.WebApi.Controllers
{
    public class ValuesController : ApiController
    {
        private static List<string> _data = InitList();

        private static List<string> InitList()
        {
            return new List<string>
            {
                "value1",
                "value2"
            };
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return _data;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return _data[id];
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
            _data.Add(value);
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            _data[id] = value;
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            _data.RemoveAt(id);
        }
    }
}