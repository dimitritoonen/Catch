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
            SeedCategories(context);
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

        private static void SeedCategories(ChirpingContext context)
        {
            if (context.Categories.Count() == 0)
            {
                context.Categories.Add(new Category { Code = "dating", Description = "Dating" });
                context.Categories.Add(new Category { Code = "sport", Description = "Sport" });
                context.Categories.Add(new Category { Code = "entertainment", Description = "Entertainment" });
                context.Categories.Add(new Category { Code = "food", Description = "Food and Drinks" });
                context.Categories.Add(new Category { Code = "party", Description = "Party" });
                context.Categories.Add(new Category { Code = "museum", Description = "Museum" });
                context.Categories.Add(new Category { Code = "hiking", Description = "Hicking" });
                context.Categories.Add(new Category { Code = "travelling", Description = "Travelling" });
                context.Categories.Add(new Category { Code = "shopping", Description = "Shopping" });
            }
        }
    }
}
