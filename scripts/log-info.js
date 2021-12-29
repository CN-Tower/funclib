const fs = require('fs');
const fn = require('funclib');
const pkg = require('../package.json');
const { bdInfoPath, resolve } = require('./config');

const banner = `\
  v${pkg.version}\
`;

/**
 * 打印构建信息
 */
fn.log(
  `
${fs.readFileSync(bdInfoPath, 'utf-8')}
${fn.chalk('dist/funclib.cjs.js', 'blue')} ${fn.size(resolve('dist/funclib.cjs.js'))}kb
${fn.chalk('dist/funclib.esm.js', 'blue')} ${fn.size(resolve('dist/funclib.esm.js'))}kb
${fn.chalk('dist/funclib.js', 'blue')} ${fn.size(resolve('dist/funclib.js'))}kb
${fn.chalk('dist/funclib.min.js', 'blue')} ${fn.size(resolve('dist/funclib.min.js'))}kb

${fn.chalk(`构建成功!`, 'green')}

${fn.chalk(banner, 'cyan')}
`,
  'funclib'
);
