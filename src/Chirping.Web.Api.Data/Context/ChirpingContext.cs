#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Data.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Data.Context
{
    public class ChirpingContext : DbContext
    {
        public ChirpingContext()
            : base("ChirpingContext")
        {
        }


        public DbSet<ClientEntity> Clients { get; set; }

        public DbSet<CategoryEntity> Categories { get; set; }

        public DbSet<ActivityEntity> Activities { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            AddManyToManyActivityProfile(modelBuilder);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }


        private static void AddManyToManyActivityProfile(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActivityEntity>()
                .HasMany(x => x.Participants)
                .WithMany(x => x.Activities)
                .Map(m =>
                {
                    m.ToTable("ActivityProfile");
                    m.MapLeftKey("ActivityId");
                    m.MapRightKey("ProfileId");
                });
        }
    }
}
