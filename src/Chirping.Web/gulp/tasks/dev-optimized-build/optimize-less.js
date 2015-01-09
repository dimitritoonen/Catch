var gulp = require('gulp');
var less = require('gulp-less');
var gulpFilter = require('gulp-filter');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../../config').less.optimized;

// add plugins for piping css files
var concat = require('gulp-concat');
var es = require('event-stream');

gulp.task('less:optimized', function () {

  // Don’t write sourcemaps of sourcemaps
  var filter = gulpFilter(['*.css', '!*.map']);

  var lessFiles = gulp.src(config.src)
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(filter) // Don’t write sourcemaps of sourcemaps
    .pipe(sourcemaps.write('.', { includeContent: false }))
    .pipe(filter.restore()) // Restore original files
    .pipe(gulp.dest(config.dest));

  return es.concat(lessFiles)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(config.dest));
});
