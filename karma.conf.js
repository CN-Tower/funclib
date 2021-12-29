const fs = require('fs');
const path = require('path');
const isSingle = process.argv[3] === '-s';
const testTarget = process.env.TEST_TARGET;

// 根据测试目标动态设置entry.js
const indexPath = path.resolve('test/index.js');
const entryPath = path.resolve('test/entry.js');
const indexTpls = {
  test: `export default butils;`,
  src: `import butils from '../src';`,
  es: `import butils from '../es';`,
  lib: `import butils from '../lib';`,
  dist: `import butils from '../dist/funclib';`,
}
const entryTpls = {
  test: `const tests = require.context('./', true, /\.spec\.js?$/);\ntests.keys().forEach(tests);`,
  src: `const sourceSrc = require.context('../src/', true, /\.js?$/);\nsourceSrc.keys().forEach(sourceSrc);`,
  es: `const sourceEs = require.context('../es/', true, /\.js?$/);\nsourceEs.keys().forEach(sourceEs);`,
  lib: `const sourceLib = require.context('../lib/', true, /\.js?$/);\nsourceLib.keys().forEach(sourceLib);`,
  dist: `const sourceDist = require.context('../dist/', true, /\.js?$/);\nsourceDist.keys().forEach(sourceDist);`,
};
fs.writeFileSync(indexPath, `${indexTpls[testTarget]}\n\n${indexTpls['test']}\n`);
fs.writeFileSync(entryPath, `${entryTpls['test']}\n\n${entryTpls[testTarget]}\n`);

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // 传入到case中的参数
    client: {
      args: [testTarget],
    },

    // 使用webpack处理，则不需要karma匹配文件，只留一个入口给karma
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },

    // webpack配置
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        ],
      },
    },

    // 生成coverage覆盖率报告
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage/%browser%/'),
      fixWebpackSourcePaths: true,
      'report-config': { html: { outdir: 'html' } },
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['mocha', 'chai', 'karma-typescript'],
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: ['test/entry.js', `${testTarget}/**/*.js`],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      ['test/entry.js']: ['webpack'],
      [`${testTarget}/**/*.js`]: ['webpack', 'coverage'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'nyan', 'coverage-istanbul', 'coverage'],

    // reporter options
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed',
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x',
      },
    },

    // 配置覆盖率报告的查看方式,type查看类型，可取值html、text等等，dir输出目录
    coverageReporter: {
      type: 'lcovonly',
      dir: 'coverage/',
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
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: isSingle,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
