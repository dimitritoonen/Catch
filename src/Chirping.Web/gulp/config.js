var src = 'src';
var dest = 'build'
var development = 'build/development';
var production = 'build/production';

module.exports = {
  browsersync: {
    development: {
      server: {
        baseDir: [dest]
      },
      port: 8080,
      files: [
        dest + '/**'
      ]
    }
  },
  del: {
    dest: dest
  },
  sass: {
    src: [src + '/bower_modules/bootstrap-sass-official/assets/stylesheets/**/*.{sass,scss}',
    src + '/sass/**/*.{sass,scss}'],
    dest: dest + '/css',
    options: {
      noCache: true,
      compass: false,
      bundleExec: false,
      sourcemap: false
      //sourcemapPath: '/sass'
    }
  },
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: true
  },
  baseUrl: {
    dest: dest,
    src: src
  },
  js: {
    src: src,
    dest: dest
  },
  images: {
    src: src + '/images/**/*',
    dest: dest + '/images/'
  },
  fonts: {
    development: {
      src: src + '/bower_modules/bootstrap/fonts/*',
      dest: dest + '/fonts'
    }
  }
};