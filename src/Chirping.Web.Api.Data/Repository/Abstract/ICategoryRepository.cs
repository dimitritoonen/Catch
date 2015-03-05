#region using directives

using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Repository;

using System;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.Data.Repository.Abstract
{
    public interface ICategoryRepository : IRepository<Category>
    {
        IEnumerable<Category> GetAll();
    }
}
