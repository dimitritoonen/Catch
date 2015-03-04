using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chirping.Web.Api.BindingModels.Activity
{
    public class CategoryBindingModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
    }
}