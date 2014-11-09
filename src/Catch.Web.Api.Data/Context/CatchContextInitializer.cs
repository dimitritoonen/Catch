using Catch.Web.Api.Common.Account;
using Catch.Web.Api.Data.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Web.Api.Data.Context
{
    public class CatchContextInitializer : DropCreateDatabaseIfModelChanges<CatchContext> // DropCreateDatabaseAlways<CatchContext>
    {
        protected override void Seed(CatchContext context)
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
