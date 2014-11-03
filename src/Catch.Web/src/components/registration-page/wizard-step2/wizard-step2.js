define(['knockout', 'text!./wizard-step2.html'], function(ko, templateMarkup) {

  function WizardStep2(params) {
    this.message = ko.observable('Hello from the wizard-step2 component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  WizardStep2.prototype.dispose = function() { };
  
  return { viewModel: WizardStep2, template: templateMarkup };

});
