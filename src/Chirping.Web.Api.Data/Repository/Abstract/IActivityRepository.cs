#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Repository;
using Chirping.Web.Api.Domain;
using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Data.Repository.Abstract
{
    public interface IActivityRepository : IRepository<Activity>
    {
        IEnumerable<Activity> GetAll(Filter filter);
    }
}
