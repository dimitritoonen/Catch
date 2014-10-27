using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Catch.Backend.Domain.Entities;
using Catch.Backend.Domain.Entities.Profile;

namespace Catch.Backend.Domain
{
    public class Profile
    {
        public Name Name { get; set; }
        public AgeRange Age { get; set; }
        public PictureList ProfilePictures { get; set; }
        public AttractedTo Likes { get; set; }
    }
}
