var gulp = require('gulp');
var config = require('../../config').auth;

// copies over the individual js files so it's faster for development
gulp.task('copy:auth', function () {

  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));

});