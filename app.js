const fn = require('./');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
fn.initTools(fs, path, process, child_process);

fn.mvSync('./tmp2', './tmp/haha');
