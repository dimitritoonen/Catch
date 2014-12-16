/// <reference path="../../../authcomplete.html" />
define(['jquery', 'knockout', 'text!./wizard-step1.html', 'app/app.config', 'services/auth-service'], function ($, ko, templateMarkup, config, auth) {

  function WizardStep1(params) {
        
    var self = this;
        
    self.result = ko.observable();

    self.registration = params.registration;
    
    // validation group to determine if all control on step 1 are valid
    var validationGroup = ko.validatedObservable({
      emailAddress: self.registration.emailAddress,
      confirmEmail: self.registration.confirmEmail,
      password: self.registration.password
    });

    // checks if wizard step1 is valid upon loading (which indicates that the previous step button 
    // is used), and if so ensures that all controls are shown as valid (i.e. green ok)
    if (validationGroup.isValid()) {
      params.registration.isCurrentStepValid(validationGroup.isValid()) ;
      params.registration.validateStep1();
    };

    // indicate to the regiration-model that all controls are valid
    validationGroup.isValid.subscribe(function (valid) {
      params.registration.isCurrentStepValid(valid);
      params.registration.isStep1Valid(valid);
    });

    // checks if wizard step1 is valid upon loading (which indicates that the previous step button 
    // is used), and if so ensures that all controls are shown as valid (i.e. green ok)
    if (params.registration.isStep1Valid()) {
      params.registration.validateStep1();
    }


    // 
    this.registerViaFacebook = function () {
      auth.authFacebookUser(self.registration);
    };



    this.callApi = function () {

      // If we already have a bearer token, set the Authorization header.
      var token = sessionStorage.getItem(tokenKey);
      var headers = {};
      if (token) {
        headers.Authorization = 'Bearer ' + token;
      }

      $.ajax({
        type: 'GET',
        url: 'http://localhost:4421/api/values/1',
        headers: headers
      }).done(function (data) {
        self.result(data);
      }).fail(showError);

    };
  }
  
  return { viewModel: WizardStep1, template: templateMarkup };

});