using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catch.Web.Api.Models
{
    public class NewUser
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Age { get; set; }
        public string InterestedIn { get; set; }
    }
}