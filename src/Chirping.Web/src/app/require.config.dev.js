(function () {
  require.baseUrl = '.';

  require.paths["jquery-mockjax"] = "bower_modules/jquery-mockjax/jquery.mockjax";
  require.paths["mock-server"] = "mock_server/mock-server";
  require.paths["mock-activities"] = "mock_server/mock-activities";
  require.paths["mock-categories"] = "mock_server/mock-categories";

  require.shim["jquery-mockjax"] = { deps: ["jquery"] };

  require.urlArgs = "bust=" + (new Date()).getTime();
})();
