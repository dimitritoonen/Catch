var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var config = require('../../config').baseUrl;

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function () {
  return gulp.src([
    config.src + '/*.html',
    config.src + '/authentication/*.html'
  ])
    .pipe(htmlreplace({
      'css': '/css/styles.css',
      'js': 'scripts.js'
    }))
    .pipe(gulp.dest(config.dest));
});