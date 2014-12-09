var gulp = require('gulp');
var config = require('../../config').watch;

// start the browsersync task and watch files for changes
gulp.task('watch', ['browsersync'], function () {

  gulp.watch(config.sass, ['sass:watch', 'scsslint']);
  gulp.watch(config.scripts, ['js', 'jshint']);
  gulp.watch(config.images, ['images']);
  gulp.watch(config.html, ['html']);

});