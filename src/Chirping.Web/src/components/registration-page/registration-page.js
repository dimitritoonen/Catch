define(['knockout', 'text!./registration-page.html', './registration-model', 'services/auth-service'], function (ko, templateMarkup, registrationModel, auth) {
  
  function RegistrationPage(params) {

    var self = this;

    // indicates if all wizards are validated and registration form is completely filled in

    var minSteps = 1;
    var maxSteps = 3;

    var goToNextStep = function () {
      self.currentStep(self.currentStep() + 1);
    };

    var goToPreviousStep = function () {
      self.currentStep(self.currentStep() - 1);
    };

    // contains the registration view model
    self.registration = registrationModel;

    // indicates the current step of the wizard
    self.currentStep = ko.observable(minSteps);

    // get the component name (to load) and the progress image loaded based on the chosen step
    self.currentStepImage = ko.computed(function () { return 'image-step' + self.currentStep() });
    self.currentWizardStep = ko.computed(function () { return 'wizard-step' + self.currentStep() });


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
      if (!self.registration.isRegistrationComplete())
        self.registration['validateStep' + self.currentStep()]();

      var data = self.registration.GetUserData();
      
      var viaFacebook = self.registration.UseFacebookAuthentication();

      auth.RegisterUser(data, viaFacebook).done(function (data) {
        alert('User is registered');
      });

    };
  }

  return { viewModel: RegistrationPage, template: templateMarkup };

});
