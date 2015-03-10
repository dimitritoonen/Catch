var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var config = require('../../config').html.development;
var preprocess = require('gulp-preprocess');
var plumber = require('gulp-plumber');

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function () {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(preprocess({ context: { NODE_ENV: 'development'} }))
    .pipe(htmlreplace({
      'css': '/css/styles.css',
      'vendor-css': '/css/vendor-styles.css',
      'js': {
        src: 'app/startup',
        tpl: '<script src="app/require.config.js"></script>' +
              '<script src="app/require.config.dev.js"></script>' +
              '<script data-main="%s" src="bower_modules/requirejs/require.js"></script>'
      },
      'modernizr': '<script src="bower_modules/modernizr/modernizr.js"></script>'
    }))
    .pipe(gulp.dest(config.dest));
});