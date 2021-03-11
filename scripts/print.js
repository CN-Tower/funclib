const fn = require('funclib');
const path = require('path');
const pkg = require('../package.json');

const root = path.dirname(__dirname);
const indexJs = path.join(root, 'src/index.js');
const fnJs = path.join(root, 'src/funclib.js');
const fnMinJs = path.join(root, 'src/funclib.min.js');
const funclibMpJs = path.join(root, 'funclib-mp/index.js');

fn.log(
`  Funclib Version: v${pkg.version}
  
  funclib.js            ${fn.size(fnJs)} kb
  funclib.min.js        ${fn.size(fnMinJs)} kb
  index.js              ${fn.size(indexJs)} kb
  funclib-mp/index.js   ${fn.size(funclibMpJs)} kb`,
  'Build funclib Success!'
);