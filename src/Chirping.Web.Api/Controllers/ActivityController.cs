#region using directives

using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Processors.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

#endregion

namespace Chirping.Web.Api.Controllers
{
    public class ActivityController : ApiController
    {
        private IActivityProcessor _processor;

        public ActivityController(IActivityProcessor processor)
        {
            this._processor = processor;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<ActivityBindingModel> Get([FromUri] FilterBindingModel filter)
        {
            return _processor.GetActivities(filter);
        }


        [HttpPost]
        [Authorize]
        public HttpResponseMessage Post(AddActivityBindingModel model)
        {
            _processor.Add(model);

            return new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.Created
            };
        }
    }
}
