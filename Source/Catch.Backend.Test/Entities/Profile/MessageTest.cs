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
    public class MessageTest
    {
        [TestMethod]
        public void Can_Create_Message()
        {
            // arrange
            var expect = "This is a random message";
            var message = new Message(expect);

            // act
            var msg = message.ToString();

            // assert
            Assert.AreEqual<string>(msg, expect);
        }
    }
}
