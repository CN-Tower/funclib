const fn = require('../src');
const path = require('path');

const root = path.dirname(__dirname);
const rdmSrc = path.join(root, 'src/README.md');
const fnJs = path.join(root, 'src/funclib.js');
const fnDefTs = path.join(root, 'src/index.d.ts');
const fnMinJs = path.join(root, 'src/funclib.min.js');
const distPath = path.join(root, 'dist/');
const fnMpPath = path.join(root, 'funclib-mp/');

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
  fn.cp(path.join(root, 'src'), distPath, true);
  fn.cp(path.join(root, 'README.md'), distPath);
  fn.cp(path.join(root, 'README_en_US.md'), distPath);
  fn.wt(path.join(root, 'dist/package.json'), packageJson.replace('"name": "funclib.js"', '"name": "funclib"'));

  fn.mk('funclib-mp');
  fn.cp(path.join(root, 'README.md'), fnMpPath);
  fn.cp(path.join(root, 'README_en_US.md'), fnMpPath);
  fn.cp(path.join(root, 'src/index.d.ts'), fnMpPath);
  fn.cp(path.join(root, 'src/funclib-mp.js'), path.join(fnMpPath, 'index.js'));
  fn.wt(path.join(fnMpPath, 'package.json'), packageJson.replace('"name": "funclib.js"', '"name": "funclib-mp"'));

  fn.progress.stop();
});
