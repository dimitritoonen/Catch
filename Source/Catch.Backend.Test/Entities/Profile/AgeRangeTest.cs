using System;
using System.Text;
using System.Collections.Generic;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using Catch.Backend.Domain.Entities.Profile;

namespace Catch.Backend.UnitTests.Entities.Profile
{
    /// <summary>
    /// Summary description for AgeRangeTest
    /// </summary>
    [TestClass]
    public class AgeRangeTest
    {
        [TestMethod]
        public void Can_Get_Age_Range()
        {
            // arrange
            var ageRange = new AgeRange(25, 35);

            // act
            var range = ageRange.ToString();

            // assert
            Assert.AreEqual<string>(range, "25-35");
        }
    }
}
