// Karma configuration
// Generated on Mon Nov 20 2017 14:33:15 GMT+0800 (中国标准时间)

const fn = require('funclib');
let files, exclude, preprocessors, reporters;

fn.match(process.argv[4], {
  'fun': () => {
    files = [
      'src/funclib.js',
      'test/**/*.spec.js'
    ];
    exclude = ['test/server-methods/*.spec.js'];
    preprocessors = {};
    reporters = ['mocha'];
  },
  'min': () => {
    files = [
      'src/funclib.min.js',
      'test/**/*.spec.js'
    ];
    exclude = ['test/server-methods/*.spec.js'];
    preprocessors = {};
    reporters = ['mocha'];
  },
  'core': () => {
    files = [
      'src/funclib.core.js',
      'test/**/*.spec.js'
    ];
    exclude = [
      'test/client-methods/*.spec.js',
      'test/server-methods/*.spec.js'
    ];
    preprocessors = {
      'src/funclib.core.js': 'coverage'
    };
    reporters = ['mocha', 'coverage'];
  },
});

module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'power-assert'],
    files: files,
    exclude: exclude,
    preprocessors: preprocessors,
    reporters: reporters,
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      }
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    concurrency: Infinity
  })
}
