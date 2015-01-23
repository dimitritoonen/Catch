#region using directives

using Microsoft.AspNet.Identity;
using System;


#endregion

namespace Chirping.Web.Api.Data.Repository.Authorization
{
    public class RegisterUserResult
    {
        public IdentityResult IdentityResult { get; set; }
        public string UserId { get; set; }
    }
}
