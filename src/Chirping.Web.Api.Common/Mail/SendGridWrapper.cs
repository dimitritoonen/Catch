#region using directives

using SendGrid;
using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Common.Mail
{
    // represents a wrapper for the SendGrid object
    public class SendGridWrapper
    {
        private readonly MailAddress _from = new MailAddress("noreply@chirping.nl", "Chirping");

        #region constructor

        private MailAddress _to = null;
        private string _subject = "";

        public SendGridWrapper(MailAddress to, string subject)
        {
            this._to = to;
            this._subject = subject;
        }

        #endregion

        public Task GetTransportWebAsync(MailMessageBody body)
        {
            var msg = new SendGridMessage();
            msg.AddTo(_to.Address);
            msg.From = _from;
            msg.Subject = _subject;
            msg.Text = body.ToString();
            msg.Html = body.ToString();

            var credentials = new NetworkCredential(GetMailAccount(), GetMailPassword());

            // create a Web transport for sending mail
            var transportWeb = new SendGrid.Web(credentials);

            // return the web transport
            if (transportWeb != null)
            {
                return transportWeb.DeliverAsync(msg);
            }
            else
            {
                return Task.FromResult(0);
            }
        }

        #region get configuration settings

        private string GetMailAccount()
        {
            return GetConfiguration("SendGridAccount");
        }

        private string GetMailPassword()
        {
            return GetConfiguration("SendGridPassword");
        }

        private string GetConfiguration(string key)
        {
            var config = ConfigurationManager.AppSettings[key];

            if (config == null)
                throw new ArgumentNullException(key, string.Format("Couldn't find appSetting '{0}'", key));

            return config;
        }

        #endregion
    }
}