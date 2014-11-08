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
            //var users = new List<UserEntity>
            //{
            //    new UserEntity { Id = 1, Name = "John Doe", Age = "25 - 35", Email = "johndoe@catch.me", InterestedIn = "Female" }
            //};

            //users.ForEach(s => context.Profiles.Add(s));
            //context.SaveChanges();

            base.Seed(context);
        }
    }
}
