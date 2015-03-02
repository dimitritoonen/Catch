define('jquery', 'knockout', function ($, ko) {

  function TestModel() {

    var self = this;

    self.GetTestMethod = function () {

      return $.ajax({
        type: 'GET',
        url: 'http://localhost:4421/api/activity'
      });

    };

  }

  return new TestModel;
});