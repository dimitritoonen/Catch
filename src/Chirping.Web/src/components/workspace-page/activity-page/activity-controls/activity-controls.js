define(['knockout', 'text!./activity-controls.html'], function (ko, templateMarkup) {

  function ActivityControls(params) {
    
    var self = this;

    self.categories = params.categories;

  }
    
  return { viewModel: ActivityControls, template: templateMarkup };

});
