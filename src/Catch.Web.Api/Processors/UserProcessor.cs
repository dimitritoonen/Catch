#region using directives

using Catch.Web.Api.Common.TypeMapping;
using Catch.Web.Api.Data.Repository;
using Catch.Web.Api.Domain;
using Catch.Web.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Catch.Web.Api.Processors
{
    public class UserProcessor : IUserProcessor
    {
        private IUserRepository _repository;
        private IAutoMapper _mapper;

        public UserProcessor(IUserRepository repository, IAutoMapper autoMapper)
        {
            this._repository = repository;
            this._mapper = autoMapper;
        }


        /// checks if a particular e-mail is already registered
        public bool EmailAddressInUse(string emailAddress)
        {
            return _repository.EmailAddressInUse(emailAddress);
        }
    }
}