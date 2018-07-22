// const fn = require('./assets/funclib');
const fn = require('./assets');

/**
 * Loger
 * =======================================================================
 */
fn.log([{name: 'tom', age: 22}], false);
fn.log([{name: 'tom', age: 22}], 'false');
fn.log([{name: 'tom', age: 22}], {title: 'Hello Woooooooooooooo4d55oooo0000d04400000040000400ooooold'});
fn.log([{name: 'tom', age: 22}], {title: 'Hello world', width: 80, color: 'red', ttColor: 'blue'});
fn.log(() => {console.log(111)}, 'Function');

/**
 * Function
 * =======================================================================
 */
// let i = 0;
// const log = fn.throttle(() => fn.log(i, 'throttle'), 2000);
// fn.interval(500, () => {
//     i ++;
//     log();
// });

// let i = 0;
// const log = fn.debounce(() => fn.log(i, 'debounce'), 2000, true);
// fn.interval(500, () => {
//     i ++
//     log();
// });

/**
 * Array
 * =======================================================================
 */
// const persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}];
// fn.log(fn.find(persons, {name: 'Tom'}), 'fn.find');
// fn.log(fn.find(persons, ps => ps.name === 'Tom'), 'fn.find');
// fn.log(fn.filter(persons, {name: 'Tom'}), 'fn.filter');
// fn.log(fn.filter(persons, ps => ps.name === 'Tom'), 'fn.filter');
// fn.log(fn.reject(persons, {name: 'Tom'}), 'fn.reject');
// fn.log(fn.reject(persons, ps => ps.name === 'Tom'), 'fn.reject');
// fn.log(fn.contains(persons, {name: 'Tom'}), 'fn.contains');
// fn.log(fn.contains(persons, ps => ps.name === 'Tom'), 'fn.contains');
// fn.log(fn.contains(['Tom', 'Jerry', 'Marry'], 'Tom'), 'fn.contains');
// fn.log(fn.findIndex(persons, {name: 'Tom'}), 'fn.findIndex');
// fn.log(fn.findIndex(persons, ps => ps.name === 'Tom'), 'fn.findIndex');

/**
 * Object
 * =======================================================================
 */
// const obj1 = {name: 'Obj', metadata: {subObj: {name: true}}}
// const obj2 = {name: 'Obj', metadata: null}
// const val1 = fn.get(obj1, '/metadata/subObj/name');
// const val2 = fn.get(obj2, 'metadata/subObj/name');
// fn.forIn(['aaa', 'bbb'], x => fn.log(x));
// fn.log(val1);
// fn.log(val2);

/**
 * String
 * =======================================================================
 */
// const html = '<div></div>';
// const htmlStr = '&lt;div&gt;&lt;/div&gt;';
// fn.log(fn.encodeHtml(html));
// fn.log(fn.decodeHtml(htmlStr));
// fn.log(fn.fmtCurrency(8888888)) // 8,888,888.00;
// const str = 'Hello, 世界';
// fn.log(fn.cutString(str, 5));
// fn.log(fn.cutString(str, 9));

/**
 * Time
 * =======================================================================
 */
// const t1 = fn.fmtDate('yy-MM-dd hh:mm:ss');                // 18-06-06 22:31:16
// const t2 = fn.fmtDate('yyyy-MM-dd hh:mm', 1528259400000);  // 2018-06-06 12:30
// const t3 = fn.fmtDate('yy-MM-dd hh:mm', new Date('2018-06-06 12:30')); // 18-06-06 12:30
// fn.log(t1);
// fn.log(t2);
// fn.log(t3);
// fn.timeout(3000, () => {
//     fn.log();
// });

/**
 * Event
 * =======================================================================
 */
// fn.log(fn.getKeyCodeByName('Ctrl'));
// fn.log(fn.getKeyNameByCode(17) );

/**
 * Type
 * =======================================================================
 */
// const a = fn.typeOf(true, 'bol');
// const b = fn.typeValue('aaa', ['bol']);
// const c = fn.typeValue('aaa', ['str']);
// const d = fn.typeOf([], 'arr');
// const e = fn.typeValue({}, ['obj']);
// fn.log(a);
// fn.log(b);
// fn.log(c);
// fn.log(d);
// fn.log(e);

/**
 * Url
 * =======================================================================
 */
// const url = 'https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10';
// fn.log(fn.parseQueryString(url));
// const params = {name: 'Tom', age: 28};
// fn.log(fn.stringfyQueryString(params));

/**
 * Loger
 * =======================================================================
 */
// fn.log({name: 'Tom', age: 28}, {title: 'tom', color: 'cyan'});

// fn.log('Hello world!', 'green');
// console.log(fn.chalk('Hello world!', 'green'))

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
