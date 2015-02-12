define(['jquery', 'mock-activities', 'jquery-mockjax'], function ($, mockActivities) {

  $.mockjax({
    url: 'http://localhost:4421/api/activity',
    responseTime: 30, response: function (settings) {

      this.responseText = mockActivities.GetActivities();
    }
  });

});
