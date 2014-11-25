using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Domain
{
    internal class InterestedIn
    {
        private InterestedInEnum _interestedIn;

        public InterestedIn(string interestedIn)
        {
            this._interestedIn = ParseInterestedIn(interestedIn);
        }

        private InterestedInEnum ParseInterestedIn(string interestedIn)
        {
            InterestedInEnum result = InterestedInEnum.Both;
            if (Enum.TryParse<InterestedInEnum>(interestedIn, out result))
            {
                return result;
            }

            return InterestedInEnum.Both;
        }

        internal InterestedInEnum GetEnum()
        {
            return _interestedIn;
        }

        public override string ToString()
        {
            return _interestedIn.ToString();
        }
    }
}
