module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ["jasmine"],
    preprocessors: {
      'dist/**/*.js': ['coverage']
    },
    files: [
      './node_modules/angular/angular.min.js',
      './node_modules/angular-mocks/angular-mocks.js',
      'dist/**/*.js',
      'spec/**/*.js'
    ],
    exclude: [], // list of files to exclude
    reporters: ['progress', 'junit', 'coverage'],
    junitReporter: {
      outputFile: 'test-reports/test-results.xml'
    },
    coverageReporter: {
      reporters: [
        {
          type: 'html',
          dir: 'coverage/html/',
          watermarks: {
            statements: [ 25, 75 ],
            functions: [ 25, 75 ],
            branches: [ 25, 75 ],
            lines: [ 25, 75 ]
          }
        },
        {type: 'clover', dir: 'coverage/clover/'},
        {type: 'text', dir: 'coverage/text/', file: 'coverage.txt'},
        {type: 'text-summary', dir: 'coverage/text/', file: 'coverage-summary.txt'}
      ]
    },
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 5000,
    singleRun: true
  });
};