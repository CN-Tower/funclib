const fn = require('./dist/');

/**
 * Url
 * =======================================================================
 */
const url = 'https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10';
fn.log(fn.parseQueryString(url));
const params = {name: 'Tom', age: 28};
fn.log(fn.stringfyQueryString(params));

/**
 * Object
 * =======================================================================
 */
// const obj1 = {name: 'Obj', metadata: {subObj: {name: true}}}
// const obj2 = {name: 'Obj', metadata: null}
// const val1 = fn.getChainProperty(obj1, 'metadata/subObj/name');
// const val2 = fn.getChainProperty(obj2, 'metadata/subObj/name');
// fn.log(val1);
// fn.log(val2);

/**
 * Type
 * =======================================================================
 */
// const a = fn.isTypeOf(true, 'bol');
// const d = fn.isTypeOf([], 'arr');

// const b = fn.typeValue('aaa', ['bol']);
// const c = fn.typeValue('aaa', ['str']);
// const e = fn.typeValue({}, ['obj']);
// fn.log(a);
// fn.log(b);
// fn.log(c);
// fn.log(d);
// fn.log(e);

/**
 * Loger
 * =======================================================================
 */
// fn.log({name: 'Tom', age: 28}, {title: 'tom', color: 'cyan'});
// fn.log('Hello world!', 'green');

/**
 * Progress
 * =======================================================================
 */
// fn.progress.start({title: 'Loading'});

// fn.progress.start('Loading...');
// setTimeout(() => {
//     fn.progress.start('Copying...');
// }, 2000);

// setTimeout(() => {
//     fn.progress.stop()
// }, 5000);
