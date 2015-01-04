var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../../config').less.vendor;
var cssConfig = require('../../config').css;

// add plugins for piping vendor css files
var concat = require('gulp-concat');
var es = require('event-stream');

gulp.task('less:vendor', function () {
  
  var bowerFiles = gulp.src(cssConfig.src);
  var lessFiles = gulp.src(config.src)
    .pipe(less())
    .pipe(gulp.dest(config.dest));
  
  return es.concat(bowerFiles, lessFiles)
    .pipe(concat('vendor-styles.css'))
    .pipe(gulp.dest(config.dest));
});