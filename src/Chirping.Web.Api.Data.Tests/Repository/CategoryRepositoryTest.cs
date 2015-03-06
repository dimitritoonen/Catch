using Chirping.Web.Api.Common.Data.Entities;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Repository.Concrete;
using Chirping.Web.Api.Domain;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chirping.Web.Api.Data.Tests.Repository
{
    [TestClass]
    public class CategoryRepositoryTest
    {
        [TestMethod]
        public void Can_Map_Entity_To_Domain()
        {
            // arrange
            var repository = new CategoryRepository();
            CategoryEntity entity = GetEntity();
            Category expected = GetExpectedDomain();

            // act
            PrivateObject repo = new PrivateObject(repository);
            Category actual = (Category)repo.Invoke("ToDomainModel", entity);

            // assert
            Assert.AreEqual<int>(expected.Id, actual.Id);
            Assert.AreEqual<string>(expected.Code, actual.Code);
            Assert.AreEqual<string>(expected.Description, actual.Description);
        }
        
        [TestMethod]
        public void Can_Map_Domain_To_Entity()
        {
            // arrange
            var repository = new CategoryRepository();
            Category domain = GetExpectedDomain();
            CategoryEntity expected = GetEntity();

            // act
            PrivateObject repo = new PrivateObject(repository);
            CategoryEntity actual = (CategoryEntity)repo.Invoke("ToDataEntity", domain);

            // assert
            Assert.AreEqual<int>(expected.Id, actual.Id);
            Assert.AreEqual<string>(expected.Code, actual.Code);
            Assert.AreEqual<string>(expected.Description, actual.Description);
        }


        private Category GetExpectedDomain()
        {
            return new Category(3)
            {
                Code = "SomeCode",
                Description = "SomeDescription"
            };
        }

        private CategoryEntity GetEntity()
        {
            return new CategoryEntity
            {
                Id = 3,
                Code = "SomeCode",
                Description = "SomeDescription"
            };
        }
    }
}
