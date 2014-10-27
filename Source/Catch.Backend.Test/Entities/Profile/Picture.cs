using Catch.Backend.Domain.Entities.Profile;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catch.Backend.UnitTests.Entities.Profile
{
    [TestClass]
    public class PictureTest
    {
        [TestMethod]
        public void Can_Create_Picture()
        {
            // arrange
            var expect = @"C:\Development\Pictures\ProfilePicture_01.jpg";
            var picture = new Picture(expect);

            // act
            var pictureLocation = picture.ToString();

            // assert
            Assert.AreEqual<string>(expect, pictureLocation);
        }
    }
}
