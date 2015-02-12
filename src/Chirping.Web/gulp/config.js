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
          '!' + src + '/less/vendor/metro-bootstrap.less', // compiled manually and added the css class
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
        src + '/bower_modules/qtip2/jquery.qtip.min.css',
        src + '/bower_modules/font-awesome/css/font-awesome.min.css',
        src + '/bower_modules/jcrop/css/jquery.Jcrop.min.css',
        src + '/bower_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
        src + '/bower_modules/metro-ui-css/min/metro-slider.min.css'
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
      src: [
        '!' + src + '/authentication/*.html',
        src + '/**/*.html',
      ],
      dest: dest
    },
    optimized: {
      src: [
        src + '/*.html',
        src + '/authentication/*.html'
      ],
      dest: dest
    },
    production: {
      src: dest + '/*.html',
      dest: production      
    }
  },
  auth: {
    src: src + '/authentication/*',
    dest: dest
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
        '!' + src + '/authentication/*.js',
        src + '/**/*.js'
      ],
      dest: dest
    }
  },
  modernizr: {
    development: {
      src: src + '/bower_modules/modernizr/modernizr.js',
      dest: dest
    },
    production: {
      src: [
        '!' + src + '/bower_modules/**/*.js',
        src + '/**/*.js'
      ],
      dest: dest + '/modernizr.js'
    }
  },
  components: {
    src: src + '/components/**/*.html',
    dest: dest
  },
  images: {
    src: [
      src + '/images/**/*.{jpg,jpeg,png,gif}',
      src + '/bower_modules/jcrop/css/*'
      ],
    dest: dest + '/images/'
  },
  svgmin: {
    src: [
      '!' + src + '/bower_modules/**/*.svg',
      src + '/images/**/*.svg'
    ],
    dest: dest + '/images/'
  },
  fonts: {
    development: {
      src: [
        src + '/bower_modules/bootstrap/fonts/*',
        src + '/bower_modules/font-awesome/fonts/*',
        src + '/fonts/*'
      ],
      dest: dest + '/fonts'
    },
    production: {
      src: dest + '/fonts/*',
      dest: production + '/fonts/'
    }
  },
  webConfig: {
    src: src + '/Web.config',
    dest: production
  },

  // specifies the which files trigger the watch mechanism
  watch: {
    less: [
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
      '!' + src + '/less/vendor/bootstrap.less',
      '!' + src + '/less/vendor/metro-bootstrap.less',
      '!' + src + '/less/variables.less',
      src + '/less/**/*.less'
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
            'components/intro-page/login-bar/login-bar',
            'components/intro-page/component-container/component-container',
            'components/intro-page/component-container/error-box/error-box',
            'components/intro-page/forgot-password/forgot-password',
            'components/intro-page/forgot-password/reset-password-sent/reset-password-sent'
        ],
        insertRequire: ['app/startup'],
        bundles: {
          'account-activated': [
            'components/intro-page/activate-account/activate-account',
            'components/intro-page/activate-account/account-activated/account-activated'
          ],
          'change-password': [
          'components/intro-page/change-password/change-password',
          'components/intro-page/change-password/password-changed/password-changed'
          ],
          'registration-page': [
            'services/auth-service',
            'services/auth-storage',
            'services/chunked-uploader',
            'components/intro-page/registration-bar/registration-bar',
            'components/intro-page/registration-bar/profile-image-upload/profile-image-upload',
            'components/intro-page/registration-bar/wizard-step1/wizard-step1',
            'components/intro-page/registration-bar/wizard-step2/wizard-step2',
            'components/intro-page/registration-bar/wizard-step3/wizard-step3'
          ],
          'auth-complete': [
            'authentication/auth-complete'
          ],
          'workspace-page': [
            'pages/workspace-page/workspace-page',
            'components/workspace-page/nav-bar/nav-bar',
            'components/workspace-page/workspace-component-left/profile-bar/profile-bar',
            'components/workspace-page/workspace-component-left/workspace-component-left',
            'components/workspace-page/workspace-component-right/workspace-component-right',
            'components/workspace-page/workspace-component-main/workspace-component-main',
          ],
          'dashboard-page' : [
            'pages/workspace-page/dashboard-page/dashboard-page',
            'components/workspace-page/dashboard-page/interesting-activities/interesting-activities',
            'components/workspace-page/dashboard-page/activity-thumb/activity-thumb'
          ],
          'activities-page': [
            'pages/workspace-page/activities-page/activities-page',
            'components/workspace-page/activity-page/activity-filter/activity-filter',
            'components/workspace-page/activity-page/activity-filter/activity-filter-dropdown/activity-filter-dropdown',
            'components/workspace-page/activity-page/activity-listitem/activity-listitem',
            'components/workspace-page/activity-page/activity-list/activity-list',
            'components/workspace-page/activity-page/activity-add/activity-add',
            'components/workspace-page/activity-page/activity-filter/activity-filter-slider/activity-filter-slider'
          ],
          'notifications-page': [
            'pages/workspace-page/notifications-page/notifications-page'
          ],
          'contacts-page': [
            'pages/workspace-page/contacts-page/contacts-page'
          ],
          'profile-page': [
            'pages/workspace-page/profile-page/profile-page'
          ]
        }
      }
    },
    images: {
      src: dest + '/images/**/*.{jpg,jpeg,png,gif,svg}',
      dest: production + '/images',
      options: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }
    },
    revision: {
      src: [
        production + '/**/*.css',
        production + '/**/*.js',
        production + '/images/**/*'
      ],
      dest: production,
      manifest: {
        name: 'manifest.json',
        path: production
      }
    },
    revisionCollect: {
      src: [
        '!' + production + '/feed.xml',
        production + '/manifest.json',
        production + '/**/*.{html,xml,txt,json,css,js}'
      ],
      dest: production
    }
  }
};