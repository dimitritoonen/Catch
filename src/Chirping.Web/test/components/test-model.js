define(['jquery', 'knockout', 'models/activity-model', 'mock-activities', 'jquery-mockjax'], function ($, ko, ActivityModel, mockActivities) {

  describe('activity model', function () {

    it('should test stuff', function (done) {
      $.mockjax({
        url: 'http://localhost:4421/api/activity',
        responseTime: 10, responseText: mockActivities.GetActivities({})
      });

      // arrange
      var instance = ActivityModel;

      console.log('1');

      setTimeout(function () {

        console.log('2');
        expect(instance.Activities().length).toEqual(1);

        done();
      }, 5);
    });

  }); // activity model

});
