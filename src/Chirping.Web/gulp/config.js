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
    },
    production: {
      server: {
        baseDir: [production]
      },
      port: 9998,
      files: [
        production + '/**'
      ]
    }
  },
  del: {
    dest: dest
  },
  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/css',
    options: {
      loadPath: [
      './src/bower_modules/bootstrap-sass-official/assets/stylesheets'
      ],
      noCache: true,
      compass: false,
      bundleExec: false,
      sourcemap: false
      //sourcemapPath: src + '/sass'
    }
  },
  css: {
    src: src + '/bower_modules/qtip2/jquery.qtip.min.css'
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
  html: {
    development: {
      src: src,
      dest: dest
    },
    production: {
      src: src,
      dest: production      
    }
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
      dest: dest + '/fonts/bootstrap'
    },
    production: {
      src: dest + '/fonts/bootstrap/*',
      dest: production + '/fonts/bootstrap'
    }
  },
  watch: {
    sass: [
      //src + '/sass/**/*.{sass,scss}',
      src + '/sass/styles.scss'
    ],
    scripts: src + '/**/*.js',
    images: src + '/images/**/*',
    html: src + '/**/*.html'
  },
  base64: {
    src: dest + '/css/*.css',
    dest: dest + '/css',
    options: {
      baseDir: dest,
      extensions: ['png'],
      maxImageSize: 20 * 1024, // bytes
      debug: false
    }
  },
  scsslint: {
    src: [
      src + '/sass/**/*.{sass,scss}',
      '!' + src + '/sass/import-vendors.scss'
    ]
  },
  jshint: {
    src: [
      src + '/components/**/*.js',
      src + '/authentication/**/*.js',
      src + '/app/**/*.js',
      src + '/services/**/*.js'
      ]
  },

  /* building, optimization, and add revision for the production build */
  optimize: {
    css: {
      src: dest + '/css/*.css',
      dest: production + '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    js: {
      src: dest + '/*.js',
      dest: production,
      options: {}
    },
    images: {
      src: dest + '/images/**/*.{jpg,jpeg,png,gif}',
      dest: production + '/images',
      options: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }
    },
    revision: {
      src: {
        base: production
      },
      dest: {
        dest: production,
        manifest: {
          name: 'manifest.json',
          path: production
        }
      }
    }
  }
};