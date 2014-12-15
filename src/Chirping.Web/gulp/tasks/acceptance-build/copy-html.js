var gulp = require('gulp');
var config = require('../../config').html.production;

/* Copy fonts to folder */
gulp.task('copy:html:publish', function () {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});