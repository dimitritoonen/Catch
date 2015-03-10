#region using directives

using System;
using System.ComponentModel.DataAnnotations;

#endregion

namespace Chirping.Web.Api.Common.Data
{
    public abstract class EntityModel
    {
        public abstract int Id { get; set; }
    }
}
