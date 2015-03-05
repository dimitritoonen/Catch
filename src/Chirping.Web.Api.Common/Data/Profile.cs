#region using directives

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace Chirping.Web.Api.Common.Data.Entities
{
    [Table("Profile")]
    public class ProfileEntity
    {
        public ProfileEntity() { }

        [Key]
        public int Id { get; set; }

        [Required]
        [Index(IsUnique=true)]
        [MaxLength(50)]
        public string NickName { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [MaxLength(255)]
        public string City { get; set; }

        public string ProfileImage { get; set; }

        public virtual ICollection<ActivityEntity> Activities { get; set; }
    }
}
 