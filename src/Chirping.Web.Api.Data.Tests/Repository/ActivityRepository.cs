#region using directives

using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Repository.Concrete;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using System;
using System.Collections.Generic;
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
            //Assert.AreEqual<int>(actual.Owner.Age, expected.Owner.Age, "Owner Age");
            //Assert.AreEqual<string>(actual.Owner.City, expected.Owner.City, "Owner City");
            //Assert.AreEqual<string>(actual.Owner.Gender, expected.Owner.Gender, "Owner Gender");
            //Assert.AreEqual<string>(actual.Owner.NickName, expected.Owner.NickName, "Owner NickName");
            //Assert.AreEqual<string>(actual.Owner.ProfileImage, expected.Owner.ProfileImage, "Owner ProfileImage");

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
                        //Assert.AreEqual<int>(actualProfile.Age, expectedProfile.Age, "Participant Profile Age");
                        //Assert.AreEqual<string>(actualProfile.City, expectedProfile.City, "Participant Profile City");
                        //Assert.AreEqual<string>(actualProfile.Gender, expectedProfile.Gender, "Participant Profile Gender");
                        //Assert.AreEqual<string>(actualProfile.NickName, expectedProfile.NickName, "Participant Profile NickName");
                        //Assert.AreEqual<string>(actualProfile.ProfileImage, expectedProfile.ProfileImage, "Participant Profile ProfileImage");
                    }
                }

                if (!matchFound)
                {
                    Assert.Fail("Unable to match actual id: '{0}'", actualProfile.Id);
                }
            }
        }

        #endregion
    }
}
