const fn = require('funclib');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const pkg = require('../src/package.json');

const root = path.dirname(__dirname);
const rdm = path.join(root, 'README.md');
const rdmSrc = path.join(root, 'src/README.md');
const fnJs = path.join(root, 'src/funclib.js');
const fnDefTs = path.join(root, 'src/index.d.ts');
const fnMinJs = path.join(root, 'src/funclib.min.js');
const indexJs = path.join(root, 'src/index.js');

fn.progress('Building FuncLib', {width: 42});
fn.rm(rdmSrc)
fn.cp(rdm, rdmSrc);

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
  fn.mk('dist');
  const fnFis = glob.sync('src/**/*');
  fnFis.forEach(fi => {
    const stat = fs.statSync(fi);
    if (stat.isFile()) fn.cp(fi, path.join(root, `dist/${path.basename(fi)}`));
  });
  fn.cp(path.join(root, 'README.md'), path.join(root, 'dist/README.md'));
  
  // 打印构建信息
  fn.progress.stop(() => fn.log(
`  Funclib Version: v${pkg.version}
  
  funclib.js       ${fn.size(fnJs)} kb
  funclib.min.js   ${fn.size(fnMinJs)} kb
  index.js         ${fn.size(indexJs)} kb`, 'Build Success!'
  ));

  fn.mk('funclib-mp');
  fn.wt(
    path.join(root, 'funclib-mp/package.json'),
    fn.rd(path.join(root, 'src/package.json'))
      .replace('"name": "funclib"', '"name": "funclib-mp"')
      .replace(/\s*"progress":\s*"\^\d\.\d\.\d",?/, '')
  );
  fn.wt(
    path.join(root, 'funclib-mp/README.md'),
    fn.rd(path.join(root, 'src/README.md'))
      .replace('npm install funclib', 'npm install funclib-mp')
      .replace('require(\'funclib\')', 'require(\'funclib-mp\')')
  );
  fn.cp(path.join(root, 'src/index.d.ts'), path.join(root, 'funclib-mp/'));
});
