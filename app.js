const fn = require('./dist/');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

/**
 * Loger
 */
fn.log({name: 'Tom', age: 28}, {title: 'tom', color: 'cyan'});
fn.chalk('Hello world!', 'green');

/**
 * Progress
 */
// fn.progress.start({title: 'Loading'});
// fn.timeout('pg', 5000, () => fn.progress.stop());

// fn.progress.start('Loading...');
// fn.timeout('pg', 5000, () => fn.progress.stop())