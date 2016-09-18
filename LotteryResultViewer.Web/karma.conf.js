// Karma configuration
// Generated on Fri Sep 16 2016 07:49:54 GMT+1000 (E. Australia Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: ['jasmine'],
    

    // list of files / patterns to load in the browser
    files: [
      'public/vendors/scripts/jquery-1.9.1.min.js',
      'public/vendors/scripts/angular.js',
      'public/vendors/scripts/angular-mocks.js',
      'public/vendors/scripts/angular-animate.js',
      'public/vendors/scripts/angular-cookies.js',
      'public/vendors/scripts/angular-route.js',
      'public/vendors/scripts/angular-sanitize.js',
      'public/vendors/scripts/angular-toggle-switch.js',
      'public/vendors/scripts/bootstrap.min.js',
      'public/vendors/scripts/ui-bootstrap.min.js',
      'public/vendors/scripts/ui-bootstrap-tpls.min.js',
      'public/vendors/scripts/lodash.js',
      'public/vendors/scripts/angular-ui-grid/ui-grid.min.js',
      'public/application/templates/**/*.html',
      'public/application/scripts/**/*.js',
      'public/application/scripts/**/*spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'public/application/templates/**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
        moduleName: 'templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
