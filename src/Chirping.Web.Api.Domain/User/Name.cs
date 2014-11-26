using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Domain
{
    internal class Name
    {
        private string _name;

        public Name(string name)
        {
            this._name = name;
        }

        public override string ToString()
        {
            return this._name;
        }
    }
}
