define(['knockout', 'text!./activity-add-participants.html', '../add-activity-wizard', 'models/add-activity-model'], function (ko, templateMarkup, wizard, model) {

  function ActivityAddParticipants(params) {
    
    wizard.arePreviousStepsValid(3);

    var self = this;

    self.model = model;

    self.wizard = wizard;
    wizard.currentStep(3); // set step (also used when hitting the back button)
  }

  ActivityAddParticipants.prototype.dispose = function () {
    model.dispose();
  }
  
  return { viewModel: ActivityAddParticipants, template: templateMarkup };

});
