#region using directives

using System;
using System.ComponentModel.DataAnnotations;

#endregion

namespace Chirping.Web.Api.BindingModels.Account
{
    public class ConfirmEmailBindingModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Code { get; set; }
    }
}