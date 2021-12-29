/**
 * Rollup构建b-utils组合包
 */
const nresolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const formatter = require('rollup-plugin-formatter');
const { terser } = require('rollup-plugin-terser');
const { getBanner, resolve } = require('./config');

/**
 * 获取rollup不同格式包的配置
 */
const getBundleConfig = (format, isMin = false) => {
  let fileName;
  switch (format) {
    case 'es':
      fileName = 'funclib.esm.js';
      break;
    case 'cjs':
      fileName = 'funclib.cjs.js';
      break;
    case 'umd':
      fileName = `funclib${isMin ? '.min' : ''}.js`;
      break;
  }
  return {
    input: resolve('src/index.js'),
    plugins: [
      nresolve(),
      commonjs(),
      babel({ exclude: 'node_modules/**' }),
      ...(isMin ? [terser()] : []),
      formatter(),
    ],
    external: [],
    output: {
      file: resolve(`dist/${fileName}`),
      format,
      name: 'b',
      exports: 'named',
      banner: getBanner(fileName),
      ...(isMin ? { sourcemap: true } : {}),
    },
    onwarn(warning, warn) {
      if (warning.code !== 'EVAL') warn(warning);
    },
  };
};

module.exports = [
  getBundleConfig('es'),
  getBundleConfig('cjs'),
  getBundleConfig('umd'),
  getBundleConfig('umd', true),
];
