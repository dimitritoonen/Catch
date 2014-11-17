// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections.min",
        "knockout-validation":  "bower_modules/knockout-validation/dist/knockout.validation.min",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "qtip2":                "bower_modules/qtip2/jquery.qtip.min"
    },
    shim: {
      "bootstrap": { deps: ["jquery"] },
      "qtip2": { deps: ["jquery"] }
    },
    urlArgs: "bust=" + (new Date()).getTime()
};
