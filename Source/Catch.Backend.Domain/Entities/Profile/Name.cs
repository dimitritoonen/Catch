using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Catch.Backend.Domain.Entities.Profile
{
    public class Name
    {
        private string _firstName;
        private string _lastName;

        public Name(string firstName, string lastName)
        {
            this._firstName = firstName;
            this._lastName = lastName;
        }

        public override string ToString()
        {
            return string.Format("{0} {1}", _firstName, _lastName);
        }
    }
}
