define(['knockout', 'services/webapi-service', './activity-filter-model'], function (ko, webapi, filterModel) {

  // constructor
  function ActivityModel() {

    var self = this;

    self.disposables = [];

    // contains the observable list of activities
    self.activities = ko.observableArray();

    // filter fields -> which reload the activities
    var filter = new filterModel();

    // defines the marker position of the filter slider
    self.SliderMarkerPosition = ko.observable();

    
    var GetActivities = function () {

      var filter = GetFilter();

      webapi.Get('api/activity', filter).done(function (result) {
        self.activities(result);
      });
    }

    // get the filter object
    var GetFilter = function () {
      return {
        search: filter.Search(),
        category: filter.Category(),
        participants: filter.Participants(),
        date: filter.Date(),
        time: filter.Time()
      };
    };


    // set filters for activities
    self.SetFilterCategory = function (category) { filter.Category(category); };
    self.SetFilterParticipants = function (participants) { filter.Participants(participants); };
    self.SetFilterDate = function (date) { filter.Date(date); };
    self.SetFilterTime = function (time) { filter.Time(time); };
    self.SetFilterSearch = function (search) { filter.Search(search); };

    self.GetFilterParticipants = function () { return filter.Participants; }
    self.GetFilterSearch = function () { return filter.Search; }

    self.ResetFilterDate = function () { self.SetFilterDate(undefined); };

    // update activites based on filters
    self.disposables.push(filter.Category.subscribe(function () { GetActivities(); }));
    self.disposables.push(filter.Participants.subscribe(function () { GetActivities(); }));
    self.disposables.push(filter.Date.subscribe(function () { GetActivities(); }));
    self.disposables.push(filter.Time.subscribe(function () { GetActivities(); }));
    self.disposables.push(filter.Search.subscribe(function () { GetActivities(); }));
    
    // add activity
    self.AddActivity = function (activity) {
      //
    };

    // initialize the activities
    GetActivities();
  }

  // dispose subscriptions
  ActivityModel.prototype.dispose = function () {
    ko.utils.arrayForEach(this.disposables, function (item) {
      item.dispose();
    });
  };
  
  return new ActivityModel();

});