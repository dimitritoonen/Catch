#region using directives

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Common.Domain
{
    public class Profile : DomainModel
    {
        // default profile image
        private string _profileImage = "/images/no_profile-051cc221.png";

        private string _cloudLocation = "";

        public Profile(int id)
        {
            InitializeCloudLocation();
            
            this.Id = id;
        }

        private void InitializeCloudLocation()
        {
            var setting = ConfigurationManager.AppSettings[""];

            if (!string.IsNullOrEmpty(setting))
            {
                _cloudLocation = setting;
            }
        }

        public int Id { get; private set; }

        public string NickName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }

        public string ProfileImage
        {
            get
            {
                return _profileImage;
            }
            set
            {
                if (!string.IsNullOrEmpty(value))
                {
                    _profileImage = string.Format("{0}/profileimages/{1}", _cloudLocation, value);
                }                
            }
        }
    }
}