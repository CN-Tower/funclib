const path = require('path');
const { spawn } = require('child_process');

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const root = path.resolve(__dirname, '../');
const funclibPath = path.join(root, 'dist');
const funclibMpPath = path.join(root, 'funclib-mp');

const ls = spawn(npm, ['publish'], { stdio: 'inherit', cwd: funclibPath });
ls.on('exit', () => publishFunclibMp());

function publishFunclibMp() {
  spawn(npm, ['publish'], { stdio: 'inherit', cwd: funclibMpPath });
}