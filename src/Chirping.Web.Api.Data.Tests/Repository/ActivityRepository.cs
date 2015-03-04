#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Common.Domain.Activity;
using Chirping.Web.Api.Data.Context;
using Chirping.Web.Api.Data.Repository.Concrete;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading;

#endregion

namespace Chirping.Web.Api.Data.Tests.Repository
{
    [TestClass]
    public class ActivityRepositoryTest
    {
        #region default values

        private int _activityId = 1;
        private int _categoryId = 1;
        private string _categoryCode = "entertainment";
        private string _categoryDescription = "Entertainment";
        private string _activityDate = "2015-05-05 12:12:12";
        private string _activityLocation = "Rotterdam";
        private string _contextText = "content text";
        private int _maxParticipant = 10;

        #endregion

        #region Can map entity to domain model

        [TestMethod]
        public void Can_Map_Entity_To_Domain()
        {
            // arrange
            var respository = new ActivityRepository();
            Activity expected = GetDomainModel();
            ActivityEntity entity = GetEntity();

            // act
            PrivateObject repo = new PrivateObject(respository);
            Activity actual = (Activity)repo.Invoke("ToDomainModel", entity);

            // assert primitives
            Assert.AreEqual<int>(actual.Id, entity.Id, "Activity Id");
            Assert.AreEqual<DateTime>(actual.Date, entity.Date, "Activity Date");
            Assert.AreEqual<string>(actual.Location, expected.Location, "Activity Location");
            Assert.AreEqual<string>(actual.ContentText, expected.ContentText, "Activity ContentText");
            Assert.AreEqual<int>(actual.MaxParticipants, expected.MaxParticipants, "Activity MaxParticipants");
        
            // assert category
            Assert.AreEqual<int>(actual.Category.Id, expected.Category.Id, "Category Id");
            Assert.AreEqual<string>(actual.Category.Code, expected.Category.Code, "Category Code");
            Assert.AreEqual<string>(actual.Category.Description, expected.Category.Description, "Category Description");

            // assert owner
            Assert.AreEqual<int>(actual.Owner.Id, expected.Owner.Id, "Owner Id");
            Assert.AreEqual<int>(actual.Owner.Age, expected.Owner.Age, "Owner Age");
            Assert.AreEqual<string>(actual.Owner.City, expected.Owner.City, "Owner City");
            Assert.AreEqual<string>(actual.Owner.Gender, expected.Owner.Gender, "Owner Gender");
            Assert.AreEqual<string>(actual.Owner.NickName, expected.Owner.NickName, "Owner NickName");
            Assert.AreEqual<string>(actual.Owner.ProfileImage, expected.Owner.ProfileImage, "Owner ProfileImage");

            Assert.AreEqual<int>(actual.Participants.Count, expected.Participants.Count, "Participant count doesn't match up");

            // assert participants
            bool matchFound = false;
            foreach (var actualProfile in actual.Participants)
            {
                matchFound = false;
                foreach (var expectedProfile in expected.Participants)
                {
                    if (expectedProfile.Id == actualProfile.Id)
                    {
                        matchFound = true;
                        Assert.AreEqual<int>(actualProfile.Id, expectedProfile.Id, "Participant Profile Id");
                        Assert.AreEqual<int>(actualProfile.Age, expectedProfile.Age, "Participant Profile Age");
                        Assert.AreEqual<string>(actualProfile.City, expectedProfile.City, "Participant Profile City");
                        Assert.AreEqual<string>(actualProfile.Gender, expectedProfile.Gender, "Participant Profile Gender");
                        Assert.AreEqual<string>(actualProfile.NickName, expectedProfile.NickName, "Participant Profile NickName");
                        Assert.AreEqual<string>(actualProfile.ProfileImage, expectedProfile.ProfileImage, "Participant Profile ProfileImage");

                        break; // match found, break
                    }
                }

                if (!matchFound)
                {
                    Assert.Fail("Unable to match actual id: '{0}'", actualProfile.Id);
                }
            }
        }

        private Activity GetDomainModel()
        {
            return new Activity(_activityId)
            {
                Category = new Category(_categoryId)
                {
                    Code = _categoryCode,
                    Description = _categoryDescription
                },
                Date = ParseDateExact(_activityDate),
                Location = _activityLocation,
                Owner = GetDomainOwner(),
                ContentText = _contextText,
                Participants = GetDomainParticipants(),
                MaxParticipants = _maxParticipant
            };
        }

