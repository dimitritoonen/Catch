#region using directives

using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Infrastructure;
using Chirping.Web.Api.Providers;
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

[assembly: OwinStartup(typeof(Chirping.Web.Api.Startup))]

namespace Chirping.Web.Api
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
                AppId = ConfigurationManager.AppSettings["Facebook.AppId"],
                AppSecret = ConfigurationManager.AppSettings["Facebook.AppSecret"],
                Provider = new FacebookAuthProvider()
            };
            FacebookAuthOptions.Scope.Add("email");
            app.UseFacebookAuthentication(FacebookAuthOptions);
        }
    }
}
