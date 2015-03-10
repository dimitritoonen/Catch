#region using directives

using Microsoft.AspNet.Identity.EntityFramework;

using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace Chirping.Web.Api.Common.Data.Entities
{
    [Table("User")]
    public class UserAccountEntity : IdentityUser
    {
        [Column("Profile_Id")]
        public int ProfileId { get; set; }

        [Required]
        [ForeignKey("ProfileId")]
        public virtual ProfileEntity Profile { get; set; }

        [DefaultValue(true)]
        public bool Active { get; set; }
    }
}
