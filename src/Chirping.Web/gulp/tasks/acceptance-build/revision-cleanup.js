var gulp = require('gulp');
var del = require('del');
var manifestConfig = require('../../config').optimize.revision.manifest;
var _ = require('underscore');
var vinylPaths = require('vinyl-paths');

/*
  Clean up the revision files and the manifest
*/
gulp.task('revision:cleanup', function () {

  // location of the manifest file
  var manifestFile = require('../../../' + manifestConfig.path + '/' + manifestConfig.name);

  var sources = [];

  // read all old filename from manifest file and delete those files
  var paths = _.map(manifestFile, function (newFile, oldFile) {
    sources.push('./' + manifestConfig.path + '/' + oldFile);
  })

  // add the manifest file itself
  sources.push('./' + manifestConfig.path + '/' + manifestConfig.name);

  return gulp.src(sources)
    .pipe(vinylPaths(del));
  
});