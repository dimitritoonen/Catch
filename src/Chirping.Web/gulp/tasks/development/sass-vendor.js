var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

var autoprefixer = require('gulp-autoprefixer');

var config = require('../../config').sass.vendor;
var cssConfig = require('../../config').css;

// add plugins for piping vendor css files
var concat = require('gulp-concat');
var es = require('event-stream');

gulp.task('sass:vendor', function () {

  var bowerFiles = gulp.src(cssConfig.src);
  var sassFiles = gulp.src(config.src)
    .pipe(sass(config.options))
    .pipe(gulp.dest(config.dest));

  return es.concat(bowerFiles, sassFiles)
    .pipe(concat('vendor-styles.css'))
    .pipe(gulp.dest(config.dest));
});