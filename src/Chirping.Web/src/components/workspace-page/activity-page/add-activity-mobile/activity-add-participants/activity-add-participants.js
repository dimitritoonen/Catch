define(['knockout', 'text!./activity-add-participants.html', '../add-activity-model'], function(ko, templateMarkup, model) {

  function ActivityAddParticipants(params) {
    
    var self = this;

    self.model = model;
  }
  
  return { viewModel: ActivityAddParticipants, template: templateMarkup };

});
