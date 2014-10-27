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
    public class NameTest
    {
        [TestMethod]
        public void Can_Create_Name()
        {
            // arrange
            var expect = "John Doe";
            var name = new Name("John", "Doe");

            // act
            var nameCombined = name.ToString();

            // assert
            Assert.AreEqual<string>(expect, nameCombined);
        }
    }
}
