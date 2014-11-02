#region using directives

using Catch.Web.Api.Common.Domain;

using System;
using System.Collections.Generic;

#endregion

namespace Catch.Web.Api.Domain
{
    public class User : DomainModel
    {
        #region private members

        private Name _name;
        private Email _email;
        private Age _age;
        private InterestedIn _interestedIn;

        private List<string> _pictures = new List<string>();

        #endregion

        public User(string name, string email, 
            string age, string interestedIn, List<string> pictures)
        {
            this._name = new Name(name);
            this._email = new Email(email);
            this._age = new Age(age);
            this._interestedIn = new InterestedIn(interestedIn);

            this._pictures = pictures;
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

        public List<string> GetPictures()
        {
            return _pictures;
        }

        #endregion
    }
}
