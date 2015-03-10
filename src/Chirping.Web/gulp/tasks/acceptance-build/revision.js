var gulp = require('gulp');
var rev = require('gulp-rev');
var config = require('../../config').optimize.revision;

/*
  Revision all files and write a manifest file
*/

gulp.task('revision', function () {
  
  return gulp.src(config.src, { base: config.dest })
    .pipe(gulp.dest(config.dest))
    .pipe(rev())
    .pipe(gulp.dest(config.dest))
    .pipe(rev.manifest({ path: config.manifest.name }))
    .pipe(gulp.dest(config.manifest.path));
});