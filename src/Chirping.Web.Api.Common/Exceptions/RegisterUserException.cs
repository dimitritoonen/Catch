#region using directives

using Chirping.Web.Api.Common.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Common.Exceptions
{
    public class RegisterUserException : Exception
    {
        public UserAccount User { get; private set; }

        public RegisterUserException(UserAccount user, Exception innerException)
            : base(BuildMessage(user, innerException), innerException)
        {
            this.User = user;
        }

        private static string BuildMessage(UserAccount user, Exception innerException)
        {
            return string.Format("Unable to register user {0} ({1}) because of exception: {2}",
                    user.NickName,
                    user.Email,
                    innerException.ToString());
        }
    }
}
