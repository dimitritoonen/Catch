define(['knockout', 'text!./wizard-step3.html'], function(ko, templateMarkup) {

  function WizardStep3(params) {
    this.message = ko.observable('Hello from the wizard-step3 component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  WizardStep3.prototype.dispose = function() { };
  
  return { viewModel: WizardStep3, template: templateMarkup };

});
