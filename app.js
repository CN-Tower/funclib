const fn = require('./');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
fn.initTools(fs, path, child_process, process);

fn.log(fn.cp);
