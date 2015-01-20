using Chirping.Web.Api;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Domain.Tests
{
    [TestClass]
    public class UserTest
    {
        #region private members

        private string _name = "John Doe";
        private string _email = "johndoe@Chirping.com";
        private string _age = "25 - 35";
        private string _interestedIn = "Female";

        #endregion

        [TestMethod]
        public void Can_Initialize_User()
        {
            //// arrange
            //List<string> pictures = GetPictures();

            //// act
            //var user = new Domain.User(_name, _email, _age, _interestedIn, pictures);

            //// assert
            //Assert.AreEqual<string>(user.GetName(), _name);
            //Assert.AreEqual<string>(user.GetEmail(), _email);
            //Assert.AreEqual<string>(user.GetInterestedIn(), _interestedIn);
        }

        //private List<string> GetPictures()
        //{
        //    return new List<string>
        //    {
        //        "Picture 1",
        //        "Picture 2",
        //        "Picture 3"
        //    };
        //}


        //[TestMethod]
        //[ExpectedException(typeof(InvalidCastException))]
        //public void Cannot_Initialize_With_Invalid_Email()
        //{
        //    // arrange
        //    var invalidEmail = "This is not an email address";

        //    // act
        //    var user = new Domain.User(_name, invalidEmail, _age, _interestedIn, null);
        //}
    }
}
