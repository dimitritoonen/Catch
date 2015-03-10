#region using directives

using Chirping.Web.Api.Domain;
using Chirping.Web.Api.Models;

using System;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.Processors.Interfaces
{
    public interface IUserProcessor
    {
        bool EmailAddressInUse(string emailAddress);
        bool NickNameInUse(string nickname);
    }
}
