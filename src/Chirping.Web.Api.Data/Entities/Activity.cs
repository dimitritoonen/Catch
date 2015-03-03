#region using directives

using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.Data.Entities
{
    public class Activity
    {
        public Activity()
        {
            this.Participants = new HashSet<Profile>();
        }

        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        public Profile Owner { get; set; }

        [Required]
        [MaxLength(250)]
        public string ContentText { get; set; }

        [Required]
        public virtual ICollection<Profile> Participants { get; set; }

        [Required]
        public int MaxParticipants { get; set; }
    }
}
