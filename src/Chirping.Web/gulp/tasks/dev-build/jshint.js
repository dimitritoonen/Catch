var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var config = require('../../config').jshint;

/*
  check javascript syntax with JSHint
*/
gulp.task('jshint', function () {
  return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});