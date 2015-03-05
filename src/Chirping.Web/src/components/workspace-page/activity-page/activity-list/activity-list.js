define(['knockout', 'text!./activity-list.html'], function (ko, templateMarkup) {

  function ActivityList(params) {
    
    var self = this;
    
    self.activities = params.activities;

    self.header = params.header;

    self.displayHeader = ko.computed(function () {
      return (params.header === undefined);
    });
  }

  return { viewModel: ActivityList, template: templateMarkup };

});
