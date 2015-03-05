#region using directives

using System;
using System.Linq;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.BindingModels.Activity
{
    public class ActivityBindingModel
    {
        public int Id { get; set; }
        public CategoryBindingModel Category { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public string Content { get; set; }
        public ProfileBindingModel Owner { get; set; }
        public List<ProfileBindingModel> Participants { get; set; }
        public int MaxParticipants { get; set; }
    }
}