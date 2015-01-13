#region using directives

using Chirping.Web.Api.Common.Account;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Repository;
using Chirping.Web.Api.Infrastructure;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Providers
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            if (IsEmailAddressInvalid(context.UserName))
            {
                context.SetError("invalid_grant", "incorrect_email");
                return;
            }

            IAccountRepository repository = WebContainerManager.Get<IAccountRepository>();

            IdentityUser emailRegistered = await repository.FindByEmailAsync(context.UserName);
            if (emailRegistered == null)
            {
                context.SetError("invalid_grant", "email_not_registered");
                return;
            }

            IdentityUser user = await repository.FindUser(context.UserName, context.Password);
            repository.Dispose();

            if (user == null)
            {
                context.SetError("invalid_grant", "incorrect_password");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role", "user"));

            context.Validated(identity);
        }

        private bool IsEmailAddressInvalid(string emailAddress)
        {
            return (string.IsNullOrWhiteSpace(emailAddress) ||
                !IsValidEmail(emailAddress));
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
        
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;
            Client client = null;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            if (context.ClientId == null)
            {
                // Remove the comments from the below line context.SetError, and invalidate context 
                // if you want to force sending clientId/secrects once obtain access tokens. 
                context.Validated();
                //context.SetError("invalid_clientId", "ClientId should be sent.");
                return Task.FromResult<object>(null);
            }

            client = GetClientFromRepository(context, client);

            if (client == null)
            {
                context.SetError("invalid_clientId", string.Format("Client '{0}' is not registered in the system.", context.ClientId));
                return Task.FromResult<object>(null);
            }

            if (client.ApplicationType == ApplicationTypes.NativeConfidential)
            {
                if (string.IsNullOrWhiteSpace(clientSecret))
                {
                    context.SetError("invalid_clientId", "Client secret should be sent.");
                    return Task.FromResult<object>(null);
                }
                else
                {
                    if (client.Secret != GetHash(clientSecret))
                    {
                        context.SetError("invalid_clientId", "Client secret is invalid.");
                        return Task.FromResult<object>(null);
                    }
                }
            }

            if (!client.Active)
            {
                context.SetError("invalid_clientId", "Client is inactive.");
                return Task.FromResult<object>(null);
            }

            context.Validated();
            return Task.FromResult<object>(null);
        }

        private static Client GetClientFromRepository(OAuthValidateClientAuthenticationContext context, Client client)
        {
            IAccountRepository repository = WebContainerManager.Get<IAccountRepository>();
            client = repository.FindClient(context.ClientId);
            repository.Dispose();
            return client;
        }

        public string GetHash(string input)
        {
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();

            byte[] byteValue = System.Text.Encoding.UTF8.GetBytes(input);
            byte[] byteHash = hashAlgorithm.ComputeHash(byteValue);

            return Convert.ToBase64String(byteHash);
        }
    }
}
