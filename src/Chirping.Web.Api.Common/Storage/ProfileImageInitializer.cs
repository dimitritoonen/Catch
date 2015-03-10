#region using directives

using Chirping.Web.Api.Common.Extension;

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Common.Storage
{
    public class ProfileImageInitializer
    {
        private static readonly Size _avatarSize = new Size(75, 75);
        
        private ProfileImageInitializer() {}
        
        public static List<Image> GenerateImages(string originalImage, string filename)
        {
            List<Image> list = new List<Image>();
            
            byte[] originalImageInBytes = Convert.FromBase64String(originalImage);
            byte[] avatarImageInBytes = ResizeImageToAvatar(originalImageInBytes);

            var originalImageFileName = string.Format("{0}.jpg", filename);
            var avatarImageFileName = string.Format("{0}_avatar.jpg", filename);

            list.Add(new Image(originalImageFileName, originalImageInBytes));
            list.Add(new Image(avatarImageFileName, avatarImageInBytes));

            return list;
        }

        private static byte[] ResizeImageToAvatar(byte[] originalImage)
        {
            using (var stream = new MemoryStream(originalImage))
            {
                using (var image = System.Drawing.Image.FromStream(stream))
                {
                    // resize
                    var bitmap = new Bitmap(image, _avatarSize);

                    // compress
                    return bitmap.ToCompressedBytes();
                }
            }
        }
    }
}
