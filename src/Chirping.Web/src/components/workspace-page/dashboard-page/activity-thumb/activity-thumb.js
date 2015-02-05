define(['knockout', 'text!./activity-thumb.html'], function(ko, templateMarkup) {

  function ActivityThumb(params) {
    
    var self = this;

    self.image = ko.observable(params.image);
    self.header = ko.observable(params.header);
    self.contentText = ko.observable(params.contentText);
  }
  
  
  return { viewModel: ActivityThumb, template: templateMarkup };

});
