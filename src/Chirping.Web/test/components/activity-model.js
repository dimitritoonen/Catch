define(['models/activity-model'], function (ActivityModel) {

  describe('activity model', function () {

    it('should reset Filter From Date', function () {
      // arrange
      var instance = ActivityModel;

      // act
      instance.ResetFilterFromDate();

      // assert
      expect(instance.Filter.FromDate()).toEqual(undefined);
    });


    describe('filtering activities', function () { 
      
      // arrange
      var instance;

      beforeEach(function (done) {
        
        instance = ActivityModel;

        // act
        console.log('test1');
        //instance.Filter.Search('Come and join us');

        setTimeout(function () { done(); }, 20);
      });

      it('should filter on text search', function () {

        // assert

        console.log(instance.Activities().length);
        //var activity = instance.Activities()[0];
        //expect(activity.id).toEqual(159);
      });

    }); // filtering activites

  }); // activity model

});
