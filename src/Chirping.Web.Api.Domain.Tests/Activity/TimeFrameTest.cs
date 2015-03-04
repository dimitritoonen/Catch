#region using directives

using Chirping.Web.Api.Common.Domain.Activity;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Domain.Tests.Activity
{
    [TestClass]
    public class TimeFrameTest
    {
        [TestMethod]
        public void TillDate_Cannot_Be_Smaller_Than_FromDate()
        {
            // arrange
            var expectedTillDate = DateTime.Today.AddDays(7);
            var expectedFromDate = DateTime.Today;

            // act
            var actual = new TimeFrame(DateTime.Today.ToShortDateString(), DateTime.Today.AddDays(-7).ToShortDateString());

            // assert
            Assert.AreEqual<DateTime>(expectedTillDate, actual.TillDate);
            Assert.AreEqual<DateTime>(expectedFromDate, actual.FromDate);
        }

        [TestMethod]
        public void FromDate_Cannot_Be_Smaller_Than_Today()
        {
            // arrange
            var expectedFromDate = DateTime.Today;
            var expectedTillDate = DateTime.Today.AddDays(7);

            // act
            var actual = new TimeFrame(DateTime.Today.AddDays(-7).ToShortDateString(), DateTime.Today.AddDays(7).ToShortDateString());

            // assert
            Assert.AreEqual<DateTime>(expectedFromDate, actual.FromDate);
            Assert.AreEqual<DateTime>(expectedTillDate, actual.TillDate);
        }

        [TestMethod]
        public void Can_Setup_Default_Values()
        {
            // arrange
            var expectedFromDate = DateTime.Today;
            var expectedTillDate = DateTime.Today.AddDays(7);

            // act
            var actual = new TimeFrame();

            // assert
            Assert.AreEqual<DateTime>(expectedFromDate, actual.FromDate);
            Assert.AreEqual<DateTime>(expectedTillDate, actual.TillDate);
        }

        [TestMethod]
        public void Can_Setup_TillDate_Only()
        {
            // arrange
            var expectedFromDate = DateTime.Today;
            var expectedTillDate = DateTime.Today.AddMonths(2);

            // act
            var actual = new TimeFrame(DateTime.Today.AddMonths(2).ToShortDateString());

            // assert
            Assert.AreEqual<DateTime>(expectedFromDate, actual.FromDate);
            Assert.AreEqual<DateTime>(expectedTillDate, actual.TillDate);
        }
    }
}
