using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Catch.Web.Api.Controllers
{
    public class EmailsController : ApiController
    {
        [HttpGet]
        public bool IsEmailAlreadyUsed([FromUri] string emailAddress)
        {
            return false;
        }
    }
}