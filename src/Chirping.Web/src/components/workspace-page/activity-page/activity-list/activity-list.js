define(['knockout', 'text!./activity-list.html', '../activity-model'], function (ko, templateMarkup, activityModel) {

  function ActivityList(params) {
    
    var self = this;
    
    self.header = params.header;

    self.displayHeader = ko.computed(function () {
      return (params.header === undefined);
    });

    self.activities = activityModel.activities;    
  }

  return { viewModel: ActivityList, template: templateMarkup };

});
