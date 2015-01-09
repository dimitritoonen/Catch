var gulp = require('gulp');
var runSequence = require('run-sequence');

// run all gulp tasks to build the application in a specific order
gulp.task('build:optimize', function (callback) {
  runSequence('delete', 'less:vendor',
  [
    'scripts',
    'less:optimized',
    'optimize:html',
    'images',
    'fonts'
  ],
  'base64',
  callback);
});