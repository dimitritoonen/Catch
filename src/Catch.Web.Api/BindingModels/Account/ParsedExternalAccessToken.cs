#region using directives

using System;

#endregion

namespace Chirping.Web.Api.BindingModels.Account
{
    public class ParsedExternalAccessToken
    {
        public string user_id { get; set; }
        public string app_id { get; set; }
    }
}