var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browsersync = require('browser-sync');
var gulpFilter = require('gulp-filter');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../../config');

// add plugins for piping css files
var concat = require('gulp-concat');
var es = require('event-stream');

gulp.task('sass', function () {
  var sassConfig = config.sass.options;

  sassConfig.onError = browsersync.notify;

  // Don’t write sourcemaps of sourcemaps
  var filter = gulpFilter(['*.css', '!*.map']);
  
  var sassFiles = gulp.src(config.sass.src)
    .pipe(sass(sassConfig))
    .pipe(sourcemaps.init())
    .pipe(filter) // Don’t write sourcemaps of sourcemaps
    .pipe(sourcemaps.write('.', { includeContent: false }))
    .pipe(filter.restore()) // Restore original files
    .pipe(gulp.dest(config.sass.dest));

  return es.concat(sassFiles)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(config.sass.dest));
});
