var gulp = require('gulp');
var config = require('../../config').fonts.development;

// copy fonts to folder
gulp.task('fonts', function () {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});