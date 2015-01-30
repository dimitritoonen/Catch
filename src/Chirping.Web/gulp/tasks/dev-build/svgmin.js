var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var config = require('../../config').svgmin;

gulp.task('svgmin', function () {

  return gulp.src(config.src)
    .pipe(svgmin())
    .pipe(gulp.dest(config.dest));

});