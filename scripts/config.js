const fn = require('funclib');
const path = require('path');
const pkg = require('../package.json');

/**
 * 路径解析
 */
const resolve = (...p) => path.resolve(__dirname, '../', ...p);

/**
 * 文件头注释
 */
const getBanner = fileName => `\
/*!
 * funclib (v${pkg.version})
 * @file: ${fileName}
 * funclib is a practical and powerful JavaScript library
 */`;

/**
 * 根据字符判断文件大小
 */
const getFileSizeByCode = code => `${(code.length / 1024).toFixed(2)}kb`;

/**
 * 打印错误信息
 */
const loggerError = err => {
  let errMessage = '';
  if (typeof err === 'string') {
    errMessage = err;
  } else if (err && err.message) {
    errMessage = err.message;
  }
  if (errMessage) {
    console.log(fn.chalk(errMessage, 'red'));
  }
};

/**
 * 构建信息暂存文件
 */
bdInfoPath = resolve('node_modules/.temp/build-info.txt');

module.exports = {
  getBanner,
  resolve,
  getFileSizeByCode,
  loggerError,
  bdInfoPath,
};
