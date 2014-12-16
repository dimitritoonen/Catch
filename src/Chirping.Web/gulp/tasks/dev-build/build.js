﻿var gulp = require('gulp');
var runSequence = require('run-sequence');

// run all gulp tasks to build the application in a specific order
gulp.task('build', function (callback) {
  runSequence('delete', 'sass:vendor', 'copy:scripts:vendor',
  [
    'copy:scripts',
    'sass',
    'html',
    'images',
    'fonts'
  ],
  'base64',
  callback);
});