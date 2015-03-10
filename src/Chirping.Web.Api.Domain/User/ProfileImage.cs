#region using directives

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Domain
{
    public class ProfileImage
    {
        // default profile image
        private readonly string _defaultFileName = "/images/no_profile-051cc221.png";
        private readonly string _defaultAvatarFileName = "/images/no_profile-051cc221_avatar.png";

        private string _cloudLocation = "";

        public ProfileImage()
        {
            this.FileName = _defaultFileName;
            this.AvatarFileName = _defaultAvatarFileName;
        }

        public ProfileImage(string filename)
        {
            InitializeCloudLocation();

            this.FileName = string.Format("{0}/profileimages/{1}.jpg", _cloudLocation, filename);
            this.AvatarFileName = string.Format("{0}/profileimages/{1}_avatar.jpg", _cloudLocation, filename);
        }

        // get cloud settings
        private void InitializeCloudLocation()
        {
            var setting = ConfigurationManager.AppSettings["CloudStorage.Url"];

            if (!string.IsNullOrEmpty(setting))
            {
                _cloudLocation = setting;
            }
        }

        public string FileName { get; private set; }
        public string AvatarFileName { get; private set; }
    }
}
