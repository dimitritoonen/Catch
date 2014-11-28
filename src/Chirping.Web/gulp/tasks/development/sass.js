var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var config = require('../../config');

gulp.task('sass', function () {
  var sassConfig = config.sass.options;

  return gulp.src(config.sass.src)
  .pipe(sass(sassConfig))
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest(config.sass.dest));
});
