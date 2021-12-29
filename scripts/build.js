/**
 * 使用Rollup打包b-utils单函数
 */
const fs = require('fs');
const fn = require('funclib');
const path = require('path');
const glob = require('glob');
const nresolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const formatter = require('rollup-plugin-formatter');
const { rollup } = require('rollup');
const { resolve, getFileSizeByCode, loggerError, bdInfoPath } = require('./config_');

console.log(fn.chalk('开始构建单函数...'));

const dests = { es: 'es', cjs: 'lib' };
const esPath = resolve('es');
const libPath = resolve('lib');
if (!fs.existsSync(esPath)) fs.mkdirSync(esPath);
if (!fs.existsSync(libPath)) fs.mkdirSync(libPath);
const srcTsList = glob.sync(resolve('src/*.ts'));
const srcJsList = glob.sync(resolve('src/*.js'));
let buildInfo = '';

/**
 * 执行单函数构建
 */
(async () => {
  // 复制src下的*.d.ts到es和lib目录下
  srcTsList.forEach(tsPath => {
    fs.copyFileSync(tsPath, resolve('es', path.basename(tsPath)));
    fs.copyFileSync(tsPath, resolve('lib', path.basename(tsPath)));
  });
  // 构建单函数
  await Promise.all(
    srcJsList.map(async jsPath => {
      try {
        await buildSingleFunByRollup(jsPath, 'es');
        await buildSingleFunByRollup(jsPath, 'cjs');
      } catch (err) {
        loggerError(err);
      }
      return;
    })
  );
  const bdInfoDir = path.dirname(bdInfoPath);
  if (!fs.existsSync(bdInfoDir)) {
    fs.mkdirSync(bdInfoDir, { recursive: true });
  }
  fs.writeFileSync(bdInfoPath, buildInfo);
  console.log(fn.chalk('单函数构建完成！', 'green'));
})();

/**
 * 使用rollup构建单函数
 */
async function buildSingleFunByRollup(jsPath, format) {
  const jsName = path.basename(jsPath);
  const file = resolve(dests[format], jsName);
  const rollupConfig = {
    input: jsPath,
    plugins: [nresolve(), commonjs(), babel(), formatter()],
    external: ['./_shared', './consts', ...new Set(srcJsList.map(p => `./${path.parse(p).name}`))],
    output: {
      file,
      format,
      exports: jsName === 'index.js' ? 'named' : 'auto',
    },
    onwarn(warning, warn) {
      if (warning.code !== 'EVAL') warn(warning);
    },
  };
  const bundle = await rollup(rollupConfig);
  const {
    output: [{ code }],
  } = await bundle.generate(rollupConfig.output);
  try {
    fs.writeFileSync(file, code);
    buildInfo += `${fn.chalk(path.relative(process.cwd(), file), 'blue')} ${getFileSizeByCode(code)}\n`;
    buildSingleFunctionDts(jsPath, dests[format]);
  } catch (err) {
    loggerError(err);
  }
  return;
}

/**
 * 生成单函数的ts类型定义
 */
function buildSingleFunctionDts(jsPath, dest) {
  const excludes = ['_shared', 'consts', 'index'];
  const fnName = path.parse(jsPath).name;
  if (fnName && !excludes.includes(fnName)) {
    const dtsPath = resolve(`${dest}/${fnName}.d.ts`);
    fs.writeFileSync(
      dtsPath,
      `\
import { ${fnName} } from '../';
export = ${fnName};
`
    );
  }
}
