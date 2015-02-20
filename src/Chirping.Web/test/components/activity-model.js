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

  });

});
