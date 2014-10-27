using Catch.Backend.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Catch.Backend.WebApi.Controllers
{
    public class ProfileController : ApiController
    {
        IProfileRepository _repository = null;

        public ProfileController(IProfileRepository repository)
        {
            this._repository = repository;
        }

        public string Get()
        {
            return "Haudie";
        }
    }
}