define(['knockout', 'text!./activity-add-location.html', '../add-activity-model'], function (ko, templateMarkup, model) {

  function ActivityAddLocation(params) {
    
    var self = this;

    self.model = model;
    self.model.currentStep(4); // set step (also used when hitting the back button)
  }

  
  return { viewModel: ActivityAddLocation, template: templateMarkup };

});
