define(['knockout', 'services/webapi-service', './activity-filter-model'], function (ko, webapi, filterModel) {

  // constructor
  function ActivityModel() {

    var self = this;
    
    var GetActivities = function () {

      var filter = GetFilter();

      webapi.Get('api/activity', self.Filter).done(function (result) {
        self.activities(result);
      });
    }

    // get the filter object
    var GetFilter = function () {
      return {
        category: self.Filter.Category(),
        participants: self.Filter.Participants(),
        date: self.Filter.Date(),
        time: self.Filter.Time()
      };
    };

    self.activities = ko.observableArray();


    // filter fields -> which reload the activities
    self.Filter = new filterModel();

    self.SliderMarkerPosition = ko.observable();

    // set filters for activities
    //self.SetFilterCategory = function (category) { self.Filter.Category(category); };
    //self.SetFilterParticipants = function (participants) { self.Filter.Participants(participants); };
    //self.SetFilterDate = function (date) { self.Filter.Date(date); };
    //self.SetFilterTime = function (time) { self.Filter.Time(time); };

    // update activites based on filters
    self.Filter.Category.subscribe(function () { GetActivities(); });
    self.Filter.Participants.subscribe(function () {
      console.log('here?');
      GetActivities();
    });
    self.Filter.Date.subscribe(function () { GetActivities(); });
    self.Filter.Time.subscribe(function () { GetActivities(); });
    
    // add activity
    self.AddActivity = function (activity) {
      //
    };

    // initialize the activities
    GetActivities();
  }
  
  return new ActivityModel();

});