using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Catch.Backend.Domain.Entities.Profile
{
    public class Message
    {
        private string _message;

        public Message(string message)
        {
            this._message = message;
        }

        public override string ToString()
        {
            return _message;
        }
    }
}
