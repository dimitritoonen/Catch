using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Catch.Backend.Domain.Abstract
{
    public interface IChatRepository
    {
        void SaveChatMessage(ChatMessage message);
    }
}
