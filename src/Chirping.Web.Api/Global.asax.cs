using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Data;
using Chirping.Web.Api.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;

namespace Chirping.Web.Api
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            new AutoMapperConfigurator().Config(
                WebContainerManager.GetAll<IAutoMapperTypeConfigurator>());
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
    }
}