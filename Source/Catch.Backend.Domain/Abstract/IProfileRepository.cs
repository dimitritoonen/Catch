using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Catch.Backend.Domain.Abstract
{
    public interface IProfileRepository
    {
        IQueryable<Profile> Profiles { get; }

        void SaveProfile(Profile profile);
    }
}
