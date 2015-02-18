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
        time: { beginTime: filter.BeginTime(), endTime: filter.EndTime() }
      };
    };


    // set filters for activities
    self.SetFilterCategory = function (category) { filter.Category(category); };
    self.SetFilterParticipants = function (participants) { filter.Participants(participants); };
    self.SetFilterDate = function (date) { filter.Date(date); };
    self.SetFilterTime = function (beginTime, endTime) { filter.EndTime(endTime); filter.BeginTime(beginTime); };
    self.SetFilterSearch = function (search) { filter.Search(search); };

    // get filters
    self.GetFilterParticipants = function () { return filter.Participants; }
    self.GetFilterSearch = function () { return filter.Search; }
    self.GetFilterTime = function () { return { beginTime: filter.BeginTime, endTime: filter.EndTime } };
    self.ResetFilterDate = function () { self.SetFilterDate(undefined); };

    // update activites based on filters
    self.disposables.push(filter.Category.subscribe(function () { GetActivities(); }));
    self.disposables.push(filter.Participants.subscribe(function () { GetActivities(); }));
    self.disposables.push(filter.Date.subscribe(function () { GetActivities(); }));
    self.disposables.push(filter.BeginTime.subscribe(function () { GetActivities(); }));
    self.disposables.push(filter.EndTime.subscribe(function () { GetActivities(); }));
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