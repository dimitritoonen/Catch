using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Catch.Web.Api.BindingModels.Account
{
    public class RegisterBindingModel
    {
        [Required]
        [Display(Name = "Nick name")]
        public string NickName { get; set; }

        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Confirm email")]
        [Compare("Email", ErrorMessage = "The e-mail and confirmation e-mail do not match.")]
        public string ConfirmEmail { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        [Range(0, 150, ErrorMessage = "Please fill in a proper age")]
        public string Age { get; set; }

        [Required]
        public string InterestedIn { get; set; }
    }

}