var fn = require('./funclib');
var Progress = require('progress');

// var b = fn.matchPattern('127.0.0.1', 'ip');
// console.log(b);

fn.initProgress(Progress);
fn.progress.start();
fn.timeout('progress', 5000, () => fn.progress.stop(() => fn.log()));
