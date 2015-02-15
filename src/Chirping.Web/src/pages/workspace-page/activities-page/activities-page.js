define(['knockout', 'text!./activities-page.html', 'services/webapi-service', './activity-model'], function (ko, templateMarkup, webapi, activityModel) {

  function ActivitiesPage(params) {
    
    var self = this;

    webapi.Get('api/categories').done(function (result) {
      self.categories(result);
    });

    self.categories = ko.observableArray();

    self.activityModel = activityModel;
  }


  return { viewModel: ActivitiesPage, template: templateMarkup };

});
