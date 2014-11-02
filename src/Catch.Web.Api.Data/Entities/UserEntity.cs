using System;

using Catch.Web.Api.Common.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace Catch.Web.Api.Data.Entities
{
    [Table("User")]
    public class UserEntity : EntityModel
    {
        public override int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Age { get; set; }
        public string InterestedIn { get; set; }
    }
}
