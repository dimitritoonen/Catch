/// <reference path="../../../authcomplete.html" />
define(['jquery', 'knockout', 'text!./wizard-step1.html', 'app/app.config', 'services/login-service'], function ($, ko, templateMarkup, config, login) {

  function WizardStep1(params) {
        
    var self = this;
        
    self.result = ko.observable();

    self.registration = params.registration;
    self.container = params.container;

    // auto-focus on e-mail
    $('#wizardEmailTextbox').focus();

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
    }

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


    // logon to facebook
    self.logonToFacebook = function () {
      login.authExternalProvider('Facebook', self.facebookLogonCallback);
    };


    // executed after successfully logged on to facebook
    self.facebookLogonCallback = function (user) {

      if (user.haslocalaccount == 'False') {
        self.registration.storeFacebookDetails(user);

        // validate current step
        params.registration.isCurrentStepValid(true);
        params.registration.isStep1Valid(true);

      } else if (user.isregisteredasexternal == 'False') {
        self.showLoginComponent();
      }

    };


    // show the login component
    self.showLoginComponent = function () {

      // pass in an error

      self.container.updateActiveComponent('login-bar');
    };
  }
  
  return { viewModel: WizardStep1, template: templateMarkup };

});
