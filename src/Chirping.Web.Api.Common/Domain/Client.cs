#region using directives

using Chirping.Web.Api.Common.Account;

using System;

#endregion

namespace Chirping.Web.Api.Common.Domain
{
    public class Client : DomainModel
    {
        public string Id { get; set; }
        public string Secret { get; set; }
        public string Name { get; set; }
        public ApplicationTypes ApplicationType { get; set; }
        public bool Active { get; set; }
        public int RefreshTokenLifeTime { get; set; }
        public string AllowedOrigin { get; set; }
    }
}
