var gulp = require('gulp');
var config = require('../../config').less.optimized.vendor;
var cssConfig = require('../../config').css;
var concat = require('gulp-concat');
var es = require('event-stream');

gulp.task('css:vendor', function() {
  return es.concat(gulp.src(cssConfig.src)
    .pipe(concat('vendor-styles.css'))
    .pipe(gulp.dest(config.dest)));
});