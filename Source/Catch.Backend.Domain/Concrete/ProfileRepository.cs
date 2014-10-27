using Catch.Backend.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Backend.Domain.Concrete
{
    public class ProfileRepository : IProfileRepository
    {
        private CatchContext _context = new CatchContext();

        public IQueryable<Profile> Profiles
        {
            get
            {
                return _context.Profiles;
            }
        }

        public void SaveProfile(Profile profile)
        {
            _context.Profiles.Add(profile);
        }
    }
}
