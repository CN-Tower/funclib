const fs = require('fs');
const fn = require('funclib');
const glob = require('glob');
const path = require('path');
const Progress = require('progress');
const exec = require('child_process').exec;
const sep = path.sep;
let progressTimer, progressBar, tickInterval;
fn.initProgress(Progress);
fn.initTools({fs: fs, path: path});

fn.log('Compiling funclib, please wait!', {title: 'Msg From funclib', color: 'cyan'});
fn.progress.start({title: 'Compiling', width: 49});
exec(`node ${getPath('tsc')} ${getPath('appTs')}`, function(e, stdout, stderr) {
    const srcJs = glob.sync(getPath('srcJs'));
    const distJs = glob.sync(getPath('distJs'));
    const src2Dist = ft => path.join(ft.replace(/src/, `dist/src`));
    distJs.forEach(js => fs.unlinkSync(js));
    srcJs.forEach(js => fs.renameSync(js, src2Dist(js)));
    const appDistJs = getPath('appDistJs');
    fs.renameSync(getPath('appJs'), appDistJs);
    fn.tools.writeFile(appDistJs, '\n fn.log("", {part: "end"}) \n', 'a');
    fn.progress.stop(() => fn.log('', {title: 'Result Is:', part: 'pre'}));
});

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
