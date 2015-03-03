using System;

using Chirping.Web.Api.Common.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Chirping.Web.Api.Data.Entities
{
    [Table("User")]
    public class UserEntity : EntityModel
    {
        public UserEntity() { }

        public override int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Age { get; set; }
        public string InterestedIn { get; set; }
        public string ProfileImage { get; set; }

        public virtual Activity Activity { get; set; }
    }
}
