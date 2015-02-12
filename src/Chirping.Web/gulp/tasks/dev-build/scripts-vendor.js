var gulp = require('gulp');
var config = require('../../config').js.development;
var fs = require('fs');
var vm = require('vm');
var _ = require('underscore');
var extender = require('../../utils/underscore-extender');
var merge = require('deeply');

// get the requireJs configuration paths
var requireJsRuntimeConfig =
  vm.runInNewContext(fs.readFileSync('src/app/require.config.dev.js') + '; require;').paths;

// add additional paths to the requireJs config
requireJsRuntimeConfig = merge(requireJsRuntimeConfig, config.vendor.paths);

// get all the paths defined in the require.config.js file.
var paths = _.map(requireJsRuntimeConfig, function (path) {
  return {
    src: 'src/' + path + '.js',
    dest: config.dest + '/' + _.getPathWithoutFileName(path)
  };
});


gulp.task('copy:scripts:vendor', function () {

  // loop through each vendor path and copy it over to the build folder
  _.each(paths, function (path) {
    
    return gulp.src(path.src)
    .pipe(gulp.dest(path.dest));

  });
});