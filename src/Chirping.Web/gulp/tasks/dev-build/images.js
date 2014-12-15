var gulp = require('gulp');
var changed = require('gulp-changed');
var browsersync = require('browser-sync');
var config = require('../../config').images;

// copy images to builder folder is changed
gulp.task('images', function () {
  return gulp.src(config.src)
  .pipe(changed(config.dest)) // ignore unchanged files
  .pipe(gulp.dest(config.dest));
});