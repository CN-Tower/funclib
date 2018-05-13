const fs = require('fs');
const glob = require('glob');
const path = require('path');
const ProgressBar = require('progress');
const valueLooker = require('value-looker');
const exec = require('child_process').exec;
const sep = path.sep;
let progressTimer, progressBar, tickInterval;

start();

/**
 * 描述: 资源和目标路径
 * @param {*} type 
 */
function getPath(type) {
    const tmpBase = __dirname.split(sep);
    tmpBase.pop();
    const basePath = tmpBase.join(sep);
    switch (type) {
        case 'appTs':
            return path.join(basePath, 'app.ts');
        case 'appJs':
            return path.join(basePath, 'app.js');
        case 'srcJs':
            return path.join(basePath, 'src/app/**/*.js');
        case 'distJs':
            return path.join(basePath, `dist/**/*.js`);
        case 'appDistJs':
            return path.join(basePath, 'dist/app.js');
        case 'tsc':
            return path.join(basePath, 'node_modules/typescript/bin/tsc');
        default: return basePath;
    }
}

/**
 * 描述: 。
 */
function start() {
    progress('start');
    exec(`node ${getPath('tsc')} ${getPath('appTs')}`, function(e, stdout, stderr) {
        const srcJs = glob.sync(getPath('srcJs'));
        const distJs = glob.sync(getPath('distJs'));
        const src2Dist = ft => path.join(ft.replace(/src/, `dist/src`));
        distJs.forEach(js => fs.unlinkSync(js));
        srcJs.forEach(js => fs.renameSync(js, src2Dist(js)));
        const appDistJs = getPath('appDistJs');
        fs.renameSync(getPath('appJs'), appDistJs);
        progress('stop', () => console.log('\nCompile success, Result is:'));
    });
}

/**
 * 描述: 编译过程的进度条
 * @param {*} status 
 * @param {*} onStopped 
 */
function progress(status, onStopped) {
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
            progressBar = new ProgressBar('Compiling [:bar] :percent', {
                complete: '=', incomplete: ' ', width: 40, total: 20
            });
            clearTimeout(progressTimer);
            tickInterval = 250;
            tickFun('+');
            break;
    }
}
