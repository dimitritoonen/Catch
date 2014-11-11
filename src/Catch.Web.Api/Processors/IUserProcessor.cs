#region using directives

using Catch.Web.Api.Domain;
using Catch.Web.Api.Models;

using System;
using System.Collections.Generic;

#endregion

namespace Catch.Web.Api.Processors
{
    public interface IUserProcessor
    {
        bool EmailAddressInUse(string emailAddress);
    }
}
