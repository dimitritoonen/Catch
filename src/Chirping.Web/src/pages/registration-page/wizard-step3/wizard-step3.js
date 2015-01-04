define(['knockout', 'text!./wizard-step3.html'], function(ko, templateMarkup) {

  function WizardStep3(params) {
    
    var self = this;

    self.mottoList = ko.observableArray([
      'When you only look right, you unable to see left',
      'The intelligent man finds almost everything ridiculous, the ...',
      'I have an enormous... ',
      'I swear to drunk, I am not god'
    ]);

    self.registration = params.registration;

    // updates the textbox with the value selected from the Motto options
    params.registration.selectedMottoOption.subscribe(function () {
      params.registration.motto(params.registration.selectedMottoOption());
    });

    // checks if wizard step2 is valid upon loading (which indicates that the previous step button 
    // is used), and if so ensures that all controls are shown as valid (i.e. green ok)
    if (self.registration.motto.isValid()) {
      params.registration.isCurrentStepValid(true);
      params.registration.validateStep3();
    } else {
      params.registration.isCurrentStepValid(false);
    };

    // indicate to the registration-model that all controls are valid
    self.registration.motto.subscribe(function (valid) {
      params.registration.isCurrentStepValid(valid);
      params.registration.isStep3Valid(valid);
    });
  }
  
  return { viewModel: WizardStep3, template: templateMarkup };

});
