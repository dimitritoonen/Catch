using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Catch.Backend.Domain.Entities;
using Catch.Backend.Domain.Entities.Profile;

namespace Catch.Backend.Domain
{
    public class ChatMessage
    {
        public ChatMessage()
        {
            TimeStamp = DateTime.Now;
        }

        public Message Message { get; set; }
        public Profile From { get; set; }
        public Profile To { get; set; }

        public DateTime TimeStamp { get; private set; }
    }
}
