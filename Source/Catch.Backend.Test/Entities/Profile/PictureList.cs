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
    public class PictureListTest
    {
        [TestMethod]
        public void Can_Not_Create_More_Than_Three_Pictures()
        {
            // arrange
            var list = new List<Picture>
            {
                new Picture(@"C:\Pictures\Picture1.jpg"),
                new Picture(@"C:\Pictures\Picture2.jpg"),
                new Picture(@"C:\Pictures\Picture3.jpg"),
                new Picture(@"C:\Pictures\Picture4.jpg")
            };

            // arrange
            var picture = new PictureList();
            picture.AddRange(list);

            // assert
            Assert.AreEqual<int>(picture.Count(), 3);
        }
    }
}
