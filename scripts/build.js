// const fn = require('funclib');
// const fn = require('../src/index');
const fn = require('../dist/index');

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = path.dirname(__dirname);
const rdmSrc = path.join(root, 'src/README.md');
const fnJs = path.join(root, 'src/funclib.js');
const fnDefTs = path.join(root, 'src/index.d.ts');
const fnMinJs = path.join(root, 'src/funclib.min.js');
const fnIdxJs = path.join(root, 'dist/index.js');
const fnMp = path.join(root, 'funclib-mp/');

fn.progress('Building FuncLib', { width: 42 });
fn.rm(rdmSrc)

// 给funclib.d.ts和funclib.min.js增加licence信息
const liscence = fn.rd(fnJs).split('; (function () {')[0];
const fnDefTsStr = fn.rd(fnDefTs);
const fnMinJsStr = fn.rd(fnMinJs);
const spliter = '/**================================================================';
fn.wt(fnDefTs, liscence + spliter + fnDefTsStr.split(spliter)[1]);
fn.wt(fnMinJs, liscence + ';' + fnMinJsStr);

fn.rm('dist');
fn.rm('funclib-mp');

fn.timeout(1000, () => {
  const packageJson = fn.rd(path.join(root, 'package.json'))
    .replace(/"scripts":\s\{(.|\r|\n)*\},(.|\r|\n)*(\s*"repository": {)/, '$3')
    .replace(/(#readme"),(\r|\n|\s)*"devDependencies": {(.|\r|\n)*((\r|\n)}(\r|\n)?)/, '$1$4');

  fn.mk('dist');
  const fnFis = glob.sync('src/**/*');
  fnFis.forEach(fi => {
    const stat = fs.statSync(fi);
    if (stat.isFile()) fn.cp(fi, path.join(root, `dist/${path.basename(fi)}`));
  });
  fn.cp(path.join(root, 'README.md'), path.join(root, 'dist/'));
  fn.cp(path.join(root, 'README_en_US.md'), path.join(root, 'dist/'));
  fn.wt(path.join(root, 'dist/package.json'), packageJson.replace('"name": "funclib.js"', '"name": "funclib"'));
  fn.timeout(800, () => fn.wt(fnIdxJs, fn.rd(fnIdxJs).replace(/require\('\.\/funclib\//mg, `require('./`)));

  fn.mk('funclib-mp');
  fn.cp(path.join(root, 'src/index.d.ts'), fnMp);
  fn.cp(path.join(root, 'README.md'), fnMp);
  fn.cp(path.join(root, 'README_en_US.md'), fnMp);
  fn.cp(path.join(root, 'src/funclib-mp.js'), path.join(fnMp, 'index.js'));
  fn.wt(path.join(fnMp, 'package.json'), packageJson.replace('"name": "funclib.js"', '"name": "funclib-mp"'));

  fn.progress.stop();
});
