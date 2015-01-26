#region using directives

using Chirping.Web.Api.Common.Mail;
using Chirping.Web.Api.Diagnostics;
using Microsoft.AspNet.Identity;
using System;
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
                LogError(identityMessage, ex);

                throw ex;
            }
        }

        private static void LogError(IdentityMessage identityMessage, Exception ex)
        {
            using (var logScope = new LogOperationScope("Account"))
            {
                var message = "Unexcepted error while sending e-mail to '{0}'";
                logScope.TraceError(LogEvent.ErrorAccountSendEmail, ex, message, identityMessage.Destination);
            }
        }
    }
}
