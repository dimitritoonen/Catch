define(['knockout'], function (ko) {

  // extension method knockout observableArray
  // get a value from a specified property and value to match

  ko.observable.fn.GetByProperty = function (propertyName, matchValue) {
    return ko.pureComputed(function () {

      var allItems = this(), matchingItems = [];

      for (var i = 0; i < allItems.length; i++) {
        var current = allItems[i];

        if (ko.unwrap(current[propertyName]) === matchValue) {
          return current;
        }
      }

    }, this);
  }
})