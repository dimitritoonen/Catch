#region using directives

using System;

#endregion

namespace Catch.Web.Api.BindingModels.Account
{
    public class ExternalLoginViewModel
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public string State { get; set; }
    }
}