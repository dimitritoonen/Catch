var gulp = require('gulp');
var runSequence = require('run-sequence');

/* Run all tasks needed for a build in defined order */
gulp.task('build:acceptance', function (callback) {
  runSequence('delete', 'less:vendor', 'copy:modernizr',
    [
      'scripts:publish',
      'optimize:html',
      'less:optimized',
      'images',
      'svgmin',
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
    'copy:web:config',
    'revision',
    'revision:collect',
    'revision:cleanup',
    'revision:requireJs:collect',
    callback);
});