        private DateTime ParseDateExact(string date)
        {
            return DateTime.ParseExact(date, "yyyy-MM-dd hh:mm:ss", Thread.CurrentThread.CurrentCulture);
        }

        private List<Profile> GetDomainParticipants()
        {
            return new List<Profile>
            {
                new Profile(id: 10) { NickName = "Dimitri", Age = 31, Gender = "Male", City = "Hendrik-Ido-Ambacht", ProfileImage = "someImage.jpg" },
                new Profile(id: 11) { NickName = "Remy", Age = 28, Gender = "Male", City = "Oud-beijerland", ProfileImage = "someImage.jpg" },
                new Profile(id: 12) { NickName = "Esme", Age = 32, Gender = "Female", City = "Hendrik-Ido-Ambacht", ProfileImage = "someImage.jpg" },
                new Profile(id: 13) { NickName = "Jack", Age = 30, Gender = "Male", City = "Noordwijk", ProfileImage = "someImage.jpg" },
                new Profile(id: 14) { NickName = "Guido", Age = 38, Gender = "Male", City = "Stolwijck", ProfileImage = "someImage.jpg" }
            };
        }

        private Profile GetDomainOwner()
        {
            return new Profile(id: 10) { NickName = "Dimitri", Age = 31, Gender = "Male", City = "Hendrik-Ido-Ambacht", ProfileImage = "someImage.jpg" };
        }


        private ActivityEntity GetEntity()
        {
            return new ActivityEntity
            {
                Id = _activityId,
                Category = new CategoryEntity { Id = _categoryId, Code = _categoryCode, Description = _categoryDescription },
                Date = ParseDateExact(_activityDate),
                Location = _activityLocation,
                Owner = GetEntityOwner(),
                ContentText = _contextText,
                Participants = GetEntityParticipants(),
                MaxParticipants = _maxParticipant
            };
        }

        private ICollection<ProfileEntity> GetEntityParticipants()
        {
            return new List<ProfileEntity>
            {
                new ProfileEntity { Id = 10, NickName = "Dimitri", Age = 31, Gender = "Male", City = "Hendrik-Ido-Ambacht", ProfileImage = "someImage.jpg" },
                new ProfileEntity { Id = 11, NickName = "Remy", Age = 28, Gender = "Male", City = "Oud-beijerland", ProfileImage = "someImage.jpg" },
                new ProfileEntity { Id = 12, NickName = "Esme", Age = 32, Gender = "Female", City = "Hendrik-Ido-Ambacht", ProfileImage = "someImage.jpg" },
                new ProfileEntity { Id = 13, NickName = "Jack", Age = 30, Gender = "Male", City = "Noordwijk", ProfileImage = "someImage.jpg" },
                new ProfileEntity { Id = 14, NickName = "Guido", Age = 38, Gender = "Male", City = "Stolwijck", ProfileImage = "someImage.jpg" },
            };
        }

        private ProfileEntity GetEntityOwner()
        {
            return new ProfileEntity { Id = 10, NickName = "Dimitri", Age = 31, Gender = "Male", City = "Hendrik-Ido-Ambacht", ProfileImage = "someImage.jpg" };
        }

        #endregion


        #region Can map domain model to entity

        [TestMethod]
        public void Can_Map_Domain_To_Entity()
        {
            // arrange
            var repository = new ActivityRepository();
            ActivityEntity expected = GetEntity();
            Activity domain = GetDomainModel();

            // act
            PrivateObject repo = new PrivateObject(repository);
            ActivityEntity actual = (ActivityEntity) repo.Invoke("ToDataEntity", domain);

            // assert primitives
            Assert.AreEqual<int>(actual.Id, expected.Id, "Activity Id");
            Assert.AreEqual<string>(actual.Location, expected.Location, "Activity Location");
            Assert.AreEqual<DateTime>(actual.Date, expected.Date, "Activity Date");
            Assert.AreEqual<string>(actual.ContentText, expected.ContentText, "Activity ContentText");
            Assert.AreEqual<int>(actual.MaxParticipants, expected.MaxParticipants, "Activity MaxParticipants");

            // assert category
            Assert.AreEqual<int>(actual.Category.Id, expected.Category.Id, "Category Id");
            Assert.AreEqual<string>(actual.Category.Code, expected.Category.Code, "Category Code");
            Assert.AreEqual<string>(actual.Category.Description, expected.Category.Description, "Category Description");

            // assert owner
            Assert.AreEqual<int>(actual.Owner.Id, expected.Owner.Id, "Owner Id");

            Assert.AreEqual<int>(actual.Participants.Count, expected.Participants.Count, "Participant count doesn't match up");

            // assert participants
            bool matchFound = false;
            foreach (var actualProfile in actual.Participants)
            {
                matchFound = false;

                foreach (var expectedProfile in expected.Participants)
                {
                    if (expectedProfile.Id == actualProfile.Id)
                    {
                        matchFound = true;
                        Assert.AreEqual<int>(actualProfile.Id, expectedProfile.Id, "Participant Profile Id");
                    }
                }

                if (!matchFound)
                {
                    Assert.Fail("Unable to match actual id: '{0}'", actualProfile.Id);
                }
            }
        }

