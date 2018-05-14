const fs = require('fs');
const glob = require('glob');
const path = require('path');
const ProgressBar = require('progress');
const valueLooker = require('value-looker');
const exec = require('child_process').exec;
const sep = path.sep;
const pxfuncTmpTs = getPath('pxfuncTmpTs');
const pxfuncTmpJs = getPath('pxfuncTmpJs');
let progressTimer, progressBar, tickInterval;
let newpxfuncStr = '';

startCompilepxfunc();

/**
 * 描述: 资源和目标路径
 * @param {*} type 
 */
function getPath(type) {
    const tmpBase = __dirname.split(sep);
    tmpBase.pop();
    const basePath = tmpBase.join(sep);
    const pxfuncRoot = 'src/';
    const pxfuncDist = 'pxfunc/';
    switch (type) {
        case 'pxfuncRoot':
            return path.join(basePath, pxfuncRoot);
        case 'pxfuncMain':
            return path.join(basePath, pxfuncRoot, 'app/pxfunc.ts');
        case 'pxfuncHelper':
            return path.join(basePath, pxfuncRoot, `app/helper/*.ts`);
        case 'pxfuncBase':
            return path.join(basePath, pxfuncRoot, 'assets/pxfunc.ts');
        case 'pxfuncIdx':
            return path.join(basePath, pxfuncRoot, 'assets/index.js');
        case 'pxfuncDef':
            return path.join(basePath, pxfuncRoot, 'assets/pxfunc.d.ts');
        case 'pxfuncPkg':
            return path.join(basePath, pxfuncRoot, 'assets/package.json');
        case 'pxfuncDistJs':
            return path.join(basePath, pxfuncDist, 'pxfunc.js');
        case 'pxfuncDistIdx':
            return path.join(basePath, pxfuncDist, 'index.js');
        case 'pxfuncDistDef':
            return path.join(basePath, pxfuncDist, 'pxfunc.d.ts');
        case 'pxfuncDistPkg':
            return path.join(basePath, pxfuncDist, 'package.json');
        case 'pxfuncTmpTs':
            return path.join(basePath, 'pxfunc.ts');
        case 'pxfuncTmpJs':
            return path.join(basePath, 'pxfunc.js');
        case 'tsc':
            return path.join(basePath, 'node_modules/typescript/bin/tsc');
        default: 
            return basePath + sep;
    }
}

/**
 * 描述: 将库文件的内容读出并合并在一起。
 */
function startCompilepxfunc() {
    valueLooker('Compiling pxfunc, please wait!', {title: 'Msg From pxfunc', theme: 'verbose'});
    processProgressBar('start');
    let classesStr = '';
    const classes = [];
    const getClassStr = file => fs.readFileSync(file, 'utf8').split('/*pxfunc*/');
    const helpers = glob.sync(getPath('pxfuncHelper'));
    const pxfuncStrArr = getClassStr(getPath('pxfuncBase'));
    helpers.forEach(helper => classes.push(getClassStr(helper)[1]));
    classes.push(getClassStr(getPath('pxfuncMain'))[1]);
    classes.forEach(classStr => classesStr += classStr);
    newpxfuncStr = pxfuncStrArr[0] + classesStr + pxfuncStrArr[1];
    createNewpxfunc();
}

/**
 * 描述: 将合并在一起的内容放到一个临时的pxfunc.ts中。
 */
function createNewpxfunc() {
    fs.open(pxfuncTmpTs, 'w', function(err, fd) {
        if (err) {
            throw err;
        } else {
            var buffer = new Buffer(newpxfuncStr);
            fs.write(fd, buffer, 0, newpxfuncStr.length + 395, 0, function(err, bytesWritten, buffer) {
                if (err) {
                    throw err;
                } else {
                    fs.close(fd);
                    updatepxfunc();
                }
            });
        }
    });
}

/**
 * 描述: 删除以前编译的文件，用tsc编译这个ts文件，并把编译后的文件移到目标文件位置。
 */
function updatepxfunc() {
    const pxfuncIdx = getPath('pxfuncIdx');
    const pxfuncDef = getPath('pxfuncDef');
    const pxfuncPkg = getPath('pxfuncPkg');
    const pxfuncDistJs = getPath('pxfuncDistJs');
    const pxfuncDistIdx = getPath('pxfuncDistIdx');
    const pxfuncDistDef = getPath('pxfuncDistDef');
    const pxfuncDistPkg = getPath('pxfuncDistPkg');
    exec(`node ${getPath('tsc')} ${pxfuncTmpTs}`, function(e, stdout, stderr) {
        [pxfuncTmpTs, pxfuncDistJs, pxfuncDistIdx, pxfuncDistDef, pxfuncDistPkg].forEach(file => {
            if (fs.existsSync(file)) fs.unlinkSync(file);
        });
        fs.renameSync(pxfuncTmpJs, pxfuncDistJs);
        fs.createReadStream(pxfuncIdx).pipe(fs.createWriteStream(pxfuncDistIdx));
        fs.createReadStream(pxfuncDef).pipe(fs.createWriteStream(pxfuncDistDef));
        fs.createReadStream(pxfuncPkg).pipe(fs.createWriteStream(pxfuncDistPkg));
        processProgressBar('stop', () => {
            valueLooker('Congratulations, Compile pxfunc succeeded!', {title: 'Msg From pxfunc', theme: 'verbose'});
        });
    });
}

/**
 * 描述: 编译过程的进度条
 * @param {*} status 
 * @param {*} onStopped 
 */
function processProgressBar(status, onStopped) {
    const tickFun = type => {
        progressTimer = setTimeout(function () {
            progressBar.tick();
            switch (type) {
                case '+': tickInterval += 300; break;
                case '-': tickInterval -= tickInterval * 0.2; break;
            }
            progressBar.complete && status === 'stop' ? onStopped() : tickFun(type);
        }, tickInterval);
    }
    switch (status) {
        case 'stop':
            clearTimeout(progressTimer);
            tickInterval = 600;
            tickFun('-');
            break;
        case 'start':
        default: 
            progressBar = new ProgressBar('Compile progress [:bar] :percent', {
                complete: '=', incomplete: ' ', width: 40, total: 20
            });
            clearTimeout(progressTimer);
            tickInterval = 250;
            tickFun('+');
            break;
    }
}
