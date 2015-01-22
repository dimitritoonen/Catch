#region using directives

using System.ComponentModel.DataAnnotations;

#endregion

namespace Chirping.Web.Api.BindingModels.Account
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}