        #endregion


        #region Can filter

        private ProfileEntity _defaultActivityOwner = new ProfileEntity
        {
            Id = 1,
            NickName = "Dimitri",
            Age = 31,
            City = "Hendrik-ido-Ambacht",
            Gender = "Male"
        };

        [TestMethod]
        public void Can_Filter_On_Text_Search()
        {
            // arrange
            int expectedId = 2;
            var contextMock = GetMockedChirpingContext();
            var repository = new ActivityRepository(contextMock);

            // set up filter
            var filter = new Filter();
            filter.Search = "Come and join";

            // act
            var actual = repository.GetAll(filter).ToList();

            // assert
            Assert.AreEqual<int>(1, actual.Count, "Filter returns more activities than 1");
            Assert.AreEqual<int>(expectedId, actual[0].Id);
        }

        [TestMethod]
        public void Can_Filter_On_NrOfParticipants()
        {
            // arrange
            var contextMock = GetMockedChirpingContext();
            var repository = new ActivityRepository(contextMock);
            
            // set up filter
            var filter = new Filter();
            filter.NrOfParticipants = 4;

            // act
            var actual = repository.GetAll(filter).ToList();

            // assert
            Assert.AreEqual<int>(2, actual.Count, "Filter returns more activites than 2");
            Assert.AreEqual<int>(1, actual[0].Id);
            Assert.AreEqual<int>(5, actual[1].Id);
        }

        [TestMethod]
        public void Can_Filter_On_BetweenTime()
        {
            // arrange
            var contextMock = GetMockedChirpingContext();
            var repository = new ActivityRepository(contextMock);

            // set up filter
            var filter = new Filter();
            filter.BetweenTime = new BetweenTime(7, 14);

            // act
            var actual = repository.GetAll(filter).ToList();

            // assert
            Assert.AreEqual<int>(3, actual.Count, "Filter returns more activites than 3");
            Assert.AreEqual<int>(10, actual[0].Date.Hour);
            Assert.AreEqual<int>(12, actual[1].Date.Hour);
            Assert.AreEqual<int>(7, actual[2].Date.Hour);
        }

        [TestMethod]
        public void Can_Filter_On_DateDuration()
        {
            // arrange
            var contextMock = GetMockedChirpingContext();
            var repository = new ActivityRepository(contextMock);

            // set up filter
            var filter = new Filter();
            filter.NrOfParticipants = 10; // default to 10 so that MaxParticipants doensn't play a filter role
            filter.DateDuration = new TimeFrame(DateTime.Now.AddDays(2).ToShortDateString());

            // act
            var actual = repository.GetAll(filter).ToList();

            // assert
            Assert.AreEqual<int>(2, actual.Count, "Filter returns more activites than 2");
            Assert.AreEqual<int>(1, actual[0].Id);
            Assert.AreEqual<int>(3, actual[1].Id);
        }



