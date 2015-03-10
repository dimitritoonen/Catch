#region using directives

using System;
using System.ComponentModel.DataAnnotations;

#endregion

namespace Chirping.Web.Api.BindingModels.Activity
{
    public class TimeFrameBindingModel
    {
        public string FromDate { get; set; }
        public string TillDate { get; set; }
    }
}