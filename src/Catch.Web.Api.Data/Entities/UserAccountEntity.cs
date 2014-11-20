using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Data.Entities
{
    [Table("User")]
    public class UserAccountEntity : IdentityUser
    {
        public string NickName { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string InterestedIn { get; set; }

        [DefaultValue(false)]
        public bool Active { get; set; }
    }
}
