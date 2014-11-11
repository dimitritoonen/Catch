using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Catch.Web.Api.BindingModels.Account
{
    public class EmailAddressInUseBindingModel
    {
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Confirm email")]
        public string EmailAddress { get; set; }
    }
}