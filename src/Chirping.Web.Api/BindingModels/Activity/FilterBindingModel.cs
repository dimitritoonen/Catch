#region using directives

using System;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.BindingModels.Activity
{
    public class FilterBindingModel
    {
        public string Search { get; set; }
        public string Category { get; set; }
        public int Participants { get; set; }
        public TimeFrameBindingModel Date { get; set; }
        public BetweenTimeBindingModel Time { get; set; }
    }
}