/**
 * 同步src下的函数注释到index.d.ts中
 */
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const { resolve } = require('./config');

// 非函数和不需要解析的函数
const excMtds = ['consts', 'index'];
// 获取去除排除项后的方法路径
const mtdPaths = glob
  .sync(resolve('src/*.js'))
  .filter(jsPath => excMtds.every(mtd => !path.basename(jsPath).includes(mtd)));
// index.d.ts的路径
const dtsPath = resolve('index.d.ts');
// index.d.ts的内容
let dtsTemp = fs.readFileSync(dtsPath, 'utf-8');

// 对每个需要替换注释的函数遍历
mtdPaths.forEach(mtdPath => {
  // 需要同步注释的函数名
  const method = path.parse(mtdPath).name;
  // 获取函数代码
  const mtdTpl = fs.readFileSync(mtdPath, 'utf-8');
  // 获取函数描述
  const mtdDesc = mtdTpl.match(/\/\*\*(?:\r|\n|\s)*\*\s?(.*)/) && RegExp.$1;
  // 获取函数注释
  const mtdDef = mtdTpl.match(/(\/\*\*(?:\r|\n|.)*?\s\*\/)/m) && RegExp.$1;
  // 获取原函数体
  const mtdFun = mtdTpl.match(new RegExp(`function\\s(${method}\\(.*?\\))\\s\\{`)) && RegExp.$1;
  // 拼接替换注释
  let mtdFmted = mtdDef.replace(/(?<=[\r\n])(\s*)(\*\/)/, `$1*\n$1* >_ ${mtdFun};\n$1$2`);
  // 获取替换位置的缩进
  const indent =
    dtsTemp.match(
      new RegExp(
        `(?<=[\r\n])(\\s*)\\/\\*\\*(?:(?<!\\*\\/)(?:\\r|\\n|.))*?\\*\\/(?=(?:\\r|\\n)*\\s*${method})`
      )
    ) && RegExp.$1;
  // 在拼接好的注释前加上缩进
  mtdFmted = mtdFmted.replace(/^(?!\/\*)(.*)/gm, `${indent}$1`);

  // 替换index.d.ts的函数描述和注释
  dtsTemp = dtsTemp
    // 替换描述
    .replace(new RegExp(`(?<=b\\.${method}\\(\\)\\s*\\/\\/).*`), ` ${mtdDesc}`)
    // 替换注释
    .replace(
      new RegExp(`\\/\\*\\*((?<!\\*\\/)(?:\\r|\\n|.))*?\\*\\/(?=(?:\\r|\\n)*\\s*${method})`),
      mtdFmted
    );
});

// 写入替换过的文件内容
fs.writeFileSync(dtsPath, dtsTemp);
