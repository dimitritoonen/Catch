using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Backend.Domain.Entities.Profile
{
    public class AgeRange
    {
        private int _minAge;
        private int _maxAge;

        public AgeRange(int minAge, int maxAge)
        {
            this._minAge = minAge;
            this._maxAge = maxAge;
        }

        public override string ToString()
        {
            return string.Format("{0}-{1}", _minAge, _maxAge);
        }
    }
}
