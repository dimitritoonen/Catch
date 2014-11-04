using Catch.Web.Api.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;

namespace Catch.Web.Api.Data
{
    public class CatchContext : IdentityDbContext<ApplicationUser>
    {
        public CatchContext()
            : base("CatchConnectionString")
        {
        }

        public DbSet<UserEntity> Profiles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public static CatchContext Create()
        {
            return new CatchContext();
        }
    }
}