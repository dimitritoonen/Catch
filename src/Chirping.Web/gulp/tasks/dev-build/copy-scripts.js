var gulp = require('gulp');
var config = require('../../config').js.development;
var preprocess = require('gulp-preprocess');

// copies over the individual js files so it's faster for development
gulp.task('copy:scripts', function () {

  return gulp.src(config.src, { 'base': 'src/.' })
    .pipe(preprocess({ context: { NODE_ENV: 'development' } })) 
    .pipe(gulp.dest(config.dest));

});