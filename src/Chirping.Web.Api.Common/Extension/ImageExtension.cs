#region using directives

using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Common.Extension
{
    public static class ImageExtensions
    {
        private readonly static long _quality = 95;

        public static byte[] ToCompressedBytes(this Image image)
        {
            EncoderParameters parameters = new EncoderParameters(1);
            parameters.Param[0] = new EncoderParameter(Encoder.Quality, _quality);
            var jpegCodec = ImageCodecInfo.GetImageDecoders()
                .First(c => c.FormatID == ImageFormat.Jpeg.Guid);

            using (var stream = new MemoryStream())
            {
                image.Save(stream, jpegCodec, parameters);
                return stream.ToArray();
            }
        }
    }
}
