using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Common.Domain
{
    public class UserAccount
    {
        public string Email { get; set; }
        public string Password { get; set; }
        
        public string Name { get; set; }
        public string Age { get; set; }
        public string InterestedIn { get; set; }
    }
}
