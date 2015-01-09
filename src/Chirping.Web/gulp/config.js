var src = 'src';
var dest = 'build'
var development = 'build/development';
var production = 'build/publish';

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

  less: {
    development: {
      src: [
          src + '/less/**/*.less'
      ],
      dest: dest + '/css'
    },
    optimized: {
      src: [
          '!' + src + '/less/vendor/bootstrap.less',
          src + '/less/**/*.less'
      ],
      dest: dest + '/css',
      vendor: {
        src: src + '/less/vendor/bootstrap.less',
        dest: dest + '/css'
      }
    }
  },

  css: {
    src: [
      src + '/bower_modules/qtip2/jquery.qtip.min.css'
      ]
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
      src: dest + '/*.html',
      dest: production      
    }
  },
  baseUrl: {
    dest: dest,
    src: src
  },
  js: {
    src: src,
    dest: dest,
    development: {
      vendor: {
        paths: {
          'require-js': 'bower_modules/requirejs/require'
        }
      },

      src: [
        '!' + src + '/bower_modules/**/*.js',
        src + '/**/*.js'
      ],
      dest: dest
    }
  },
  components: {
    src: src + '/components/**/*.html',
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
    },
    production: {
      src: dest + '/fonts/bootstrap/*',
      dest: production + '/fonts/bootstrap'
    }
  },
  webConfig: {
    src: src + '/Web.config',
    dest: production
  },

  // specifies the which files trigger the watch mechanism
  watch: {
    less: [
      //'!' + src + '/less/vendor/bootstrap.less',
      src + '/less/**/*.less'
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
  recess: {
    src: [
      src + '/less/**/*.less',
      '!' + src + '/less/vendor/bootstrap.less'
    ],
    options: {
      noIDs: false
    }
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
      src: [dest + '/css/styles.css',
        dest + '/css/vendor-styles.css'
      ],
      dest: production + '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    js: {
      src: dest + '/*.js',
      dest: production,
      options: {
        keepSpecialComments: 0
      },

      // Contains the configuration for the requireJs optimalization tool. 
      // This bit defines which bundles are created and how compile the require modules.
      requireJs: {
        out: 'scripts.js',
        baseUrl: src,
        name: 'app/startup',
        paths: {
          requireLib: 'bower_modules/requirejs/require'
        },
        include: [
            'requireLib',
            'pages/intro-page/intro-page',
            'components/user-bar/user-bar',
            'components/login-bar/login-bar'
        ],
        insertRequire: ['app/startup'],
        bundles: {
          'register-container': [
            'components/register-container/register-container',
            'components/login-bar/login-bar',
            'components/forgot-password/forgot-password'
          ],
          'registration-page': [
            'services/auth-service',
            'services/auth-storage',
            'services/chunked-uploader',
            'components/registration-bar/registration-bar',
            'components/registration-bar/profile-image-upload/profile-image-upload',
            'components/registration-bar/wizard-step1/wizard-step1',
            'components/registration-bar/wizard-step2/wizard-step2',
            'components/registration-bar/wizard-step3/wizard-step3'
          ],
          'auth-complete': ['authentication/auth-complete']
        }
      }
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