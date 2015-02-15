define(['knockout'], function (ko) {

  function ActivityFilterModel() {

    var self = this;

    // filter fields -> which reload the activities
    self.Category = ko.observable();
    self.Date = ko.observable();
    self.Time = ko.observable();
    self.Participants = ko.observable();

    self.Category.extend({ rateLimit: 500 });
    self.Date.extend({ rateLimit: 500 });
    self.Time.extend({ rateLimit: 500 });
    self.Participants.extend({ rateLimit: 500 });
  }


  return ActivityFilterModel;

});