using AutoMapper;
using Chirping.Web.Api.AutoMapperConfigurators;
using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Storage;
using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Data.Repository.Authorization;
using Chirping.Web.Api.Processors.Account;
using Microsoft.AspNet.Identity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Configuration;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Tests.Processors
{
    [TestClass]
    public class AccountProcessorTest
    {
        [TestInitialize]
        public void Initialize()
        {
            // automapper
            _automapperMock = new Mock<IAutoMapper>();

            // store
            _profileImageStoreMock = new Mock<IProfileImageStore>();
            _profileImageStoreMock.Setup(x => x.StoreImage(It.IsAny<string>(), It.IsAny<string>()));

            _accountRepositoryMock = new Mock<IAccountRepository>();


            ConfigurationManager.AppSettings["FrontEndUrl"] = "http://localhost:8080";
        }

        private Mock<IAutoMapper> _automapperMock;
        private Mock<IProfileImageStore> _profileImageStoreMock;
        private Mock<IAccountRepository> _accountRepositoryMock;


        [TestMethod]
        public void Can_Register_User_With_Success()
        {
            // arrange
            RegisterBindingModel user = GetUser();
            UserAccount userAccount = GetUserAccount();
            Task<RegisterUserResult> result = GetIdentityResult(true);
            var confirmationToken = Task.FromResult<string>(Guid.NewGuid().ToString());

            _accountRepositoryMock.Setup(x => x.RegisterUser(It.IsAny<UserAccount>()))
                .Returns(result);

            _accountRepositoryMock.Setup(x => x.GenerateEmailConfirmationTokenAsync(It.IsAny<string>()))
                .Returns(confirmationToken);

            _automapperMock.Setup(m => m.Map<UserAccount>(user)).
                Returns(userAccount);

            var processor = new AccountProcessor(
                _accountRepositoryMock.Object, 
                _profileImageStoreMock.Object,
                _automapperMock.Object);

            // act
            Task<IdentityResult> task = processor.RegisterUser(user);

            // assert
            // verify if the appropriate methods are called (RegisterUser, SendEmail, and StoreImage)
            _accountRepositoryMock.Verify(mock => mock.RegisterUser(It.IsAny<UserAccount>()), Times.Once());
            _accountRepositoryMock.Verify(mock => mock.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Once());
            _profileImageStoreMock.Verify(mock => mock.StoreImage(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        }


        [TestMethod]
        public void Register_User_Without_Success()
        {
            // arrange
            RegisterBindingModel user = GetUser();
            UserAccount userAccount = GetUserAccount();
            Task<RegisterUserResult> result = GetIdentityResult(false);

            _accountRepositoryMock.Setup(x => x.RegisterUser(It.IsAny<UserAccount>()))
                .Returns(result);
            
            _automapperMock.Setup(m => m.Map<UserAccount>(user)).
                Returns(userAccount);

            var processor = new AccountProcessor(
                _accountRepositoryMock.Object,
                _profileImageStoreMock.Object,
                _automapperMock.Object);

            // act
            Task<IdentityResult> task = processor.RegisterUser(user);

            // assert
            // verify if the appropriate methods are called (RegisterUser, SendEmail, and StoreImage)
            _accountRepositoryMock.Verify(mock => mock.RegisterUser(It.IsAny<UserAccount>()), Times.Once());
            _accountRepositoryMock.Verify(mock => mock.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never());
            _profileImageStoreMock.Verify(mock => mock.StoreImage(It.IsAny<string>(), It.IsAny<string>()), Times.Never());
        }

        private UserAccount GetUserAccount()
        {
            return new UserAccount
            {
                Email = "johndoe@gmail.com",
                Password = "Password1!",
                NickName = "JohnDoe56",
                Age = 25,
                City = "Rotterdam",
                Gender = "Male"
            };
        }

        private RegisterBindingModel GetUser()
        {
            return new RegisterBindingModel
            {
                Email = "johndoe@gmail.com",
                ConfirmEmail = "johndoe@gmail.com",
                Password = "Password1!",
                Profile = new RegisterProfileBindingModel
                {
                    NickName = "JohnDoe56",
                    Age = 25,
                    City = "Rotterdam",
                    Gender = "Male",
                    Image = "someImage"
                }
            };
        }
        
        private Task<RegisterUserResult> GetIdentityResult(bool success)
        {
            return Task.FromResult<RegisterUserResult>(new RegisterUserResultFake(success));
        }
        
        // fake classes
        class RegisterUserResultFake : RegisterUserResult
        {
            public RegisterUserResultFake(bool success)
            {
                this.IdentityResult = new IdentityResultFake(success);
                this.UserId = Guid.NewGuid().ToString("N");
            }
        }

        class IdentityResultFake : IdentityResult
        {
            public IdentityResultFake(bool success)
                : base(success)
            {}
        }
    }
}
