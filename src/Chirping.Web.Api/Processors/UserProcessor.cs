#region using directives

using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Data.Repository;
using Chirping.Web.Api.Domain;
using Chirping.Web.Api.Models;
using Chirping.Web.Api.Processors.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

#endregion

namespace Chirping.Web.Api.Processors
{
    public class UserProcessor : IUserProcessor
    {
        private IUserRepository _repository;

        public UserProcessor(IUserRepository repository)
        {
            this._repository = repository;
        }


        /// checks if a particular e-mail is already registered
        public bool EmailAddressInUse(string emailAddress)
        {
            return _repository.EmailAddressInUse(emailAddress);
        }

        // checks if a particular nickname is already registered
        public bool NickNameInUse(string nickname)
        {
            return _repository.NicknameInUse(nickname);
        }
    }
}