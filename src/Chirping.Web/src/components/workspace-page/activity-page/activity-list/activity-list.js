define(['knockout', 'text!./activity-list.html'], function (ko, templateMarkup) {

  function ActivityList(params) {
    
    var self = this;
    
    var model = params.model;
    self.activities = model.Activities;
    self.loadingActivites = model.LoadingActivities;

    // display a loading image if activities are loading
    model.LoadingActivities.subscribe(function (value) {
      if (value) {
        $('.loading-overlay').addClass('show');
        $('.no-activities-found').addClass('hide');
      } else {
        $('.loading-overlay').removeClass('show');
        $('.no-activities-found').removeClass('hide');
      }
    });

    self.header = params.header;

    self.displayHeader = ko.computed(function () {
      return (params.header === undefined);
    });
  }

  return { viewModel: ActivityList, template: templateMarkup };

});