        private IQueryable<ActivityEntity> GetActivities()
        {
            return new List<ActivityEntity>
            {
                new ActivityEntity
                {
                    Id = 1,
                    Category = new CategoryEntity { Id = 9, Code = "sport", Description = "Sport" },
                    Date = DateTime.Today.AddDays(1) + new TimeSpan(10, 0, 0),
                    Location = "Rotterdam",
                    Owner = _defaultActivityOwner,
                    ContentText = "orem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 4
                },
                new ActivityEntity
                {
                    Id = 3,
                    Category = new CategoryEntity { Id = 2, Code = "dating", Description = "Dating" },
                    Date = DateTime.Today + new TimeSpan(19, 0, 0),
                    Location = "Hendrik-ido-ambacht",
                    Owner = _defaultActivityOwner,
                    ContentText = "orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 10
                },
                new ActivityEntity
                {
                    Id = 4,
                    Category = new CategoryEntity { Id = 3, Code = "food", Description = "Food and Drinks" },
                    Date = DateTime.Today.AddDays(33) + new TimeSpan(19, 0, 0),
                    Location = "Amsterdam",
                    Owner = _defaultActivityOwner,
                    ContentText = "orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 6
                },
                new ActivityEntity
                {
                    Id = 5,
                    Category = new CategoryEntity { Id = 4, Code = "entertainment", Description = "Entertainment" },
                    Date = DateTime.Today.AddMonths(5) + new TimeSpan(12, 0, 0),
                    Location = "Sliedrecht",
                    Owner = _defaultActivityOwner,
                    ContentText = "orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. pellentesque eu, pretium",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 4
                },
                new ActivityEntity
                {
                    Id = 6,
                    Category = new CategoryEntity { Id = 5, Code = "party", Description = "Party/Disco" },
                    Date = DateTime.Today.AddMonths(4) + new TimeSpan(19, 0, 0),
                    Location = "Rotterdam",
                    Owner = _defaultActivityOwner,
                    ContentText = "orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 5
                },
                new ActivityEntity
                {
                    Id = 7,
                    Category = new CategoryEntity { Id = 6, Code = "hiking", Description = "Hiking" },
                    Date = DateTime.Today.AddDays(119) + new TimeSpan(7, 0, 0),
                    Location = "Rotterdam",
                    Owner = _defaultActivityOwner,
                    ContentText = "orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 5
                },
                new ActivityEntity
                {
                    Id = 8,
                    Category = new CategoryEntity { Id = 7, Code = "travelling", Description = "Travelling" },
                    Date = DateTime.Today.AddDays(65) + new TimeSpan(19, 0, 0),
                    Location = "Rotterdam",
                    Owner = _defaultActivityOwner,
                    ContentText = "orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 10
                },
                new ActivityEntity
                {
                    Id = 9,
                    Category = new CategoryEntity { Id = 8, Code = "shopping", Description = "Shopping" },
                    Date = DateTime.Today.AddDays(45) + new TimeSpan(19, 0, 0),
                    Location = "Hendrik-ido-ambacht",
                    Owner = _defaultActivityOwner,
                    ContentText = "ultricies nec, pellentesque eu, pretium",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 7
                },
                new ActivityEntity
                {
                    Id = 2,
                    Category = new CategoryEntity { Id = 1, Code = "museum", Description = "Museum" },
                    Date = DateTime.Today.AddMonths(3) + new TimeSpan(19, 0, 0),
                    Location = "Sliedrecht",
                    Owner = _defaultActivityOwner,
                    ContentText = "Come and join us!",
                    Participants = GetProfileEntityParticipants(),
                    MaxParticipants = 5
                }
            }.AsQueryable();
        }
        
        private ICollection<ProfileEntity> GetProfileEntityParticipants()
        {
            return new List<ProfileEntity>
            {
                _defaultActivityOwner,
                new ProfileEntity { Id = 2, NickName = "Esme", Age = 30, City = "Hendrik-ido-Ambacht", Gender = "Female" },
                new ProfileEntity { Id = 3, NickName = "Remy", Age = 27, City = "Oud-beijerland", Gender = "Male" },
                new ProfileEntity { Id = 4, NickName = "Jack", Age = 31, City = "Noordwijk", Gender = "Male" },
                new ProfileEntity { Id = 5, NickName = "Sebastiaan", Age = 30, City = "Rotterdam", Gender = "Male" },
                new ProfileEntity { Id = 6, NickName = "David", Age = 35, City = "Rotterdam", Gender = "Male" }
            };
        }

        private Mock<IDbSet<ActivityEntity>> GetActivityDbSetMock(IQueryable<ActivityEntity> data)
        {
            var dbSetMock = new Mock<IDbSet<ActivityEntity>>();
            dbSetMock.Setup(m => m.Provider).Returns(data.Provider);
            dbSetMock.Setup(m => m.Expression).Returns(data.Expression);
            dbSetMock.Setup(m => m.ElementType).Returns(data.ElementType);
            dbSetMock.Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            return dbSetMock;
        }

        private ChirpingContext GetMockedChirpingContext()
        {
            // get all activities
            IQueryable<ActivityEntity> data = GetActivities();

            // get the mocked activities DbSet
            Mock<IDbSet<ActivityEntity>> dbSetMock = GetActivityDbSetMock(data);

            // setup chirping context mock
            var contextMock = new Mock<ChirpingContext>();
            contextMock.Setup(x => x.Activities)
                .Returns(dbSetMock.Object);

            return contextMock.Object;
        }

        #endregion
    }
}
