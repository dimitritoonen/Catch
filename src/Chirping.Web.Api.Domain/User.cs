#region using directives

using Chirping.Web.Api.Common.Domain;

using System;
using System.Collections.Generic;

#endregion

namespace Chirping.Web.Api.Domain
{
    public class User : DomainModel
    {
        #region private members

        private Name _name;
        private Email _email;
        private Age _age;
        private InterestedIn _interestedIn;
        private ProfileImage _profileImage;

        #endregion

        public User(string name, string email, 
            string age, string interestedIn, string profileImage)
        {
            this._name = new Name(name);
            this._email = new Email(email);
            this._age = new Age(age);
            this._interestedIn = new InterestedIn(interestedIn);
            this._profileImage = new ProfileImage(profileImage);
        }

        #region get operations

        public string GetName()
        {
            return _name.ToString();
        }

        public string GetEmail()
        {
            return _email.ToString();
        }

        public string GetAge()
        {
            return _age.ToString();
        }

        public string GetInterestedIn()
        {
            return _interestedIn.ToString();
        }

        public string GetProfileImage()
        {
            return _profileImage.ToString();
        }

        #endregion
    }
}
