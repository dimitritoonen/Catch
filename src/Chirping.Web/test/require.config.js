(function () {
  // Resolve all AMD modules relative to the 'build' directory, to produce the
  // same behavior that occurs at runtime
  require.baseUrl = '../src/';

  // It's not obvious, but this is a way of making Jasmine load and run in an AMD environment
  // Credit: http://stackoverflow.com/a/20851265
  var jasminePath = '../test/bower_modules/jasmine/lib/jasmine-core/';

  require.paths['jasmine'] = jasminePath + 'jasmine';
  require.paths['jasmine-html'] = jasminePath + 'jasmine-html';
  require.paths['jasmine-boot'] = jasminePath + 'boot';
 
  require.paths['knockout'] = 'bower_modules/knockout/dist/knockout';
  require.paths['jquery'] = 'bower_modules/jquery/dist/jquery';

  // add mockjack
  require.paths["jquery-mockjax"] = "../test/bower_modules/jquery-mockjax/jquery.mockjax";
  require.paths["mock-server"] = "mock_server/mock-server";
  require.paths["mock-activities"] = "mock_server/mock-activities";
  require.paths["mock-categories"] = "mock_server/mock-categories";
  
  require.shim['jasmine'] = { exports: 'window.jasmineRequire' };
  require.shim['jasmine-html'] = { deps: ['jasmine'], exports: 'window.jasmineRequire' };
  require.shim['jasmine-boot'] = { deps: ['jasmine', 'jasmine-html'], exports: 'window.jasmineRequire' };

  // add mockjack
  require.shim["jquery-mockjax"] = { deps: ["jquery"] };
})();
