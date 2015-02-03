#region using directives

using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Data.Repository;
using Chirping.Web.Api.Domain;
using Chirping.Web.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Processors
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
            return true;
        }

        // checks if a particular nickname is already registered
        public bool NickNameInUse(string nickname)
        {
            return true;
        }
    }
}