var gulp = require('gulp');
var del = require('del');
var config = require('../../config').del;

// delete folders and files
gulp.task('delete', function (callback) {
  del(config.dest, callback);
});