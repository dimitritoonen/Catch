using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Domain.Tests.Activity
{
    [TestClass]
    public class BetweenTimeTest
    {
        [TestMethod]
        public void EndTime_Cannot_Be_Lower_Than_BeginTime()
        {
            // arrange
            uint expectedBeginTime = 8;
            uint expectedEndTime = 20;

            // act
            var actual = new BetweenTime(10, 8);

            // assert
            Assert.AreEqual<uint>(expectedBeginTime, actual.BeginTime);
            Assert.AreEqual<uint>(expectedEndTime, actual.EndTime);
        }

        [TestMethod]
        public void Can_Setup_Default()
        {
            // arrange
            uint expectedBeginTime = 8;
            uint expectedEndTime = 20;

            // act
            var actual = new BetweenTime();

            // assert
            Assert.AreEqual<uint>(expectedBeginTime, actual.BeginTime);
            Assert.AreEqual<uint>(expectedEndTime, actual.EndTime);
        }

        [TestMethod]
        public void BeginTime_Cannot_Be_Higher_Than_24()
        {
            // arrange
            uint expectedBeginTime = 8;
            uint expectedEndTime = 20;

            // act
            var actual = new BetweenTime(30, 8);

            // assert
            Assert.AreEqual<uint>(expectedBeginTime, actual.BeginTime);
            Assert.AreEqual<uint>(expectedEndTime, actual.EndTime);
        }

        [TestMethod]
        public void EndTime_Cannot_Be_Higher_Than_24()
        {
            // arrange
            uint expectedBeginTime = 8;
            uint expectedEndTime = 20;

            // act
            var actual = new BetweenTime(8, 30);

            // assert
            Assert.AreEqual<uint>(expectedBeginTime, actual.BeginTime);
            Assert.AreEqual<uint>(expectedEndTime, actual.EndTime);
        }
    }
}
