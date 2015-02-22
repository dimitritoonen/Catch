define(['jquery', 'knockout', 'models/activity-model', 'mock-activities', 'jquery-mockjax'], function ($, ko, ActivityModel, mockActivities) {

  describe('activity model - ', function () {
    
    beforeEach(function () {
      $.mockjax({
        url: 'http://localhost:4421/api/activity',
        responseTime: 10, responseText: mockActivities.GetActivities({})
      });
    });

    afterEach(function () {
      $.mockjax.clear();
    });

    it('should reset Filter From Date', function (done) {
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


    
    //describe('filtering activities', function () { 
      
    //  // arrange
    //  var instance;

    //  beforeEach(function (done) {
        
    //    instance = ActivityModel;

    //    // act
    //    console.log('test1');
    //    //instance.Filter.Search('Come and join us');

    //    setTimeout(function () { done(); }, 200);
    //  });

    //  it('should filter on text search', function (done) {
    //    setTimeout(function () {
    //      //console.log(instance.Activities().length);
    //      console.log('done');

    //      //done();
    //    }, 20);
    //    // assert

    //    //var activity = instance.Activities()[0];
    //    //expect(activity.id).toEqual(159);
    //  });

    //}); // filtering activites

  }); // activity model

});
