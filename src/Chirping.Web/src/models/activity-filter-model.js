define(['knockout'], function (ko) {

  function ActivityFilterModel() {

    var self = this;

    // filter fields -> which reload the activities
    self.Search = ko.observable();
    self.Category = ko.observable();
    self.FromDate = ko.observable();
    self.TillDate = ko.observable();
    self.BeginTime = ko.observable(12); // default to 12 hours
    self.EndTime = ko.observable(20); // default to 20 hours
    self.Participants = ko.observable(10); // default to 10 participants

    // set the reaction time to 500ms so that not every key enter will start a new search
    self.Search.extend({ rateLimit: 500 });
  }


  return ActivityFilterModel;

});