define(['knockout', 'text!./registration-page.html', './registration-model', 'services/auth-service'], function (ko, templateMarkup, registrationModel, auth) {
  
  function RegistrationPage(params) {

    var self = this;

    // indicates if all wizards are validated and registration form is completely filled in

    var minSteps = 1;
    var maxSteps = 3;

    // contains the registration view model
    self.registration = registrationModel;

    // indicates the current step of the wizard
    self.currentStep = ko.observable(2); //minSteps);

    // get the component name (to load) and the progress image loaded based on the chosen step
    self.currentStepImage = ko.computed(function () { return 'image-step' + self.currentStep() });
    self.currentWizardStep = ko.computed(function () { return 'wizard-step' + self.currentStep() });
    
    // advances to the next step
    self.NextStep = function () {

      if (!self.registration.isCurrentStepValid()) {
        self.registration['validateStep' + self.currentStep()]();
        return;
      }

      if (self.currentStep() == maxSteps)
        return;

      self.currentStep(self.currentStep() + 1);
    };

    // goes back a step
    self.PreviousStep = function () {

      if (self.currentStep() == minSteps)
        return;

      self.currentStep(self.currentStep() - 1);
    };

    function showError(jqXHR) {
      console.log(jqXHR.status + ': ' + jqXHR.statusText);
    }

    // registers the user on the back-end
    self.RegisterUser = function () {

      if (self.registration.isRegistrationComplete()) {

        var data = self.registration.getCompletedUserData();
        
        auth.RegisterUser(data).done(function (data) {
          alert('User is registered');
        });
                
      } else {
        self.registration['validateStep' + self.currentStep()]();
      }
    };
  }

  return { viewModel: RegistrationPage, template: templateMarkup };

});
