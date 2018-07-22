const fn = require('funclib');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.conf');

const root = path.dirname(__dirname);
const fnJs = path.join(root, 'assets/funclib.js');
const fnMinJs = path.join(root, 'assets/funclib.min.js');
const rdmeDist = path.join(root, 'assets/README.md');
const rdmeSrc = path.join(root, 'README.md');

fn.progress.start({title: 'Building FunclibJs'});

[rdmeDist, fnJs, fnMinJs].forEach(f => fn.rm(f));
fn.cp(rdmeSrc, rdmeDist);

webpack(config.funclibJsConf, function (err, stats) {
  if (err) throw (err);
  fn.progress.stop(() => {
    buildFix();
    fn.log('', {part: 'pre'});
    process.stdout.write(stats.toString({
      colors: true, modules: false,
      children: false, chunks: false, chunkModules: false
    }) + '\n');
    fn.log('', {part: 'end'});
    buidFunclibJs();
  });
});

function buidFunclibJs() {
  fn.progress.start({title: 'Building FunclibMinJs', width: 37});
  webpack(config.funclibMinJsConf, function (err, stats) {
    if (err) throw (err);
    fn.progress.stop(() => {
      buildMinFix();
      fn.log('', {part: 'pre'});
      process.stdout.write(stats.toString({
        colors: true, modules: false,
        children: false, chunks: false, chunkModules: false
      }) + '\n');
      fn.log('', {part: 'end'});
    });
  });
}

function buildFix() {
  const newFnJs = fn.rd(fnJs)
    .replace(/factory\(\)/mg, 'new (factory().FuncLib)()')
    .replace(/define\(\[\], factory\)/, `define('fn', [], function() {return new (factory().FuncLib)()})`)
  fn.wt(fnJs, newFnJs);
}

function buildMinFix() {
  const funclibMin = fn.rd(fnMinJs);
  const factory = funclibMin.substr('!function('.length + 2, 1);
  const funclib = `new (${factory}().FuncLib)()`;
  const newFnMin = funclibMin
    .replace(new RegExp(`module\.exports=${factory}\\(\\)`), `module.exports=${funclib}`)
    .replace(new RegExp(`define\\(\\[\\],${factory}\\)`), `define('fn', [], function() {return ${funclib}})`)
    .replace(new RegExp(`\.fn=${factory}\\(\\)`, 'mg'), `.fn=${funclib}`);
  fn.wt(fnMinJs, newFnMin);
}
