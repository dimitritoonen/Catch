using Chirping.Web.Api.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;

namespace Chirping.Web.Api.Data.Context
{
    public class ChirpingContext : IdentityDbContext<UserAccountEntity>
    {
        public ChirpingContext()
            : base("ChirpingConnectionString")
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

        public static ChirpingContext Create()
        {
            return new ChirpingContext();
        }
    }
}