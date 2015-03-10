#region using directives

using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Processors;

using System.Web.Http;
using System;
using System.Net.Mail;
using Chirping.Web.Api.Processors.Interfaces;

#endregion

namespace Chirping.Web.Api.Controllers
{
    [Authorize]
    public class EmailController : ApiController
    {
        #region constructor

        private IUserProcessor _processor;
        
        public EmailController(IUserProcessor processor)
        {
            this._processor = processor;
        }

        #endregion
        
        [AllowAnonymous]
        [HttpGet]
        public bool EmailAdressAvailable(string emailAddress)
        {
            if (!IsValidEmail(emailAddress))
                return false;

            return _processor.EmailAddressInUse(emailAddress);
        }

        private bool IsValidEmail(string emailAddress)
        {
            try
            {
                var address = new MailAddress(emailAddress);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
