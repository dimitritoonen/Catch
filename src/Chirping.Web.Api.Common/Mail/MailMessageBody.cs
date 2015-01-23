#region using directives

using System;

#endregion

namespace Chirping.Web.Api.Common.Mail
{
    public class MailMessageBody
    {
        private string _mailMessage = "";

        public MailMessageBody(string mailMessage)
        {
            this._mailMessage = mailMessage;
        }

        public override string ToString()
        {
            return _mailMessage;
        }
    }
}
