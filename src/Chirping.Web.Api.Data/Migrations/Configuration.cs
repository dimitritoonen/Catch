#region using directives

using Chirping.Web.Api.Common.Account;
using Chirping.Web.Api.Data.Context;
using Chirping.Web.Api.Data.Entities;
using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;

#endregion 

namespace Chirping.Web.Api.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<ChirpingContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ChirpingContext context)
        {
            SeedClients(context);
        }

        private static void SeedClients(ChirpingContext context)
        {
            var clientId = "ChirpingWeb";
            var client = context.Clients.Find(clientId);

            if (client == null)
            {
                context.Clients.Add(
                    new ClientEntity
                    {
                        Id = clientId,
                        Secret = Guid.NewGuid().ToString(),
                        Name = "Chirping front-end application",
                        ApplicationType = ApplicationTypes.JavaScript,
                        Active = true,
                        RefreshTokenLifeTime = 0,
                        AllowedOrigin = "http://www.chirping.nl"
                    }
                );
            }
        }
    }
}
