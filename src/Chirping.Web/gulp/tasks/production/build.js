var gulp = require('gulp');
var runSequence = require('run-sequence');

/*
  Run all tasks needed for a build in defined order
*/
gulp.task('build:production', function (callback) {
  runSequence('delete',
    [
      'js:production',
      'html:production',
      'sass',
      'images',
      'fonts'
    ],
    'base64',
    [
      'optimize:js',
      'optimize:css',
      //'optimize:html',
      'optimize:images',
      'copy:fonts:production'
    ],
    //'revision',
    //'rev:collect',
    callback);
});