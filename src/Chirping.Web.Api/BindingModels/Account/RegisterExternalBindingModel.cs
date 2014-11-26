#region using directives

using System;
using System.ComponentModel.DataAnnotations;

#endregion

namespace Chirping.Web.Api.BindingModels.Account
{
    public class RegisterExternalBindingModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string ExternalAccessToken { get; set; }


        [Required]
        public ProfileBindingModel Profile { get; set; }
    }
}