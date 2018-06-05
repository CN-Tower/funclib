const fn = require('funclib');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.conf');
const funclibMinJs = path.resolve(__dirname, '../', 'dist', 'funclib.min.js');

fn.initTools(require, global);
fn.initProgress(require);
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
  const funclibMin = fn.rd(funclibMinJs)
    .replace(/module\.exports=e\(\)/, 'module.exports=new (e().Funclib)(t)')
    .replace(/define\(\[\],e\)/, 'define([t], function(t) {new (e().Funclib)(t)})')
    .replace(/\.fn=e\(\)/mg, '\.fn=new (e().Funclib)(t)');
  fn.wt(funclibMinJs, funclibMin);
}
