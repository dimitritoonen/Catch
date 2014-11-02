using Catch.Web.Api.Data.Repository;
using Catch.Web.Api.Domain;
using Catch.Web.Api.Models;
using Catch.Web.Api.Processors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Catch.Web.Api.Controllers
{
    public class UsersController : ApiController
    {
        private readonly IUserProcessor _processor;

        public UsersController(IUserProcessor processor)
        {
            this._processor = processor;
        }

        [HttpPost]
        public string AddUser(HttpRequestMessage requestMessage, NewUser newUser)
        {
            _processor.AddUser(newUser);

            return string.Format(
                "Name: {0}, Email: {1}, Age: {2}, InteretedIn: {3}",
                newUser.Name, newUser.Email, newUser.Age, newUser.InterestedIn);
        }

        public NewUser Get(HttpRequestMessage requestMessage, int id)
        {
            return new NewUser
            {
                Age = "45 - 60",
                Email = "johndoe@catch.me",
                InterestedIn = "Both",
                Name = "john doe"
            };
        }

        //public string Get(HttpRequestMessage requestMessage, NewUser user)
        //{
        //    // create a user credentials?
        //    // Get e-mail + password and log in :D

        //    return "value";
        //}
    }
}