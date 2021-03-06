﻿define(['knockout'], function (ko) {

  // contains the properties and validation of registering a user via facebook
  function FacebookModel() {

    var self = this;

    // contains the facebook data needed for registration
    self.RegisterData = null;

    // indicates if facebook authentication is used
    self.UseFacebookAuthentication = ko.observable(false);
    self.Email = null;
    self.ExternalAccessToken = null;
    
    // register new user
    self.storeFacebookDetails = function (externalData) {
      setRegisterData(externalData);
    };

    // stored facebook register data
    var setRegisterData = function (externalData) {

      self.Email = externalData.external_email;
      self.ExternalAccessToken = externalData.external_access_token;

      self.UseFacebookAuthentication(true);
    };

  }

  return FacebookModel;

});    