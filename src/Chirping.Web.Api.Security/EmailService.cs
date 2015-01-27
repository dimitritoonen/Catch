#region using directives

using Chirping.Web.Api.Common.Mail;
using Microsoft.AspNet.Identity;
using System;
using System.Diagnostics;
using System.Net.Mail;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Security
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            return GetConfigurationSendGridAsync(message);
        }

        private Task GetConfigurationSendGridAsync(IdentityMessage identityMessage)
        {
            try
            {
                var to = new MailAddress(identityMessage.Destination);
                var body = new MailMessageBody(identityMessage.Body);

                var wrapper = new SendGridWrapper(to, identityMessage.Subject);
                return wrapper.GetTransportWebAsync(body);
            }
            catch (Exception ex)
            {
                Trace.TraceError("Unexcepted error while sending e-mail to: '{0}', Exception: {1}", identityMessage.Destination, ex.ToString());

                throw ex;
            }
        }
    }
}
