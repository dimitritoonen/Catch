#region using directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Domain
{
    public class ProfileImage
    {
        private string _image;

        public ProfileImage(string image)
        {
            this._image = image;
        }

        public override string ToString()
        {
            return _image;
        }
    }
}
