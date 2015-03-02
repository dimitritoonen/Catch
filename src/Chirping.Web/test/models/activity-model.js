define(['jquery', 'knockout', 'models/activity-model', 'mock-activities', 'jquery-mockjax'], function ($, ko, ActivityModel, mockActivities) {

  //beforeEach(function () {
  //  $.mockjax({
  //    url: 'http://localhost:4421/api/activity',
  //    responseTime: 10, responseText: mockActivities.GetActivities({
  //      search: undefined,
  //      category: undefined,
  //      participants: 4
  //    })
  //  });
  //});

  //afterEach(function () {
  //  $.mockjax.clear();
  //});

  describe('activity model - ', function () {
    
    it('should reset Filter From/till Date', function () {
      
      // arrange
      var instance = ActivityModel;
      instance.Filter.FromDate('2015-02-03');
      instance.Filter.TillDate('2015-02-05');

      // act
      instance.ResetFilterFromDate();
      instance.ResetFilterTillDate();

      // assert
      expect(instance.Filter.FromDate()).toBeUndefined();
      expect(instance.Filter.TillDate()).toBeUndefined();
    });


    
    describe('filtering activities', function () { 
      
      it('should filter on category', function () {
       
        // arrange 
        var instance = ActivityModel;

        // act
        instance.Filter.Category('test-category');

        // assert
        expect(instance.Filter.Category()).toEqual('test-category');
      });


      it('should filter on participants', function () {

        // arrange 
        var instance = ActivityModel;

        // act
        instance.Filter.Participants(5);

        // assert
        expect(instance.Filter.Participants()).toEqual(5);
      });

      it('should filter on from and till dates', function () {

        // arrange 
        var instance = ActivityModel;

        // act
        instance.Filter.FromDate('2015-02-03');
        instance.Filter.TillDate('2015-02-05');

        // assert
        expect(instance.Filter.FromDate()).toEqual('2015-02-03');
        expect(instance.Filter.TillDate()).toEqual('2015-02-05');
      });

      it('should filter on begin and end times', function () {

        // arrange 
        var instance = ActivityModel;

        // act
        instance.Filter.BeginTime(1);
        instance.Filter.EndTime(23);

        // assert
        expect(instance.Filter.BeginTime()).toEqual(1);
        expect(instance.Filter.EndTime()).toEqual(23);
      });


      it('should filter on text search', function () {

        // arrange 
        var instance = ActivityModel;

        // act
        instance.Filter.Search('text search');

        // assert
        expect(instance.Filter.Search()).toEqual('text search');
      });

    }); // filtering activites

  }); // activity model

});
