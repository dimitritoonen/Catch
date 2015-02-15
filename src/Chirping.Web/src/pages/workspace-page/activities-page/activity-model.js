define(['knockout', 'services/webapi-service', './activity-filter-model'], function (ko, webapi, filterModel) {

  // constructor
  function ActivityModel() {

    var self = this;
    
    var GetActivities = function () {

      var filter = GetFilter();

      webapi.Get('api/activity', filter).done(function (result) {
        self.activities(result);
      });
    }

    // get the filter object
    var GetFilter = function () {
      return {
        category: filter.Category(),
        participants: filter.Participants(),
        date: filter.Date(),
        time: filter.Time()
      };
    };

    self.activities = ko.observableArray();


    // filter fields -> which reload the activities
    var filter = new filterModel();

    // set filters for activities
    self.SetFilterCategory = function (category) { filter.Category(category); };
    self.SetFilterParticipants = function (participants) { filter.Participants(participants); };
    self.SetFilterDate = function (date) { filter.Date(date); };
    self.SetFilterTime = function (time) { filter.Time(time); };

    // update activites based on filters
    filter.Category.subscribe(function () { GetActivities(); });
    filter.Participants.subscribe(function () {
      console.log('here?');
      GetActivities();
    });
    filter.Date.subscribe(function () { GetActivities(); });
    filter.Time.subscribe(function () { GetActivities(); });
    
    // add activity
    self.AddActivity = function (activity) {
      //
    };

    // initialize the activities
    GetActivities();
  }
  
  return new ActivityModel();

});