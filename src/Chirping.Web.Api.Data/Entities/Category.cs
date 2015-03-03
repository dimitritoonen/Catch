#region using directives

using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace Chirping.Web.Api.Data.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [IndexAttribute(IsUnique = true)]
        [MaxLength(25)]
        public string Code { get; set; }

        [MaxLength(50)]
        public string Description { get; set; }
    }
}
