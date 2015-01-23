#region using directives

using Chirping.Web.Api.Common.Mail;

using Microsoft.AspNet.Identity;

using System.Net.Mail;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Security
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            return ConfigurationSendGridAsync(message);
        }

        private Task ConfigurationSendGridAsync(IdentityMessage identityMessage)
        {
            var to = new MailAddress(identityMessage.Destination);
            var body = new MailMessageBody(identityMessage.Body);

            var wrapper = new SendGridWrapper(to, identityMessage.Subject);
            return wrapper.GetTransportWebAsync(body);
        }
    }
}
