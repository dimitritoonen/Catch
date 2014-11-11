define(['knockout', 'text!./wizard-step3.html'], function(ko, templateMarkup) {

  function WizardStep3(params) {
    
    var self = this;

    self.mottoList = ko.observableArray([
      'When you only look right, you unable to see left',
      'The intelligent man finds almost everything ridiculous, the ...',
      'I have an enormous... ',
      'I swear to drunk, I am not god'
    ]);
  }
  
  return { viewModel: WizardStep3, template: templateMarkup };

});
