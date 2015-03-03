#region using directives

using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Repository;

using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Data.Repository.Abstract
{
    public interface IActivityRepository : IRepository<Activity>
    {
    }
}
