using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Entities;
using Chirping.Web.Api.Data.Repository;
using Chirping.Web.Api.Data.Repository.Authorization;
using Chirping.Web.Api.Processors.Account;
using Microsoft.AspNet.Identity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Tests.Processors
{
    [TestClass]
    public class AccountProcessorTest
    {
        [TestMethod]
        public void Can_Register_User()
        {
            // arrange
            RegisterBindingModel user = GetUser();
            Task<RegisterUserResult> result = GetIdentityResult();

            var mock = new Mock<IAccountRepository>();
            mock.Setup(x => x.RegisterUser(It.IsAny<UserAccount>()))
                .Returns(result);

            var processor = new AccountProcessor(mock.Object);

            // act
            Task<IdentityResult> task = processor.RegisterUser(user);
            
            // assert
            //Assert.IsTrue(task.Result.Succeeded);
            //Assert.AreEqual<int>(task.Result.Errors.Count(), 0);
        }

        private RegisterBindingModel GetUser()
        {
            return new RegisterBindingModel
            {
                Email = "johndoe@gmail.com",
                ConfirmEmail = "johndoe@gmail.com",
                Password = "Password1!",
                Profile = new BindingModels.ProfileBindingModel
                {
                    Name = "JohnDoe56",
                    Age = "25 - 35",
                }
            };
        }

        private Task<RegisterUserResult> GetIdentityResult()
        {
            RegisterUserResult result = new RegisterUserResult();

            return Task.FromResult<RegisterUserResult>(result);
        }
    }
}
