#region using directives

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

#endregion

namespace Chirping.Web.Api.BindingModels
{
    public class ProfileBindingModel
    {
        [Required]
        [Display(Name = "Nick name")]
        public string NickName { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        [Range(0, 150, ErrorMessage = "Please fill in a proper age")]
        public string Age { get; set; }

        public string Image { get; set; }
    }
}