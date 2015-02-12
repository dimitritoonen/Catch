define(['knockout', 'services/webapi-service', './activity-filter-model'], function (ko, webapi, filterModel) {

  // constructor
  function ActivityModel() {

    var self = this;
    
    var GetActivities = function (filter) {
      webapi.Get('api/activity').done(function (result) {
        self.activities(result);
      });
    }

    self.activities = ko.observableArray();


    // filter fields -> which reload the activities
    var filter = new filterModel();

    // set category
    self.SetFilterCategory = function (category) {
      filter.Category = category;
    };

    // update activities if category changes
    filter.Category.subscribe(function (category) {
      GetActivities({ category: category });
    });
    

    // add activity
    self.AddActivity = function (activity) {
      //
    };

    // initialize the activities
    GetActivities();
  }
  
  return new ActivityModel();

});