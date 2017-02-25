module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/**/*.js',
      'app/**/*.jsx',
      'spec/**/*spec.js',
      'spec/**/*spec.jsx'
    ],


    // list of files to exclude
    exclude: [
    ],
    browserify: {
      debug: false,
      extensions: ['.js', '.jsx'],
      transform: ['babelify',
        ['browserify-istanbul',
          {
            ignore: ['**/spec/**'],
            instrumenterConfig: {
              embedSource: true   // this is important for HTML reports
            }
          }
        ]
      ]
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': ['browserify','babel'],
      'app/**/*.jsx': ['browserify','babel'],
      'spec/**/*.jsx': ['browserify','babel'],
      'spec/**/*.js': ['browserify','babel'],

    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      instrumenterOptions: {
        istanbul: { noCompact: true }
      },
      reporters: [
        {
          type: 'text-summary'
        },
        {
          type: 'html',
          dir: 'coverage/'
        }
      ]},
    babelPreprocessor: {
      options: {
        presets: ['es2015', 'react', 'stage-2'],
      }
    },

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
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
