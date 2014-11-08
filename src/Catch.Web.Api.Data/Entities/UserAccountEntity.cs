using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
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
        public string Age { get; set; }
        public string InterestedIn { get; set; }
    }
}
