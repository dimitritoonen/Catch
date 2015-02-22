define([
    'jquery',
    'mock-activities',
    'mock-categories',
    'jquery-mockjax'
  ], function ($, mockActivities, mockCategories) {

  $.mockjax({
    url: 'http://localhost:4421/api/activity',
    responseTime: 30, response: function (filter) {

      this.responseText = mockActivities.GetActivities(filter);
    }
  });

  $.mockjax({
    url: 'http://localhost:4421/api/categories',
    responseTime: 30,
    response: function (settings) {

      this.responseText = mockCategories.GetCategories();
    }
  });

});
