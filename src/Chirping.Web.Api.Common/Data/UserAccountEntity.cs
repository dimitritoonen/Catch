#region using directives

using Microsoft.AspNet.Identity.EntityFramework;

using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace Chirping.Web.Api.Common.Data.Entities
{
    [Table("User")]
    public class UserAccountEntity : IdentityUser
    {
        public string NickName { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string InterestedIn { get; set; }
        public string ProfileImage { get; set; }

        [DefaultValue(false)]
        public bool Active { get; set; }
    }
}
