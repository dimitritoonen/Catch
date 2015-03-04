#region using directives

using System;
using System.ComponentModel;

#endregion

namespace Chirping.Web.Api.BindingModels.Activity
{
    public class BetweenTimeBindingModel
    {
        public uint BeginTime { get; set; }
        public uint EndTime { get; set; }
    }
}