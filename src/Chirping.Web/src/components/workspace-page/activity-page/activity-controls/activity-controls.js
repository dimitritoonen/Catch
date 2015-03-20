define(['knockout', 'text!./activity-controls.html'], function (ko, templateMarkup) {

  function ActivityControls(params) {
    
    var self = this;

    self.categories = params.categories;
    self.activityModel = params.activityModel;

  }
    
  return { viewModel: ActivityControls, template: templateMarkup };

});
