var gulp = require('gulp');
var recess = require('gulp-recess');
var config = require('../../config').recess;

/* twitter RECESS for checking less files */
gulp.task('recess', function () {
  return gulp.src(config.src)
    .pipe(recess(config.options))
    .pipe(recess.reporter());
});