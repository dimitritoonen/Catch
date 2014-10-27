using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace Catch.Backend.Domain.Concrete
{
    public class CatchContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }
    }
}
