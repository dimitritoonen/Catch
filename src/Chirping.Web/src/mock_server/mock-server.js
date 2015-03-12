define([
    'jquery',
    'mock-activities',
    'mock-categories',
    'jquery-mockjax'
  ], function ($, mockActivities, mockCategories) {

  $.mockjax({
    url: 'http://192.168.1.17/Chirping.Web.Api/api/activity',
    responseTime: 1000, response: function (filter) {

      this.responseText = mockActivities.GetActivities(filter);
    }
  });

  $.mockjax({
    url: 'http://192.168.1.17/Chirping.Web.Api/api/category',
    responseTime: 30,
    response: function (settings) {

      this.responseText = mockCategories.GetCategories();
    }
  });

});
