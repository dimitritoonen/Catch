#region using directives

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

        private string _name = "John Doe";
        private string _email = "johndoe@Chirping.com";
        private string _age = "25 - 35";
        private string _interestedIn = "Female";

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

        #endregion
    }
}
