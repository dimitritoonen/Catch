#region using directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

#endregion

namespace Chirping.Web.Api.BindingModels.Activity
{
    public class AddActivityBindingModel
    {
        public CategoryBindingModel Category { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public string Content { get; set; }
        public int ProfileId { get; set; }
        public int MaxParticipants { get; set; }
        public bool ChainAccept { get; set; }
    }
}