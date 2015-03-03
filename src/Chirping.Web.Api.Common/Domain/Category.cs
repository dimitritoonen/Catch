#region using directives

using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Common.Domain
{
    public class Category : DomainModel
    {
        public Category(int id)
        {
            this.Id = id;
        }

        public int Id { get; private set; }
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
