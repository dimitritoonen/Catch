var gulp = require('gulp');
var browsersync = require('browser-sync');
var config = require('../../config').browsersync.development;

// run the build task and start a server with browsersync
gulp.task('browsersync:optimized', ['build:optimize'], function () {
  browsersync(config);
});