#region using directives

using System;

#endregion

namespace Catch.Web.Api.BindingModels.Account
{
    public class ParsedExternalAccessToken
    {
        public string user_id { get; set; }
        public string app_id { get; set; }
    }
}