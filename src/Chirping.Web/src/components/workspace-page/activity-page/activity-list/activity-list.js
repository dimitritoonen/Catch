define(['knockout', 'text!./activity-list.html'], function (ko, templateMarkup) {

  function ActivityList(params) {
    
    var self = this;
    
    self.header = params.header;

    self.displayHeader = ko.computed(function () {
      return (params.header === undefined);
    });

    self.activities = params.activityModel.activities;
  }

  return { viewModel: ActivityList, template: templateMarkup };

});
