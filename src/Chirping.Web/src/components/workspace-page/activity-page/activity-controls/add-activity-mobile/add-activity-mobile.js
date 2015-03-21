define(['knockout', 'text!./add-activity-mobile.html', 'viewport'], function(ko, templateMarkup, viewport) {

  function AddActivityMobile(params) {
    
    var self = this;

    console.log(viewport.is.smallerThan('sm'));
    self.shouldShow = ko.observable(viewport.is.smallerThan('sm'));

  }

  
  return { viewModel: AddActivityMobile, template: templateMarkup };

});
