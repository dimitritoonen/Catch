using Catch.Web.Api.Common.TypeMapping;
using Catch.Web.Api.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;

namespace Catch.Web.Api
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            new AutoMapperConfigurator().Config(
                WebContainerManager.GetAll<IAutoMapperTypeConfigurator>());
        }
    }
}