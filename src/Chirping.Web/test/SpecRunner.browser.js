(function() {
  // Reference your test modules here
  var testModules = [
    'components/activity-model',
    'components/test-model',
  ];

  // After the 'jasmine-boot' module creates the Jasmine environment, load all test modules then run them
  require(['jasmine-boot'], function () {
    var modulesCorrectedPaths = testModules.map(function (m) {
      return '../test/' + m;
    });

    require(modulesCorrectedPaths, window.onload);
  });
})();
