const fn = require('funclib');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.conf');
const funclibMinJs = path.resolve(__dirname, '../', 'dist', 'funclib.min.js');

fn.rm(funclibMinJs);
fn.progress.start({title: 'Compiling Funclib', width: 41});
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
  const funclibMin = fn.rd(funclibMinJs);
  const idx = '!function('.length;
  const rt = funclibMin.substr(idx, 1);
  const ft = funclibMin.substr(idx + 2, 1);
  const it = `new (${ft}().Funclib)(${rt})`;
  const newFunclibMin = funclibMin
    .replace(new RegExp(`module\.exports=${ft}\\(\\)`), `module.exports=${it}`)
    .replace(new RegExp(`define\\(\\[\\],${ft}\\)`), `define([${rt}], function(${rt}) {${it}})`)
    .replace(new RegExp(`\.fn=${ft}\\(\\)`, 'mg'), `.fn=${it}`);
  fn.wt(funclibMinJs, newFunclibMin);
}
