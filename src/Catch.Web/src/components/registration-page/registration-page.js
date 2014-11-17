define(['knockout', 'text!./registration-page.html', './registration-model'], function(ko, templateMarkup, registrationModel) {
  
  function RegistrationPage(params) {

    var self = this;

    var minSteps = 1;
    var maxSteps = 3;

    // contains the registration view model
    self.registration = registrationModel;

    self.currentStep = ko.observable(minSteps);

    self.currentStepImage = ko.computed(function () {
      return 'image-step' + self.currentStep()
    });

    self.currentWizardStep = ko.computed(function () {
      return 'wizard-step' + self.currentStep()
    });
    
    // advances to the next step
    self.NextStep = function () {

      if (!self.registration.isCurrentStepValid())
        return;

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
  }

  return { viewModel: RegistrationPage, template: templateMarkup };

});
