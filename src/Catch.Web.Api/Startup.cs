#region using directives

using Catch.Web.Api.Common.TypeMapping;
using Catch.Web.Api.Infrastructure;
using Catch.Web.Api.Providers;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Configuration;
using System.Web.Http;

#endregion

[assembly: OwinStartup(typeof(Catch.Web.Api.Startup))]

namespace Catch.Web.Api
{
    public class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static FacebookAuthenticationOptions FacebookAuthOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            var config = GlobalConfiguration.Configuration;

            ConfigureOAuth(app);

            WebApiConfig.Register(config);
            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(config);
            config.EnsureInitialized();
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            // use a cookie to temporarily store information about a user logging in with a 
            //  third party provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            OAuthAuthorizationServerOptions OAuthOptions = new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new SimpleAuthorizationServerProvider()
                //AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
            };

            // token generation
            app.UseOAuthAuthorizationServer(OAuthOptions);
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);

            // configure Facebook external login
            FacebookAuthOptions = new FacebookAuthenticationOptions
            {
                AppId = ConfigurationManager.AppSettings["Facebook.AppId"], // 889224261090562
                AppSecret = ConfigurationManager.AppSettings["Facebook.AppSecret"], // e1e4156e53f1ada9118667fb96f87ceb
                Provider = new FacebookAuthProvider()
            };
            app.UseFacebookAuthentication(FacebookAuthOptions);
        }
    }
}
