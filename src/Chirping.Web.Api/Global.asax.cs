#region using directives

using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.ExceptionHandling;
using Chirping.Web.Api.Infrastructure;

using System;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

#endregion

namespace Chirping.Web.Api
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            new AutoMapperConfigurator().Config(
                WebContainerManager.GetAll<IAutoMapperTypeConfigurator>());

            RegisterExceptionHandler();
        }

        protected void Application_Error()
        {
            var exception = Server.GetLastError();

            if (exception != null)
            {
                Console.WriteLine(exception);

                // log!
            }
        }

        private void RegisterExceptionHandler()
        {
            GlobalConfiguration.Configuration.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler());
        }
    }
}