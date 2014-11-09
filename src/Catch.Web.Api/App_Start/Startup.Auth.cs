#region using directives

using Catch.Web.Api.Providers;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Configuration;

#endregion

namespace Catch.Web.Api
{
    public partial class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static FacebookAuthenticationOptions FacebookAuthOptions { get; private set; }

        public void ConfigureAuth(IAppBuilder app)
        {
            // use a cookie to temporarily store information about a user logging in with a 
            //  third party provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            OAuthAuthorizationServerOptions OAuthOptions = new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/Token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new SimpleAuthorizationServerProvider()
                //AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
            };

            // token generation
            app.UseOAuthAuthorizationServer(OAuthOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            // configure Facebook external login
            FacebookAuthOptions = new FacebookAuthenticationOptions
            {
                AppId = ConfigurationManager.AppSettings["Facebook.AppId"], // 889224261090562
                AppSecret = ConfigurationManager.AppSettings["Facebook.AppSecret"], // e1e4156e53f1ada9118667fb96f87ceb
                Provider = new FacebookAuthProvider()
            };

            app.UseFacebookAuthentication(FacebookAuthOptions);

            app.UseCors(CorsOptions.AllowAll);
        }
    }
}
