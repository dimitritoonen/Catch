#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Entities;
using Chirping.Web.Api.Data.Repository;
using Chirping.Web.Api.Domain;
using Microsoft.VisualStudio.TestTools.UnitTesting;

#endregion

namespace Chirping.Web.Api.Data.Tests.Repository
{
    [TestClass]
    public class UserRepositoryTest : UserRepository
    {
        #region private members

        // user members
        private string _name = "John Doe";
        private string _email = "johndoe@Chirping.com";
        private string _age = "25 - 35";
        private string _interestedIn = "Female";

        // profile members
        private string _profileImage = "2e34128971d5456ebeda2d40a792454e";
        private string _profileImageAvatar = "2e34128971d5456ebeda2d40a792454e_avatar.jpg";

        #endregion

        [TestMethod]
        public void Can_Map_Entity_To_Domain()
        {
            // arrange
            var repository = new UserRepository();
            User expected = GetDomainModel();
            UserEntity entity = GetUserEntity();

            // act
            PrivateObject repo = new PrivateObject(repository);
            User actual = (User)repo.Invoke("ToDomainModel", entity);

            // assert
            Assert.AreEqual<string>(actual.GetName(), expected.GetName());
            Assert.AreEqual<string>(actual.GetAge(), expected.GetAge());
            Assert.AreEqual<string>(actual.GetEmail(), expected.GetEmail());
            Assert.AreEqual<string>(actual.GetInterestedIn(), expected.GetInterestedIn());            
        }

        [TestMethod]
        public void Can_Map_Profile_Entity_To_Domain()
        {
            // arrange
            var repository = new UserRepository();
            Profile expected = GetProfileDomainModel();
            ProfileEntity entity = GetProfileEntity();

            // act
            PrivateObject repo = new PrivateObject(repository);
            Profile actual = (Profile)repo.Invoke("ToProfileDomainModel", entity);

            // assert
            Assert.AreEqual<int>(expected.Id, actual.Id);
            Assert.AreEqual<int>(expected.Age, actual.Age);
            Assert.AreEqual<string>(expected.City, actual.City);
            Assert.AreEqual<string>(expected.Gender, actual.Gender);
            Assert.AreEqual<string>(expected.NickName, actual.NickName);
            Assert.AreEqual<string>(expected.ProfileImage.FileName, actual.ProfileImage.FileName);
            Assert.AreEqual<string>(expected.ProfileImage.AvatarFileName, actual.ProfileImage.AvatarFileName);
        }
        
        [TestMethod]
        public void Can_Map_Domain_To_Entity()
        {
            // arrange
            var repository = new UserRepository();
            User user = GetDomainModel();
            UserEntity expected = GetUserEntity();

            // act
            PrivateObject repo = new PrivateObject(repository);
            UserEntity actual = (UserEntity)repo.Invoke("ToDataEntity", user);

            // assert
            Assert.AreEqual<string>(actual.Name, expected.Name);
            Assert.AreEqual<string>(actual.Age, expected.Age);
            Assert.AreEqual<string>(actual.InterestedIn, expected.InterestedIn);
            Assert.AreEqual<string>(actual.Email, expected.Email);
        }

        [TestMethod]
        public void Can_Map_Profile_Domain_To_Entity()
        {
            // arrange
            var repository = new UserRepository();
            Profile profile = GetProfileDomainModel();
            ProfileEntity expected = GetProfileEntity();

            // act
            PrivateObject repo = new PrivateObject(repository);
            ProfileEntity actual = (ProfileEntity)repo.Invoke("ToProfileDataEntity", profile);

            // assert
            Assert.AreEqual<int>(expected.Age, actual.Age);
            Assert.AreEqual<string>(expected.City, actual.City);
            Assert.AreEqual<string>(expected.Gender, actual.Gender);
            Assert.AreEqual<int>(expected.Id, actual.Id);
            Assert.AreEqual<string>(expected.NickName, actual.NickName);

            var profileImage = string.Format("/profileimages/{0}.jpg", expected.ProfileImage);
            Assert.AreEqual<string>(profileImage, actual.ProfileImage);
        }


        #region Getting operators

        private User GetDomainModel()
        {
            return new User(_name, _email, _age, _interestedIn, null);
        }

        private UserEntity GetUserEntity()
        {
            return new UserEntity
            {
                Name = _name,
                Age = _age,
                Email = _email,
                InterestedIn = _interestedIn
            };
        }


        private Profile GetProfileDomainModel()
        {
            return new Profile(99)
            {
                Age = 31,
                City = "Hendrik-Ido-Ambacht",
                Gender = "Male",
                NickName = "Dimitri",
                ProfileImage = new ProfileImage(_profileImage)
            };
        }

        private ProfileEntity GetProfileEntity()
        {
            return new ProfileEntity()
            {
                Id = 99,
                Age = 31,
                City = "Hendrik-Ido-Ambacht",
                Gender = "Male",
                NickName = "Dimitri",
                ProfileImage = _profileImage
            };
        }

        #endregion
    }
}
