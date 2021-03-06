﻿var gulp = require('gulp');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var config = require('../../config').optimize.js;
var preprocess = require('gulp-preprocess');

/* Copy and minimize JS files */
gulp.task('optimize:js:production', function () {
  return gulp.src(config.src)
    .pipe(preprocess({ context: { NODE_ENV: 'production' } }))
    .pipe(uglify(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});