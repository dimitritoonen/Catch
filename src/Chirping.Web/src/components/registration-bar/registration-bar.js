define(['knockout', 'text!./registration-bar.html', './registration-model', 'services/auth-service'], function (ko, templateMarkup, registrationModel, auth) {
  
  function RegistrationBar(params) {
    
    var self = this;
    self.container = params.container;

    self.container.header('Register');

    // indicates if all wizards are validated and registration form is completely filled in

    var minSteps = 1;
    var maxSteps = 3;

    var goToNextStep = function () {
      self.currentStep(self.currentStep() + 1);
    };

    var goToPreviousStep = function () {
      self.currentStep(self.currentStep() - 1);
    };
    
    // display and hide the loading screen
    var toggleLoading = function () {
      $('#loginScreen').toggleClass('hide-visibility');
      $('#loginSpinner').toggleClass('show-visibility');
      $('#loginSpinner').toggleClass('hide');
    };

    // contains the registration view model
    self.registration = new registrationModel();

    // indicates the current step of the wizard
    self.currentStep = ko.observable(minSteps);

    // get the component name (to load) and the progress image loaded based on the chosen step
    self.currentStepImage = ko.computed(function () { return 'image-step' + self.currentStep(); });
    self.currentWizardStep = ko.computed(function () { return 'wizard-step' + self.currentStep(); });


    // advances to the next step in the wizard if facebook is chosen
    self.registration.UseFacebookAuthentication.subscribe(function (useFacebook) {

      if (self.currentStep() == minSteps && useFacebook) {
        goToNextStep();
      }
    });


    // advances to the next step
    self.NextStep = function () {

      if (!self.registration.isCurrentStepValid()) {
        self.registration['validateStep' + self.currentStep()]();
        return;
      }

      if (self.currentStep() == maxSteps)
        return;

      goToNextStep();
    };

    // goes back a step
    self.PreviousStep = function () {

      if (self.currentStep() == minSteps)
        return;

      goToPreviousStep();
    };


    // registers the user on the back-end
    self.RegisterUser = function () {

      // validate current step and display error if registration is not complete
      if (!self.registration.isRegistrationComplete()) {
        self.registration['validateStep' + self.currentStep()]();
      } else {

        toggleLoading();

        var data = self.registration.GetUserData();
      
        var viaFacebook = self.registration.UseFacebookAuthentication();

        auth.RegisterUser(data, viaFacebook).done(function (data) {
          alert('User is registered');
        });
      }
    };

    // show the login component
    self.showLoginComponent = function () {
      self.container.updateActiveComponent('login-bar');
    };
  }

  // dispose all subscriptions from the registration model
  RegistrationBar.prototype.dispose = function () {
    this.registration.dispose();
  };

  return { viewModel: RegistrationBar, template: templateMarkup };

});
