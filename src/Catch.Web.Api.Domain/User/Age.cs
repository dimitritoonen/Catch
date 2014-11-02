using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Domain
{
    internal class Age
    {
        private string _age;

        public Age(string age)
        {
            this._age = age;
        }

        public override string ToString()
        {
            return _age;
        }
    }
}
