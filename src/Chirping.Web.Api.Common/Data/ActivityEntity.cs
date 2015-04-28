#region using directives

using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Chirping.Web.Api.Common.Data;

#endregion

namespace Chirping.Web.Api.Common.Data.Entities
{
    [Table("Activity")]
    public class ActivityEntity : EntityModel
    {
        public ActivityEntity()
        {
            this.Participants = new HashSet<ProfileEntity>();
        }

        [Key]
        public override int Id { get; set; }

        [Column("Category_Id")]
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual CategoryEntity Category { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(255)]
        public string Location { get; set; }

        [Column("Profile_Id")]
        public int ProfileId { get; set; }

        [ForeignKey("ProfileId")]
        public virtual ProfileEntity Owner { get; set; }

        [Required]
        [MaxLength(250)]
        public string ContentText { get; set; }

        public virtual ICollection<ProfileEntity> Participants { get; set; }

        [Required]
        public int MaxParticipants { get; set; }

        public bool ChainAccept { get; set; }
    }
}
