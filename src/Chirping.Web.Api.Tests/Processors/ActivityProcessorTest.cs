#region using directives

using Chirping.Web.Api.BindingModels.Activity;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Data.Repository;
using Chirping.Web.Api.Data.Repository.Abstract;
using Chirping.Web.Api.Domain;
using Chirping.Web.Api.Processors;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.Tests.Processors
{
    [TestClass]
    public class ActivityProcessorTest
    {
        [TestMethod]
        public void Can_Add_Activity()
        {
            // arrange
            AddActivityBindingModel model = GetBindingModel();
            Mock<IActivityRepository> activityRepo = GetActivityRepository();
            Mock<IUserRepository> userRepo = GetUserRepository();

            var mapper = new Mock<IAutoMapper>();
            mapper.Setup(mock => mock.Map<Activity>(model))
                .Returns(GetDomainModel());
            
            var processor = new ActivityProcessor(mapper.Object, activityRepo.Object, userRepo.Object);

            // act
            processor.Add(model);

            // assert
            activityRepo.Verify(mock => mock.Add(It.IsAny<Activity>()), Times.Once);
        }


        #region get binding model

        private AddActivityBindingModel GetBindingModel()
        {
            return new AddActivityBindingModel
            {
                Content = "Content",
                Date = "2015-03-06 22:00",
                Location = "Rotterdam",
                Category = GetBindingModelCategory(),
                ProfileId = 41,
                MaxParticipants = 10,
                ChainAccept = true,
            };
        }

        private CategoryBindingModel GetBindingModelCategory()
        {
            return new CategoryBindingModel { Code = "sport", Description = "Sport and Fitness", Id = 1 };
        }

        #endregion

        private Mock<IActivityRepository> GetActivityRepository()
        {
            var repo = new Mock<IActivityRepository>();

            repo.Setup(mock => mock.Add(GetDomainModel()));

            return repo;
        }

        private Mock<IUserRepository> GetUserRepository()
        {
            var repo = new Mock<IUserRepository>();

            Profile profile = GetProfile();

            repo.Setup(mock => mock.GetProfileById(It.IsAny<int>()))
                .Returns(profile);

            return repo;
        }

        private Profile GetProfile()
        {
            return new Profile(1)
            {
                Age = 31,
                City = "Rotterdam",
                Gender = "Male",
                NickName = "Dimitri",
                ProfileImage = new ProfileImage(Guid.NewGuid().ToString("N"))
            };
        }

        #region get domain model

        private Activity GetDomainModel()
        {
            return new Activity(1)
            {
                Category = GetDomainModelCategory(),
                ContentText = "Content",
                Date = DateTime.Parse("2015-03-06 22:00"),
                Location = "Rotterdam",
                MaxParticipants = 10,
                Owner = GetDomainModelOwner(),
                Participants = GetDomainModelParticipants(),
                ChainAccept = true
            };
        }

        private List<Profile> GetDomainModelParticipants()
        {
            return new List<Profile>
            {
                GetDomainModelOwner(),
                new Profile (2)
                {
                    Age = 20,
                    City = "Amsterdam",
                    Gender = "Female",
                    ProfileImage = new ProfileImage ("SomeImage.jpg"),
                    NickName = "Brazzers32"
                }
            };
        }

        private Profile GetDomainModelOwner()
        {
            return new Profile(1)
            {
                Age = 31,
                City = "Hendrik-Ido-Ambacht",
                Gender = "Male",
                ProfileImage = new ProfileImage ("SomeImage.jpg"),
                NickName = "TheHulk"
            };
        }

        private Category GetDomainModelCategory()
        {
            return new Category(1) { Code = "sport", Description = "Sport and Fitness" };
        }

        #endregion
    }
}
