const fn = require('./');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
// fn.initTools(require, global);
// fn.log(fn.rdColor());
fn.initProgress(require);
fn.progress.start();