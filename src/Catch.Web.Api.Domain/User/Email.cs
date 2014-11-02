using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;

namespace Catch.Web.Api.Domain
{
    internal class Email
    {
        private string _email;

        public Email(string email)
        {
            if (!IsValidEmailAddress(email))
                throw new InvalidCastException(string.Format("Could not parse email address: {0}", email));

            this._email = email;
        }

        public static bool IsValidEmailAddress(string email)
        {
            try
            {
                var mailAddress = new MailAddress(email);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        public override string ToString()
        {
            return _email;
        }
    }
}


