var gulp = require('gulp');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var es = require('event-stream');
var config = require('../../config').baseUrl;

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function () {
  var bowerCss = gulp.src([
    config.src + '/bower_modules/components-bootstrap/css/bootstrap.min.css',
    config.src + '/bower_modules/qtip2/jquery.qtip.min.css',
    config.src + '/bower_modules/bootstrap-dialog/dist/css/bootstrap-dialog.min.css',
    config.src + '/bower_modules/jcrop/css/jquery.Jcrop.min.css'
     ])
      .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src(config.src + '/css/*.css'),
        combinedCss = es.concat(bowerCss, appCss).pipe(concat('css.css')),
        fontFiles = gulp.src(config.src + '/bower_modules/components-bootstrap/fonts/*', { base: config.src + '/src/bower_modules/components-bootstrap/' });

  return es.concat(combinedCss, fontFiles)
      .pipe(gulp.dest(config.dest));
});