define(['knockout', 'text!./activity-add-participants.html', '../add-activity-model'], function(ko, templateMarkup, model) {

  function ActivityAddParticipants(params) {
    
    var self = this;

    self.model = model;
    self.model.currentStep(3); // set step (also used when hitting the back button)
  }
  
  return { viewModel: ActivityAddParticipants, template: templateMarkup };

});
