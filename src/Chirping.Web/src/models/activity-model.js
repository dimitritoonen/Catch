define(['knockout', 'services/webapi-service', './activity-filter-model'], function (ko, webapi, filterModel) {

  // constructor
  function ActivityModel() {

    var self = this;

    self.disposables = [];

    // contains the observable list of activities
    self.Activities = ko.observableArray();

    // filter fields -> which reload the activities
    self.Filter = new filterModel();

    // defines the marker position of the filter slider
    self.SliderMarkerPosition = ko.observable();

    
    var GetActivities = function () {
      
      var filter = GetFilter();
      
      webapi.Get('api/activity', filter).done(function (result) {

        self.Activities(result);
      });
    }

    // get the filter object
    var GetFilter = function () {
      return {
        search: self.Filter.Search(),
        category: (self.Filter.Category() === undefined ? undefined : self.Filter.Category().Code),
        participants: self.Filter.Participants(),
        date: { fromDate: self.Filter.FromDate(), tillDate: self.Filter.TillDate() },
        time: { beginTime: self.Filter.BeginTime(), endTime: self.Filter.EndTime() }
      };
    };

    // reset dates
    self.ResetFilterFromDate = function () { self.Filter.FromDate(undefined); };
    self.ResetFilterTillDate = function () { self.Filter.TillDate(undefined); };

    // update activites based on filters
    self.disposables.push(self.Filter.Category.subscribe(function () { GetActivities(); }));
    self.disposables.push(self.Filter.Participants.subscribe(function () { GetActivities(); }));
    self.disposables.push(self.Filter.FromDate.subscribe(function () { GetActivities(); }));
    self.disposables.push(self.Filter.TillDate.subscribe(function () { GetActivities(); }));
    self.disposables.push(self.Filter.BeginTime.subscribe(function () { GetActivities(); }));
    self.disposables.push(self.Filter.EndTime.subscribe(function () { GetActivities(); }));
    self.disposables.push(self.Filter.Search.subscribe(function () { GetActivities(); }));
    
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