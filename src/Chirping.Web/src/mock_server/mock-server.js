define(["jquery", "jquery-mockjax"], function ($) {

  $.mockjax({
    url: 'http://localhost:4421/api/activity',
    responseTime: 30, response: function (settings) {

      console.log('here');

      //this.responseText = mockActivities.GetActivities(settings.data.name);
    }
  });

});
