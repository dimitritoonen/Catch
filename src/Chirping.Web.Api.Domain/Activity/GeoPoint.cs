#region using directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Domain
{
    public class GeoPoint
    {
        public double Latitude { get; private set; }
        public double Longitude { get; private set; }

        public GeoPoint(double latitude, double longitude)
        {
            this.Latitude = latitude;
            this.Longitude = longitude;
        }
    }
}
