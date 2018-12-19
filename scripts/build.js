const fn = require('funclib');
const fs = require('fs');
const path = require('path');

const root = path.dirname(__dirname);
const rdm = path.join(root, 'README.md');
const rdmSrc = path.join(root, 'src/README.md');
const fnJs = path.join(root, 'src/funclib.js');
const fnMinJs = path.join(root, 'src/funclib.min.js');
const indexJs = path.join(root, 'src/index.js');

fn.progress.start('Building FuncLib', {width: 42});

fn.rm(rdmSrc)
fn.cp(rdm, rdmSrc);

const liscence = fn.rd(fnJs).split(/;\s?\(function\s?\(\)\s?\{/)[0];
const fnMinJsStr = fn.rd(fnMinJs);
fn.wt(fnMinJs, liscence + ';' + fnMinJsStr);

fn.progress.stop(() => fn.log(`\
funclib.js      ${getSize(fnJs)} kb
funclib.min.js  ${getSize(fnMinJs)} kb
index.js        ${getSize(indexJs)} kb`,
  'Build Success!'
));

function getSize(src) {
  return (fs.statSync(src)["size"] / 1024).toFixed(2)
}
