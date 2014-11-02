#region using directives

using Catch.Web.Api.Domain;
using Catch.Web.Api.Models;

using System;

#endregion

namespace Catch.Web.Api.Processors
{
    public interface IUserProcessor
    {
        void AddUser(NewUser newUser);
    }
}
