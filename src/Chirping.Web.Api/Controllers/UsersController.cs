using Chirping.Web.Api.Processors;
using Chirping.Web.Api.Processors.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Chirping.Web.Api.Controllers
{
    [Authorize]
    public class UserController : ApiController
    {
        IUserProcessor _processor;

        public UserController(IUserProcessor processor)
        {
            this._processor = processor;
        }

        [AllowAnonymous]
        [HttpGet]
        public bool NickNameAvailable(string nickname)
        {
            return _processor.NickNameInUse(nickname);
        }
    }
}