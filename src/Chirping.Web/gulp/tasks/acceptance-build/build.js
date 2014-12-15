var gulp = require('gulp');
var runSequence = require('run-sequence');

/* Run all tasks needed for a build in defined order */
gulp.task('build:acceptance', function (callback) {
  runSequence('delete', 'sass:vendor',
    [
      'scripts:publish',
      'optimize:html',
      'sass',
      'images',
      'fonts'
    ],
    'base64',
    [
      'optimize:js:acceptance',
      'optimize:css',
      'copy:html:publish',
      'optimize:images',
      'copy:fonts:publish'
    ],
    //'revision',
    //'rev:collect',
    callback);
});