const fs = require('fs');
const fn = require('funclib');
const glob = require('glob');
const path = require('path');
const Progress = require('progress');
const exec = require('child_process').exec;
const sep = path.sep;
const funclibTmpTs = getPath('funclibTmpTs');
const funclibTmpJs = getPath('funclibTmpJs');
let newfunclibStr = '';
fn.initProgress(Progress);
fn.initTools({fs: fs, path: path});

startCompilefunclib();

/**
 * 描述: 资源和目标路径
 * @param {*} type 
 */
function getPath(type) {
    const basePath = path.dirname(__dirname);
    const funclibRoot = 'src/';
    const funclibDist = 'funclib/';
    switch (type) {
        case 'funclibRoot':
            return path.join(basePath, funclibRoot);
        case 'funclibMain':
            return path.join(basePath, funclibRoot, 'app/funclib.ts');
        case 'funclibModule':
            return path.join(basePath, funclibRoot, `app/modules/*.ts`);
        case 'funclibBase':
            return path.join(basePath, funclibRoot, 'assets/funclib.ts');
        case 'funclibIdx':
            return path.join(basePath, funclibRoot, 'assets/index.js');
        case 'funclibDef':
            return path.join(basePath, funclibRoot, 'assets/funclib.d.ts');
        case 'funclibPkg':
            return path.join(basePath, funclibRoot, 'assets/package.json');
        case 'funclibDistJs':
            return path.join(basePath, funclibDist, 'funclib.js');
        case 'funclibDistIdx':
            return path.join(basePath, funclibDist, 'index.js');
        case 'funclibDistDef':
            return path.join(basePath, funclibDist, 'funclib.d.ts');
        case 'funclibDistPkg':
            return path.join(basePath, funclibDist, 'package.json');
        case 'funclibTmpTs':
            return path.join(basePath, 'funclib.ts');
        case 'funclibTmpJs':
            return path.join(basePath, 'funclib.js');
        case 'tsc':
            return path.join(basePath, 'node_modules/typescript/bin/tsc');
        default: 
            return basePath + sep;
    }
}

/**
 * 描述: 将库文件的内容读出并合并在一起。
 */
function startCompilefunclib() {
    fn.log('Compiling funclib, please wait!', {title: 'Msg From funclib', color: 'cyan'});
    fn.progress.start({title: 'Compiling funclib', width: 41});
    let classesStr = '';
    const classes = [];
    const getClassStr = file => fs.readFileSync(file, 'utf8').split('/*funclib*/');
    const modules = glob.sync(getPath('funclibModule'));
    const funclibStrArr = getClassStr(getPath('funclibBase'));
    modules.forEach(modules => classes.push(getClassStr(modules)[1]));
    classes.push(getClassStr(getPath('funclibMain'))[1]);
    classes.forEach(classStr => classesStr += classStr);
    newfunclibStr = funclibStrArr[0] + classesStr + funclibStrArr[1];
    fn.tools.writeFile(funclibTmpTs, newfunclibStr);
    updatefunclib();
}

/**
 * 描述: 删除以前编译的文件，用tsc编译这个ts文件，并把编译后的文件移到目标文件位置。
 */
function updatefunclib() {
    const funclibIdx = getPath('funclibIdx');
    const funclibDef = getPath('funclibDef');
    const funclibPkg = getPath('funclibPkg');
    const funclibDistJs = getPath('funclibDistJs');
    const funclibDistIdx = getPath('funclibDistIdx');
    const funclibDistDef = getPath('funclibDistDef');
    const funclibDistPkg = getPath('funclibDistPkg');
    exec(`node ${getPath('tsc')} ${funclibTmpTs}`, function(e, stdout, stderr) {
        [funclibTmpTs, funclibDistJs, funclibDistIdx, funclibDistDef, funclibDistPkg].forEach(file => {
            if (fs.existsSync(file)) fs.unlinkSync(file);
        });
        fs.renameSync(funclibTmpJs, funclibDistJs);
        fn.tools.copyFile(funclibIdx, funclibDistIdx);
        fn.tools.copyFile(funclibDef, funclibDistDef);
        fn.tools.copyFile(funclibPkg, funclibDistPkg);
        fn.progress.stop(() => {
            fn.log('Congratulations, Compile funclib succeeded!', {title: 'Msg From funclib', color: 'cyan'});
        });
    });
}
