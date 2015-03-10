#region using directives

using Chirping.Web.Api.Domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Common.Domain
{
    public class Profile : DomainModel
    {
        public Profile(int id)
        {            
            this.Id = id;
        }

        public int Id { get; private set; }

        public string NickName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }

        public ProfileImage ProfileImage { get; set; }
    }
}