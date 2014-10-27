using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Catch.Backend.Domain.Entities.Profile
{
    public class Picture
    {
        private string _location;

        public Picture(string location)
        {
            this._location = location;
        }

        public override string ToString()
        {
            return _location;
        }
    }
}
