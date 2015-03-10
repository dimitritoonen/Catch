var gulp = require('gulp');
var modernizr = require('gulp-modernizr');
var config = require('../../config').modernizr.production;

/*
  Builds a modernizr js file based on the needed functionality
*/

gulp.task('build:modernizr', function () {
  return gulp.src(config.src)
    .pipe(modernizr())
    .pipe(gulp.dest(config.dest));
});