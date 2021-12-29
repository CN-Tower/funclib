/**
 * 同步package.json中的版本号到src/version.js中
 */
const fs = require('fs');
const pkg = require('../package.json');
const { resolve } = require('./config');

const versionJsPath = resolve('src/version.js');
fs.writeFileSync(
  versionJsPath,
  fs
    .readFileSync(versionJsPath, 'utf-8')
    .replace(/version\s?=\s?'\d{1,3}\.\d{1,3}\.\d{1,3}'/, `version = '${pkg.version}'`)
);
