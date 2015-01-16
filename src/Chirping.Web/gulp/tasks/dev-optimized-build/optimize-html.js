var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var config = require('../../config').html.optimized;
var preprocess = require('gulp-preprocess');

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('optimize:html', function () {
  return gulp.src(config.src)
    .pipe(preprocess({ context: { NODE_ENV: 'development' } }))
    .pipe(htmlreplace({
      'css': '/css/styles.css',
      'vendor-css': '/css/vendor-styles.css',
      'js': 'scripts.js'
    }))
    .pipe(gulp.dest(config.dest));
});