// Node modules
var fs = require('fs');
var vm = require('vm');
var merge = require('deeply');

// Gulp and plugins
var gulp = require('gulp');
var rjs = require('gulp-requirejs-bundler');
var uglify = require('gulp-uglify');
var config = require('../../config').js;
var sourcemaps = require('gulp-sourcemaps');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
  out: 'scripts.js',
  baseUrl: config.src,
  name: 'app/startup',
  paths: {
    requireLib: 'bower_modules/requirejs/require'
  },
  include: [
      'requireLib',
      'components/intro-page/intro-page',
      'components/user-bar/user-bar',
      'components/login-bar/login-bar'
  ],
  insertRequire: ['app/startup'],
  bundles: {
    'registration-page': [
      'services/auth-service',
      'services/auth-storage',
      'services/chunked-uploader',
      'components/registration-page/registration-page',
      'components/registration-page/profile-image-upload/profile-image-upload',
      'components/registration-page/wizard-step1/wizard-step1',
      'components/registration-page/wizard-step2/wizard-step2',
      'components/registration-page/wizard-step3/wizard-step3'
    ],
    'auth-complete': ['authentication/auth-complete']
  }
});

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
  return rjs(requireJsOptimizerConfig)
    //.pipe(sourcemaps.init())
    .pipe(uglify({ preserveComments: 'some' }))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});