var gulp = require('gulp');
var config = require('../../config').modernizr.development;

gulp.task('copy:modernizr', function () {

  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));

});