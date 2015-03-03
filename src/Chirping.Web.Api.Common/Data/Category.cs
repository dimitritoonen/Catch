#region using directives

using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace Chirping.Web.Api.Common.Data.Entities
{
    [Table("Category")]
    public class CategoryEntity
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
