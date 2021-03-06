﻿#region using directives

using Chirping.Web.Api.ActionFilters;
using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Processors.Account;
using Chirping.Web.Api.Results;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using System;
using System.Configuration;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

#endregion

namespace Chirping.Web.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string FacebookProvider = "facebook";

        #region constructor

        private IAccountProcessor _processor;

        public AccountController(IAccountProcessor processor)
        {
            this._processor = processor;
        }

        #endregion

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        [HttpPost]
        [CheckModelForNull]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            IdentityResult result = await _processor.RegisterUser(model);
            
            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            var accessTokenResponse = GenerateLocalAccessTokenResponse(model.Email);

            return Ok(accessTokenResponse);
        }


        [AllowAnonymous]
        [Route("ConfirmEmail")]
        [HttpPost]
        [CheckModelForNull]
        public async Task<IHttpActionResult> ConfirmEmail(ConfirmEmailBindingModel model)
        {
            var result = await _processor.ConfirmEmailAsync(model.UserId, model.Code);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                var response = GetConfirmEmailResponse();
                throw new HttpResponseException(response);
            }

            return Ok();
        }

        private HttpResponseMessage GetConfirmEmailResponse()
        {
            return new HttpResponseMessage(HttpStatusCode.NotFound)
            {
                Content = new StringContent("The incorrect confirm code has been provided. Please request another one"),
                ReasonPhrase = "Invalid confirm code"
            };
        }


        
        [AllowAnonymous]
        [Route("ForgotPassword")]
        [HttpPost]
        [CheckModelForNull]
        public async Task<IHttpActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            var user = await _processor.FindByEmailAsync(model.Email);
            if (user == null || 
                !(await _processor.IsEmailConfirmedAsync(user.Id)))
            {
                // Don't reveal that the user does not exist or is not confirmed
                return Ok();
            }

            await _processor.SendResetPasswordEmail(model.Email, user.Id);

            return Ok();
        }

        [AllowAnonymous]
        [Route("ResetPassword")]
        [HttpPost]
        [CheckModelForNull]
        public async Task<IHttpActionResult> ResetPassword(ResetPasswordBindingModel model)
        {
            var user = await _processor.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // don't reveal to the user that the e-mail address is not registered
                return Ok();
            }

            try
            {
                var result = await _processor.ResetPassword(model);
                IHttpActionResult errorResult = GetErrorResult(result);

                if (!result.Succeeded)
                {
                    return BadRequest();
                }
            }
            catch (DbEntityValidationException ex)
            {
                TraceErrors(ex);
            }

            return Ok();
        }

        private static void TraceErrors(DbEntityValidationException ex)
        {
            foreach (var validationErrors in ex.EntityValidationErrors)
            {
                foreach (var validationError in validationErrors.ValidationErrors)
                {
                    Trace.TraceError("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
                }
            }
        }



        // POST api/Account/Logout
        [Route("ChangePassword")]
        [HttpPost]
        [CheckModelForNull]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel changedPassword)
        {
            IdentityResult result = await _processor.ChangePassword(changedPassword);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        [AllowAnonymous]
        [Route("IsUserAuthenticated")]
        [HttpGet]
        public bool IsUserAuthenticated()
        {
            return User != null &&
                    User.Identity != null &&
                    User.Identity.IsAuthenticated;
        }


        #region operations for external login (Google, Facebook, etc)

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            string redirectUri = "";

            if (error != null)
            {
                return BadRequest(Uri.EscapeDataString(error));
            }

            if (!User.Identity.IsAuthenticated)
            {
                return new ChallengeResult(provider, this);
            }

            var redirectUriValidationResult = ValidateClientAndRedirectUri(this.Request, ref redirectUri);

            if (!string.IsNullOrWhiteSpace(redirectUriValidationResult))
            {
                return BadRequest(redirectUriValidationResult);
            }

            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Request.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                return new ChallengeResult(provider, null);
            }

            IdentityUser user = await IsUserRegistered(externalLogin);
            bool hasRegistered = (user != null);
            bool isRegisteredAsExternal = IsRegisteredAsExternal(user);

            var email = HttpUtility.UrlEncode(externalLogin.Email);

            redirectUri = string.Format("{0}#external_access_token={1}&provider={2}&haslocalaccount={3}&external_email={4}&isregisteredasexternal={5}",
               redirectUri,
               externalLogin.ExternalAccessToken,
               externalLogin.LoginProvider,
               hasRegistered.ToString(),
               email,
               isRegisteredAsExternal);

            return Redirect(redirectUri);
        }


        // checks if the user is registered with username and password (ergo. Not registered with external provider)
        private static bool IsRegisteredAsExternal(IdentityUser user)
        {
            return (user != null && user.PasswordHash == null);
        }

        private async Task<IdentityUser> IsUserRegistered(ExternalLoginData externalLogin)
        {
            // check user existence by provider id
            IdentityUser user = await _processor.FindAsync(new UserLoginInfo(externalLogin.LoginProvider, externalLogin.ProviderKey));
            if (user != null)
                return user;

            // if user is not registered via facebook, maybe the e-mail address is still used for manual registration.
            return await _processor.FindByEmailAsync(externalLogin.Email);

            //return (user != null);
        }

        [AllowAnonymous]
        [Route("RegisterExternal")]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {
            var provider = "facebook";

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var verifiedAccessToken = await VerifyExternalAccessToken(provider, model.ExternalAccessToken);
            if (verifiedAccessToken == null)
            {
                return BadRequest("Invalid Provider or External Access Token");
            }

            UserAccountEntity user = await _processor.FindAsync(new UserLoginInfo(provider, verifiedAccessToken.user_id));

            bool hasRegistered = (user != null);

            if (hasRegistered)
            {
                return BadRequest("External user is already registered");
            }

            //user = new UserAccountEntity() { UserName = model.Email, Email = model.Email };

            IdentityResult result = await _processor.CreateAsync(model);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            var info = new ExternalLoginInfo
            {
                DefaultUserName = model.Email,
                Login = new UserLoginInfo(provider, verifiedAccessToken.user_id)
            };

            user = await _processor.FindByEmailAsync(model.Email);

            result = await _processor.AddLoginAsync(user.Id, info.Login);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            var accessTokenResponse = GenerateLocalAccessTokenResponse(model.Email);

            return Ok(accessTokenResponse);
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("ObtainLocalAccessToken")]
        public async Task<IHttpActionResult> ObtainLocalAccessToken(string provider, string externalAccessToken)
        {
            if (string.IsNullOrWhiteSpace(provider) || string.IsNullOrWhiteSpace(externalAccessToken))
            {
                return BadRequest("Provider or external access token is not sent");
            }

            var verifiedAccessToken = await VerifyExternalAccessToken(provider, externalAccessToken);
            if (verifiedAccessToken == null)
            {
                return BadRequest("Invalid Provider or external access token");
            }

            IdentityUser user = await _processor.FindAsync(new UserLoginInfo(provider, verifiedAccessToken.user_id));

            bool hasRegistered = (user != null);

            if (!hasRegistered)
            {
                return BadRequest("External user is not registered");
            }

            var accessTokenResponse = GenerateLocalAccessTokenResponse(user.UserName);

            return Ok(accessTokenResponse);
        }

        private async Task<ParsedExternalAccessToken> VerifyExternalAccessToken(string provider, string accessToken)
        {
            if (string.Compare(provider, FacebookProvider, true) != 0)
                return null;

            var appToken = ConfigurationManager.AppSettings["Facebook.AppToken"];
            var verifyTokenEndPoint = string.Format("https://graph.facebook.com/debug_token?input_token={0}&access_token={1}", accessToken, appToken);

            ParsedExternalAccessToken parsedToken = null;

            var client = new HttpClient();
            var uri = new Uri(verifyTokenEndPoint);
            var response = await client.GetAsync(uri);

            if (!response.IsSuccessStatusCode)
                return parsedToken;

            parsedToken = await GetParsedTokenFromRequestContent(parsedToken, response);

            if (!string.Equals(Startup.FacebookAuthOptions.AppId, parsedToken.app_id, StringComparison.OrdinalIgnoreCase))
            {
                return null;
            }

            return parsedToken;
        }

        private async Task<ParsedExternalAccessToken> GetParsedTokenFromRequestContent(ParsedExternalAccessToken parsedToken, HttpResponseMessage response)
        {
            var content = await response.Content.ReadAsStringAsync();

            dynamic jObj = (JObject)Newtonsoft.Json.JsonConvert.DeserializeObject(content);

            parsedToken = new ParsedExternalAccessToken();

            parsedToken.user_id = jObj["data"]["user_id"];
            parsedToken.app_id = jObj["data"]["app_id"];

            return parsedToken;
        }

        private JObject GenerateLocalAccessTokenResponse(string userName)
        {
            var tokenExpiration = TimeSpan.FromDays(1);

            ClaimsIdentity identity = new ClaimsIdentity(OAuthDefaults.AuthenticationType);

            identity.AddClaim(new Claim(ClaimTypes.Name, userName));
            identity.AddClaim(new Claim("role", "user"));

            var props = new AuthenticationProperties()
            {
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.Add(tokenExpiration),
            };

            var ticket = new AuthenticationTicket(identity, props);

            var accessToken = Startup.OAuthBearerOptions.AccessTokenFormat.Protect(ticket);

            JObject tokenResponse = new JObject(
                new JProperty("userName", userName),
                new JProperty("access_token", accessToken),
                new JProperty("token_type", "bearer"),
                new JProperty("expires_in", tokenExpiration.TotalSeconds.ToString()),
                new JProperty(".issued", ticket.Properties.IssuedUtc.ToString()),
                new JProperty(".expires", ticket.Properties.ExpiresUtc.ToString())
            );

            return tokenResponse;
        }

        #endregion

        #region helpers

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private string ValidateClientAndRedirectUri(HttpRequestMessage request, ref string redirectUriOutput)
        {
            Uri redirectUri;

            var redirectUriString = GetQueryString(Request, "redirect_uri");

            if (string.IsNullOrWhiteSpace(redirectUriString))
            {
                return "redirect_uri is required";
            }

            bool validUri = Uri.TryCreate(redirectUriString, UriKind.Absolute, out redirectUri);

            if (!validUri)
            {
                return "redirect_uri is invalid";
            }

            var clientId = GetQueryString(Request, "client_id");

            if (string.IsNullOrWhiteSpace(clientId))
            {
                return "client_Id is required";
            }

            var client = _processor.FindClient(clientId);

            if (client == null)
            {
                return string.Format("Client_id '{0}' is not registered in the system.", clientId);
            }

            if (!string.Equals(client.AllowedOrigin, redirectUri.GetLeftPart(UriPartial.Authority), StringComparison.OrdinalIgnoreCase))
            {
                return string.Format("The given URL is not allowed by Client_id '{0}' configuration.", clientId);
            }

            redirectUriOutput = redirectUri.AbsoluteUri;

            return string.Empty;
        }

        private string GetQueryString(HttpRequestMessage request, string key)
        {
            var queryStrings = request.GetQueryNameValuePairs();

            if (queryStrings == null)
                return null;

            var match = queryStrings.FirstOrDefault(keyValue => string.Compare(keyValue.Key, key, true) == 0);

            if (string.IsNullOrEmpty(match.Value))
                return null;

            return match.Value;
        }

        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _processor.Dispose();
            }

            base.Dispose(disposing);
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string Email { get; set; }
            public string UserName { get; set; }
            public string ExternalAccessToken { get; set; }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer) || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name),
                    Email = identity.FindFirstValue(ClaimTypes.Email),
                    ExternalAccessToken = identity.FindFirstValue("ExternalAccessToken"),
                };
            }
        }
    }
}