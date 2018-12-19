const fn = require('funclib');
const path = require('path');

const root = path.dirname(__dirname);
const fnCore = path.join(root, 'src/funclib.core.js');
const fnJs = path.join(root, 'src/funclib.js');
const indexJs = path.join(root, 'src/index.js');

const sp = '/**@spliter*/';
const _core = fn.rd(fnCore).split(sp);
const _fnJs = fn.rd(fnJs).split(sp);
const _idxJs = fn.rd(indexJs).split(sp);
const newFnJs = _core[0] + sp + _fnJs[1] + sp + _core[1] + sp + _fnJs[3] + sp + _core[2] + _core[3].trim();
const newIndexJs = _core[0] + sp + _idxJs[1] + sp + _core[1] + sp + _idxJs[3] + sp + _core[2] + sp + _idxJs[5] + sp + _core[3];
fn.wt(fnJs, newFnJs);
fn.wt(indexJs, newIndexJs);