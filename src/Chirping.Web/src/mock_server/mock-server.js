define([
    'jquery',
    'mock-activities',
    'mock-categories',
    'jquery-mockjax'
], function ($, mockActivities, mockCategories) {

  // get activities
  $.mockjax({
    url: 'http://localhost/Chirping.Web.Api/api/activity',
    type: 'get',
    responseTime: 1000,
    response: function (filter) {

      this.responseText = mockActivities.GetActivities(filter);
    }
  });

  // post and activity
  $.mockjax({
    url: 'http://localhost/Chirping.Web.Api/api/activity',
    type: 'post',
    responseTime: 1000,
    response: function (data) {

      this.responseText = mockActivities.AddActivity(data);
    }
  });

  // gets categories
  $.mockjax({
    url: 'http://localhost/Chirping.Web.Api/api/category',
    responseTime: 30,
    response: function (settings) {

      this.responseText = mockCategories.GetCategories();
    }
  });

});
