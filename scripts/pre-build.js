const fn = require('funclib');
const path = require('path');
const pkg = require('../src/package.json');

const root = path.dirname(__dirname);
const fnCore = path.join(root, 'src/funclib.core.js');
const fnJs = path.join(root, 'src/funclib.js');
const indexJs = path.join(root, 'src/index.js');

// 同步funclib.core.js为package.json中的版本号
let fnCoreStr = fn.rd(fnCore)
  .replace(/\* Funclib v\d*\.\d*\.\d*/, '* Funclib v' + pkg.version)
  .replace(/var version = '\d*\.\d*\.\d*';/, 'var version = \'' + pkg.version + '\';');
fn.wt(fnCore, fnCoreStr);

// 更新funclib.js和index.js中funclib.core.js的内容
const sp = '/**@spliter*/';

const _core = fnCoreStr.split(sp);
const _fnJs = fn.rd(fnJs).split(sp);
const _idxJs = fn.rd(indexJs).split(sp);

const newFnJs = _core[0] + sp + _fnJs[1] + sp + _core[1] + sp + _fnJs[3] + sp + _core[2] + _core[3].trim();
const newIndexJs = _core[0] + sp + _idxJs[1] + sp + _core[1] + sp + _idxJs[3] + sp + _core[2] + sp + _idxJs[5] + sp + _core[3];

fn.wt(fnJs, newFnJs);
fn.wt(indexJs, newIndexJs);