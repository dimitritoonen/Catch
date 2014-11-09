using Catch.Web.Api.Common.Data;
using Catch.Web.Api.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;

namespace Catch.Web.Api.Data.Context
{
    public class CatchContext : IdentityDbContext<UserAccountEntity>
    {
        public CatchContext()
            : base("CatchConnectionString")
        {
        }

        public DbSet<ClientEntity> Clients { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<IdentityUser>().ToTable("User");
            //modelBuilder.Entity<UserAccountEntity>().ToTable("User");

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public static CatchContext Create()
        {
            return new CatchContext();
        }
    }
}