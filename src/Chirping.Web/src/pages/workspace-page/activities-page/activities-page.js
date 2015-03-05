define(['knockout', 'text!./activities-page.html', 'services/webapi-service', 'models/activity-model'], function (ko, templateMarkup, webapi, activityModel) {

  function ActivitiesPage(params) {
    
    var self = this;

    self.activityModel = activityModel;

    webapi.Get('api/category').done(function (result) {

      self.categories(result);

      // add empty item to the beginning of the list to reset
      self.categories.unshift({ 'Code': undefined, 'Description': '' });
    });

    self.categories = ko.observableArray();
  }


  return { viewModel: ActivitiesPage, template: templateMarkup };

});
