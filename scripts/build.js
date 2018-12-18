const fn = require('funclib');
const fs = require('fs');
const path = require('path');


const root = path.dirname(__dirname);

const rdmeDist = path.join(root, 'assets/README.md');
const fnDist = path.join(root, 'assets/funclib.js');
const fnMinDist = path.join(root, 'assets/funclib.min.js');
const idxDist = path.join(root, 'assets/index.js');

const rdmeSrc = path.join(root, 'README.md');
const fnSrc = path.join(root, 'src/funclib.js');
const fnMinSrc = path.join(root, 'src/funclib.min.js');
const idxSrc = path.join(root, 'src/index.js');

fn.progress.start('Building FuncLib', {width: 42});

[rdmeDist, fnDist, fnMinDist, idxDist].forEach(fl => fn.rm(fl));
fn.cp(rdmeSrc, rdmeDist);
fn.cp(fnSrc, fnDist);
fn.cp(idxSrc, idxDist);
fn.mv(fnMinSrc, fnMinDist);
const liscence = fn.rd(fnSrc).split(/;\s?\(function\s?\(\)\s?\{/)[0];
const fnMinDistStr = fn.rd(fnMinDist);
fn.wt(fnMinDist, liscence + ';' + fnMinDistStr);

fn.progress.stop(() => fn.log(`\
funclib.js      ${getFilesizeInBytes(fnDist)} kb
funclib.min.js  ${getFilesizeInBytes(fnMinDist)} kb
index.js        ${getFilesizeInBytes(idxDist)} kb`,
  'Build Success!'
));

function getFilesizeInBytes(src, digit) {
  if (digit === void 0) { digit = 2; }
  return (fs.statSync(src)["size"] / 1024).toFixed(2)
}
