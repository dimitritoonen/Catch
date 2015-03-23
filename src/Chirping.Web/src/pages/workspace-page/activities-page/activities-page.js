define(['knockout', 'text!./activities-page.html', 'services/webapi-service', 'models/activity-model'], function (ko, templateMarkup, webapi, activityModel) {

  function ActivitiesPage(params) {
    
    var self = this;

    self.activityModel = activityModel;
    self.categories = ko.observableArray();
    
    webapi.Get('api/category').done(function (result) {
      self.categories(result);
    });
  }

  return { viewModel: ActivitiesPage, template: templateMarkup };

});
