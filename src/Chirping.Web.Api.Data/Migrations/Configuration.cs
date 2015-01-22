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
            context.Clients.AddOrUpdate(
                p => p.Id,
                new ClientEntity
                {
                    Id = "ChirpingWeb",
                    Secret = Guid.NewGuid().ToString(),
                    Name = "Chirping front-end application",
                    ApplicationType = ApplicationTypes.JavaScript,
                    Active = true,
                    RefreshTokenLifeTime = 0,
                    //AllowedOrigin = "http://api.chirping.nl/"
                    AllowedOrigin = "http://localhost:8080/"
                }
            );
        }
    }
}
