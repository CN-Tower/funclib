const fn = require('funclib');
const path = require('path');
const pkg = require('../src/package.json');

const root = path.dirname(__dirname);
const rdm = path.join(root, 'README.md');
const rdmSrc = path.join(root, 'src/README.md');
const fnJs = path.join(root, 'src/funclib.js');
const fnDefTs = path.join(root, 'src/index.d.ts');
const fnMinJs = path.join(root, 'src/funclib.min.js');
const indexJs = path.join(root, 'src/index.js');

fn.progress('Building FuncLib', {width: 42});
fn.rm(rdmSrc)
fn.cp(rdm, rdmSrc);

// 给funclib.d.ts和funclib.min.js增加licence信息
const liscence = fn.rd(fnJs).split('; (function () {')[0];
const fnDefTsStr = fn.rd(fnDefTs);
const fnMinJsStr = fn.rd(fnMinJs);
const spliter = '/**================================================================';
fn.wt(fnDefTs, liscence + spliter + fnDefTsStr.split(spliter)[1]);
fn.wt(fnMinJs, liscence + ';' + fnMinJsStr);

// 打印构建信息
fn.progress.stop(() => fn.log(`
Funclib Version: v${pkg.version}

funclib.js      ${fn.size(fnJs)} kb
funclib.min.js  ${fn.size(fnMinJs)} kb
index.js        ${fn.size(indexJs)} kb`, 'Build Success!'
));
