using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Catch.Web.Api
{
    public class CorsConfigurator
    {
        public void Config(HttpConfiguration config)
        {
            bool enableCors = GetEnableCorsConfig();

            if (enableCors)
            {
                string origins = GetCorsOrigins();

                var cors = new EnableCorsAttribute(origins, "*", "*");

                config.EnableCors(cors);
            }
        }

        #region get web.config configurations

        private bool GetEnableCorsConfig()
        {
            if (ConfigurationManager.AppSettings["Cors.Enable"] == null)
                return false;

            return (string.Compare(ConfigurationManager.AppSettings["Cors.Enable"], "true", true) == 0);
        }

        private string GetCorsOrigins()
        {
            if (ConfigurationManager.AppSettings["Cors.Origins"] == null)
                return "";

            return ConfigurationManager.AppSettings["Cors.Origins"];
        }

        #endregion
    }
}