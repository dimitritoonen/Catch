define(['knockout', 'text!./activity-add-location.html', '../add-activity-model'], function (ko, templateMarkup, model) {

  function ActivityAddLocation(params) {
    
    var self = this;

    self.model = model;
  }

  
  return { viewModel: ActivityAddLocation, template: templateMarkup };

});
