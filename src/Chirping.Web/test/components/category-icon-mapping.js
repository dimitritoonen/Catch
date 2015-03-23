define(['jquery', 'knockout', 'models/category-icon-mapping'], function ($, ko, catmap) {

  describe('activity model - ', function () {

    it('should get category by category code', function () {

      // arrange
      var instance = catmap;
      var expected = { category: 'shopping', icon: 'fa-shopping-cart', color: 'green' };

      // act
      var mapping = instance.Get('shopping');

      // assert
      expect(mapping).toEqual(expected)

    });


    it('should get unknown category when category code is unknown', function () {

      // arrange
      var instance = catmap;
      var expected = { category: 'unknown', icon: 'fa-question' };

      // act
      var mapping = instance.Get('unknown-category-mapping');

      // assert
      expect(mapping).toEqual(expected)

    });

  });

});