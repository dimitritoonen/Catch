using Catch.Web.Api.Data.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;

namespace Catch.Web.Api.Data
{
    public class CatchContext : DbContext
    {
        public CatchContext()
            : base("CatchConnectionString")
        {
        }

        public DbSet<UserEntity> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}