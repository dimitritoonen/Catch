var modernizr = require('gulp-modernizr');
var gulp = require('gulp');
var config = require('../../config').modernizr.development;

gulp.task('modernizr', function () {
  return gulp.src(config.src)
    .pipe(modernizr())
    .pipe(gulp.dest(config.dest));
});