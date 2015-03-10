define(['knockout', 'text!./activity-thumb.html'], function(ko, templateMarkup) {

  function ActivityThumb(params) {
    
    var self = this;

    self.image = ko.observable(params.image);
    self.title = ko.observable(params.title);
    self.description = ko.observable(params.description);
  }
  
  
  return { viewModel: ActivityThumb, template: templateMarkup };

});
