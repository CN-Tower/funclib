const fn = require('funclib');
const path = require('path');
const pkg = require('../src/package.json');
const { ALL_MODULES, CORE_IGNORE, CLIENT_IGNORE, SERVER_IGNORE } = require('./config');

const rootPath = path.dirname(__dirname);
const confPath = path.join(rootPath, 'src/_config.js');
const coreJsPath = path.join(rootPath, 'src/funclib.core.js');
const clientJsPath = path.join(rootPath, 'src/funclib.js');
const serverJsPath = path.join(rootPath, 'src/index.js');

const configStr =  fn.rd(confPath)
  .replace(/var version = '\d*\.\d*\.\d*';/, 'var version = \'' + pkg.version + '\';');
fn.wt(confPath, configStr);

const confStr = configStr.split('/**@config*/')[1];
const newLine = '\r\n\r\n';
const ptn4ClientConf = /[\r\n]?\/\*\*\@conf\-client\*\/((.|\r|\n)*)\/\*\*\@conf\-client\*\/[\r\n]?/;
const ptn4ServerConf = /[\r\n]{0,2}\/\*\*\@conf\-server\*\/((.|\r|\n)*)\/\*\*\@conf\-server\*\/[\r\n]?/;

asyncMethodToJs(coreJsPath, 'core');
asyncMethodToJs(clientJsPath, 'client');
asyncMethodToJs(serverJsPath, 'server');

/**
 * Sync methods to js file.
 */
function asyncMethodToJs(jsPath, type_) {
  let jsConf
    , modules
    , tempStr = '';
    
  switch (type_) {
    case 'core':
      jsConf = confStr.replace(ptn4ClientConf, '').replace(ptn4ServerConf, '');
      modules = ALL_MODULES.filter(md => !CORE_IGNORE.includes(md));
      break;
    case 'client':
      ptn4ClientConf.test(confStr);
      const clientConf = trimJsStr(RegExp.$1, '');
      jsConf = confStr.replace(ptn4ClientConf, clientConf).replace(ptn4ServerConf, '');
      modules = ALL_MODULES.filter(md => !CLIENT_IGNORE.includes(md));
      break;
    case 'server':
      ptn4ServerConf.test(confStr);
      const serverConf = trimJsStr(RegExp.$1, '');
      jsConf = confStr.replace(ptn4ClientConf, '').replace(ptn4ServerConf, serverConf);
      modules = ALL_MODULES.filter(md => !SERVER_IGNORE.includes(md));
      break;
  }
  jsConf = `; (function () {${newLine}${trimJsStr(jsConf)}\r\n  /**\r\n   * Funclib definition closure.\r\n   */\r\n  var fn = (function () {`;

  modules.forEach(md => {
    const mdPath = path.join(rootPath, `src/${md}.js`);
    tempStr += trimJsStr(fn.rd(mdPath).split('/**@function*/')[1], '    ');
  });
  tempStr = `var fn = (function () {${newLine}${tempStr}    /**@funclib`;

  jsStr = fn.rd(jsPath)
    .replace(/\;\s\(function\s\(\)\s\{(.|\r|\n)*var\sfn\s=\s\(function\s\(\)\s\{/, jsConf)
    .replace(/var\sfn\s=\s\(function\s\(\)\s\{(.|\r|\n)*\/\*\*\@funclib/, () => tempStr)
    .replace(/\* Funclib v\d*\.\d*\.\d*/, '* Funclib v' + pkg.version);

  fn.wt(jsPath, jsStr);
}

/**
 * Trim string's header and footer.
 */
function trimJsStr(str, indent = '  ') {
  return str.replace(/(\r\n|\r|\n)/mg, `\r\n${indent}`).replace(/^(\s|\r|\n)*/, indent).replace(/(\s|\r|\n)*$/, newLine);
}