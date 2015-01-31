using Chirping.Web.Api.Common.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;

namespace Chirping.Web.Api.Security.Data.Context
{
    public class ChirpingIdentityContext : IdentityDbContext<UserAccountEntity>
    {
        public ChirpingIdentityContext()
            : base("ChirpingIdentityContext")
        {
        }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public static ChirpingIdentityContext Create()
        {
            return new ChirpingIdentityContext();
        }
    }
}