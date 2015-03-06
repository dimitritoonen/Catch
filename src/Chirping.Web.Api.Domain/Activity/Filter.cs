#region using directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Domain
{
    public class Filter
    {
        public Filter()
        {
            SetFilterDefaults();
        }

        // define the default values for the activity filter
        private void SetFilterDefaults()
        {
            NrOfParticipants = 6;
        }

        public string Search { get; set; }
        public string Category { get; set; }
        public TimeFrame DateDuration { get; set; }
        public BetweenTime BetweenTime { get; set; }
        public int NrOfParticipants { get; set; }
    }
}
