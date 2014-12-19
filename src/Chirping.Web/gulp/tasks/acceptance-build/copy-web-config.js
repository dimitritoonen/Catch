var gulp = require('gulp');
var config = require('../../config').webConfig

/* Copy fonts to folder */
gulp.task('copy:web:config', function () {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});