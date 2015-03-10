using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Domain.Tests.User
{
    [TestClass]
    public class ProfileImageTest
    {
        [TestMethod]
        public void Can_Get_Known_FileNames()
        {
            // arrange
            var filename = Guid.NewGuid().ToString("N");
            var path = "http://storage-dev.chirping.nl/profileimages";

            ConfigurationManager.AppSettings["CloudStorage.Url"] = path;

            var expectedFileName = string.Format("{0}/{1}.jpg", path, filename);
            var expectedAvatar = string.Format("{0}/{1}_avatar.jpg", path, filename);

            // act
            var actual = new ProfileImage(filename);

            // assert
            Assert.AreEqual<string>(expectedFileName, actual.FileName);
            Assert.AreEqual<string>(expectedAvatar, actual.AvatarFileName);
        }

        [TestMethod]
        public void Can_Get_Default_FileNames()
        {
            // arrange
            var expectedFileName = "/images/no_profile-051cc221.png";
            var expectedAvatar = "/images/no_profile-051cc221_avatar.png";

            // act
            var actual = new ProfileImage();

            // assert
            Assert.AreEqual<string>(expectedFileName, actual.FileName);
            Assert.AreEqual<string>(expectedAvatar, actual.AvatarFileName);
        }
    }
}
