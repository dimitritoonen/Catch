#region using directives

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace Chirping.Web.Api.Common.Data.Entities
{
    public class Profile
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [Index(IsUnique=true)]
        [MaxLength(50)]
        public string NickName { get; set; }

        [Required]
        [MaxLength(2)]
        public string Age { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [MaxLength(255)]
        public string City { get; set; }

        [Required]
        public string InterestedIn { get; set; }

        public string ProfileImage { get; set; }
    }
}
