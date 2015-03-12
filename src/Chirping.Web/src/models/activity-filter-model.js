define(['knockout', 'moment'], function (ko, moment) {

  function ActivityFilterModel() {

    var self = this;

    // filter fields -> which reload the activities
    self.Search = ko.observable();
    self.Category = ko.observable();
    self.FromDate = ko.observable(moment().format());
    self.TillDate = ko.observable(moment().add(1, 'month').format());
    self.BeginTime = ko.observable(12); // default to 12 hours
    self.EndTime = ko.observable(24); // default to 24 hours
    self.Participants = ko.observable(10); // default to 10 participants

    // set the reaction time to 500ms so that not every key enter will start a new search
    self.Search.extend({ rateLimit: 500 });
  }


  return ActivityFilterModel;

});