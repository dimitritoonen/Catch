/// <reference path="../.js" />
// require.js looks for the following global when initializing
var require = {
  baseUrl: ".",
  paths: {
    "modernizr": "bower_modules/modernizr/modernizr",
    "bootstrap": "bower_modules/bootstrap/dist/js/bootstrap.min",
    "bootstrap-dialog": "bower_modules/bootstrap-dialog/dist/js/bootstrap-dialog.min",
    "datetimepicker": "bower_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min",
    "moment": "bower_modules/moment/min/moment-with-locales.min",
    "crossroads": "bower_modules/crossroads/dist/crossroads.min",
    "hasher": "bower_modules/hasher/dist/js/hasher.min",
    "jquery": "bower_modules/jquery/dist/jquery",
    "jquery-ui": "bower_modules/jquery-ui/jquery-ui",
    "knockout": "bower_modules/knockout/dist/knockout",
    "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections.min",
    "knockout-validation": "bower_modules/knockout-validation/dist/knockout.validation.min",
    "knockout-mapping": "bower_modules/knockout-mapping/build/output/knockout.mapping-latest",
    "signals": "bower_modules/js-signals/dist/signals.min",
    "text": "bower_modules/requirejs-text/text",
    "qtip2": "bower_modules/qtip2/jquery.qtip.min",
    "jcrop": "bower_modules/jcrop/js/jquery.Jcrop.min",
    "dateformat": "bower_modules/jquery-dateFormat/dist/jquery-dateFormat.min",

    // mockjax
    "jquery-mockjax": "bower_modules/jquery-mockjax/jquery.mockjax",
    "mock-server": "mock_server/mock-server",
    "mock-activities": "mock_server/mock-activities",
    "mock-categories": "mock_server/mock-categories",

    // metro interface
    "metro-touch-handler": "bower_modules/metro-ui-css/js/metro-touch-handler",
    "metro-slider": "bower_modules/metro-ui-css/js/metro-slider"
  },
  shim: {
    "jquery-mockjax": { deps: ["jquery"] },
    "jquery-ui": {
      exports: "$",
      deps: ["jquery"]
    },
    "bootstrap": { deps: ["jquery", "jquery-ui"] },
    "qtip2": { deps: ["jquery"] },
    "metro-slider": {
      deps: ["jquery-ui", "metro-touch-handler"]
    },
    "dateformat": { deps: ["jquery"] }
  },
  urlArgs: "bust=" + (new Date()).getTime()
};
