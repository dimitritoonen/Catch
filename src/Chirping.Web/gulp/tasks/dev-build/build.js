var gulp = require('gulp');
var runSequence = require('run-sequence');

// run all gulp tasks to build the application in a specific order
gulp.task('build', function (callback) {
  runSequence(
    'delete',
    'css:vendor',
    'copy:scripts:vendor',
  [ 
    'copy:scripts',
    'less',
    'html',
    'copy:auth',
    'images',
    'svgmin',
    'fonts'
  ],
  'base64',
  callback);
});