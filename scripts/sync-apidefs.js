/**
 * 设置index.d.ts并同步接口列表(api-list)和接口定义(ap-defs)到README
 */
const fs = require('fs');
const { resolve, getBanner } = require('./config');

const dtsPath = resolve('index.d.ts');
const rdmPath = resolve('README.md');
const dtsTemp = fs.readFileSync(dtsPath, 'utf-8');

// 设置index.d.ts中banner的版本号
fs.writeFileSync(dtsPath, dtsTemp.replace(/\/\*\!(\r|\n|.)*?\*\//gm, getBanner('index.d.ts')));

fs.writeFileSync(
  rdmPath,
  fs
    .readFileSync(rdmPath, 'utf-8')
    // 同步index.d.ts接口列表到README中
    .replace(
      /(?<=\/\*.*?api-list.*?\*\/)((\r|\n|.)*?)(?=\/\*.*?api-list.*?\*\/)/,
      /\/\*\sapi-list\s==((?:\r|\n|.)*?)==\sapi-list\s\*\//gm.test(dtsTemp) && RegExp.$1
    )
    // 同步index.d.ts接口定义到README中
    .replace(
      /(?<=\/\*\sapi-defs\s\*\/)((\r|\n|.)*?)(?=\/\*\sapi-defs\s\*\/)/,
      /\/\*\sapi-defs\s\*\/((?:\r|\n|.)*?)\/\*\sapi-defs\s\*\//gm.test(dtsTemp) && RegExp.$1
    )
);
