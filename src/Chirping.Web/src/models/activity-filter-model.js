define(['knockout'], function (ko) {

  function ActivityFilterModel() {

    var self = this;

    // filter fields -> which reload the activities
    self.Search = ko.observable();
    self.Category = ko.observable();
    self.Date = ko.observable();
    self.Time = ko.observable();
    self.Participants = ko.observable(10);

    // set the reaction time to 500ms so that not every key enter will start a new search
    self.Search.extend({ rateLimit: 500 });
  }


  return ActivityFilterModel;

});