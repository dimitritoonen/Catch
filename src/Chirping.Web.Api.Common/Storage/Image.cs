#region using directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Common.Storage
{
    public class Image
    {
        public string FileName { get; private set; }
        public byte[] ImageInBytes { get; private set; }

        public Image(string filename, byte[] imageInBytes)
        {
            this.FileName = filename;
            this.ImageInBytes = imageInBytes;
        }
    }
}
