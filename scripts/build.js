const fn = require('funclib');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.conf');

const root = path.dirname(__dirname);
const fnMinJs = path.join(root, 'dist/funclib.min.js');
const DtsDist = path.join(root, 'dist/funclib.d.ts');
const indexDist = path.join(root, 'dist/index.js');
const pkgDist = path.join(root, 'dist/package.json');
const rdmeDist = path.join(root, 'dist/README.md');
const DtsSrc = path.join(root, 'src/assets/funclib.d.ts');
const indexSrc = path.join(root, 'src/assets/index.js');
const pkgSrc = path.join(root, 'src/assets/package.json');
const rdmeSrc = path.join(root, 'README.md');

fn.progress.start({title: 'Compiling Funclib', width: 41});

const srcs = [DtsSrc, indexSrc, pkgSrc, rdmeSrc];
const dists = [DtsDist, indexDist, pkgDist, rdmeDist, fnMinJs];
dists.forEach(f => fn.rm(f));
srcs.forEach((f, i) => fn.cp(f, dists[i]));

webpack(config, function (err, stats) {
  if (err) throw (err);
  fn.progress.stop(() => {
    buildFix();
    fn.log('', {part: 'pre'});
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');
    fn.log('', {part: 'end'});
  });
});

function buildFix() {
  const funclibMin = fn.rd(fnMinJs);
  const factory = funclibMin.substr('!function('.length + 2, 1);
  const funclib = `new (${factory}().FuncLib)()`;
  const newFnMin = funclibMin
    .replace(new RegExp(`module\.exports=${factory}\\(\\)`), `module.exports=${funclib}`)
    .replace(new RegExp(`define\\(\\[\\],${factory}\\)`), `define('fn', [], function() {return ${funclib}})`)
    .replace(new RegExp(`\.fn=${factory}\\(\\)`, 'mg'), `.fn=${funclib}`);
  fn.wt(fnMinJs, newFnMin);
}
