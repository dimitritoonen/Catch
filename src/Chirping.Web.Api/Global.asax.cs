#region using directives

using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.ExceptionHandling;
using Chirping.Web.Api.Infrastructure;
using System;
using System.Diagnostics;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
// http://brockallen.com/2013/02/18/configuring-machine-key-protection-of-session-tokens-in-wif-and-thinktecture-identitymodel/
using Thinktecture.IdentityModel.Web;

#endregion

namespace Chirping.Web.Api
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            new AutoMapperConfigurator().Config(
                WebContainerManager.GetAll<IAutoMapperTypeConfigurator>());

            // see Thinktecture.IdentityModel.Web using
            PassiveSessionConfiguration.ConfigureMackineKeyProtectionForSessionTokens();

            RegisterExceptionHandler();
        }

        protected void Application_Error()
        {
            var exception = Server.GetLastError();

            if (exception != null)
            {
                Trace.TraceError(exception.ToString());
            }
        }

        private void RegisterExceptionHandler()
        {
            GlobalConfiguration.Configuration.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler());
        }
    }
}