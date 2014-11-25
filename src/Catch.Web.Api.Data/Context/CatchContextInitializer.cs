using Chirping.Web.Api.Common.Account;
using Chirping.Web.Api.Data.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Data.Context
{
    public class ChirpingContextInitializer : DropCreateDatabaseIfModelChanges<ChirpingContext> // DropCreateDatabaseAlways<CatchContext>
    {
        protected override void Seed(ChirpingContext context)
        {
            var clients = new List<ClientEntity>
            {
                new ClientEntity
                {
                    Id = "ChirpingWeb",
                    Secret = Guid.NewGuid().ToString(),
                    Name = "Chirping front-end application",
                    ApplicationType = ApplicationTypes.JavaScript,
                    Active = true,
                    RefreshTokenLifeTime = 0,
                    AllowedOrigin = "*"
                }
            };

            clients.ForEach(s => context.Clients.Add(s));
            context.SaveChanges();

            base.Seed(context);
        }
    }
}
