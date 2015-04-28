#region using directives

using Chirping.Web.Api.Common.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Domain
{
    public class Activity : DomainModel
    {
        public Activity()
        {
            // new activity

            Participants = new List<Profile>();
        }

        public Activity(int id)
            : this()
        {
            this.Id = id;

            // existing activity
        }

        public int Id { get; private set; }
        public Category Category { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public Profile Owner { get; set; }
        public string ContentText { get; set; }
        public List<Profile> Participants { get; set; }
        public int MaxParticipants { get; set; }
        public bool ChainAccept { get; set; }
    }
}
