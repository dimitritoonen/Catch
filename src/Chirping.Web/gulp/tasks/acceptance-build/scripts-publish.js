// Node modules
var fs = require('fs');
var vm = require('vm');
var merge = require('deeply');

// Gulp and plugins
var gulp = require('gulp');
var rjs = require('gulp-requirejs-bundler');
var config = require('../../config').js;
var optimizeConfig = require('../../config').optimize.js;

// get the configuration from the require.config.js and merge it with the custom bundels and requireJs configuration
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
requireJsOptimizerConfig = merge(requireJsRuntimeConfig, optimizeConfig.requireJs);

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('scripts:publish', function () {
  return rjs(requireJsOptimizerConfig)
    .pipe(gulp.dest(config.dest));
});