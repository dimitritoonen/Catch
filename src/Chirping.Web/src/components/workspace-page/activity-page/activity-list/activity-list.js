define(['knockout', 'text!./activity-list.html', 'services/webapi-service'], function (ko, templateMarkup, webapi) {

  function ActivityList(params) {
    
    var self = this;
    
    self.header = params.header;

    self.displayHeader = ko.computed(function () {
      return (params.header === undefined);
    });


    webapi.Get('api/activity').done(function () {

      console.log('here?');
    });
  }

  return { viewModel: ActivityList, template: templateMarkup };

});
