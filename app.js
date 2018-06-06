const fn = require('./dist/');

/**
 * Loger
 */
// fn.log({name: 'Tom', age: 28}, {title: 'tom', color: 'cyan'});
// fn.log('Hello world!', 'green');

/**
 * Progress
 */
fn.progress.start({title: 'Loading'});

// fn.progress.start('Loading...');
// setTimeout(() => {
//     fn.progress.start('Copying...');
// }, 2000);

// setTimeout(() => {
//     fn.progress.stop()
// }, 5000);
