const fn = require('./src/funclib');
// const fn = require('./src/funclib.min');

// const log = require('./src/logS');
// const fmtDate = require('./src/fmtDate');
// const progress = require('./src/progress');

// fn.log(fn.fmtCurrency(-1234.7455))
fn.log(fn.fmtUtcDate('yyyy-MM-dd hh:mm', 0));
fn.log(fn.fmtUtcDate('yy-MM-dd hh:mm', -1528259400000));

/**
 * Hybrid
 * =======================================================================
 */
// fn.log();
// fn('aaa').log({title: 'AAA'});
// fn({name: 'Tom'}).get('/name');
// fn.get({name: 'Tom'}, '/name');
// fn.progress.start('Test', {type: 'spi'});
// fn.timeout(3000, () => fn.progress.stop());
// fn.progress.start({title: 'Test'});
// fn.log(fn.get({
//   name: 'Obj',
//   id: 'Obj_001',
//   metadata: {
//     subObj: {
//       name: 'subOjb',
//       id: 'subOjb_001'
//     }
//   }
// }, '/metadata/subObj/id', 'str', 'udf'));

// fn.log(fn.typeVal(undefined, 'arr'));
// fn.log(fn.maskString(18770347037, 7))
// fn.log(fn.isDeepEqual({}, {}));
// fn.log(fn.typeOf({}, 'obj'));
// fn.log(fn.typeOf(global, 'obj'));
// console.log(fn.drop([/a/, '', null, [], {}, 0, 1], true))
// fn.setPattern('myPtn', /test_/);
// fn.matchPattern('test_x', 'myPtn', false);

/**
 * Is
 * =======================================================================
 */
// fn.log(fn.isObj(global));
// fn.log(fn.isObj(/a/));
// fn.log(fn.isObj(new Date()));
// fn.log(fn.isObj(new Error()));
// fn.log(fn.isObj(new Array()));
// fn.log(fn.isObj([]));
// fn.log(fn.isObj(null));
// fn.log(fn.isObj(undefined));
// fn.log(fn.isObj(new (class A{})));
// fn.log(fn.isObj(new Object()));
// fn.log(fn.isObj({}));

/**
 * Chain
 * =======================================================================
 */
// var ps = [{name: 'Tom', age: 18}, {name: 'Bob', age: 22}];
// var p = fn(ps).find({name: 'Bob'}).set('name', 'Bob').val();
// var p = fn.chain(ps).filter({name: 'Bob'}).val();

// log(p);
// fn.log(p);

/**
 * Random
 * =======================================================================
 */
// fn.log(fn.random());
// fn.log(fn.random(5));
// fn.log(fn.random(5, true));
// fn.log(fn.random(5, 6, true));
// fn.log(fn.random(5.5));
// fn.interval(1000, () => {
//   fn.log(fn.random(5, 8));
// });

/**
 * Date
 * =======================================================================
 */
// const d = Date.now();
// const offset = 5.5 * 60 * 60 * 1000;
// log(fmtDate('yyyy-MM-dd hh:mm:ss', d), 'local');
// fn.log(fn.fmtDate('yyyy-MM-dd hh:mm:ss', d), 'local');
// fn.log(fn.fmtUtcDate('yyyy-MM-dd hh:mm:ss', d), 'utc');
// fn.log(fn.fmtXyzDate('yyyy-MM-dd hh:mm:ss', d, offset), 'xyz');
// fn.log(fn.fmtDate('yyyy-MM-dd hh:mm:ss', fn.asXyzTime(d, offset)), 'xyz2');
// fn.log(fn.fmtDate('yyyy-MM-dd hh:mm:ss', fn.asUtcTime(d) - offset), 'xyz');
// fn.log(new Date());
// fn.log(fn.fmtDate('yyyy-MM-dd', '2012-2-3'));
// fn.log(fn.fmtDate('yyyy-MM-dd', new Date()));
// fn.log(fn.fmtDate('yyyy-MM-dd'));

/**
 * Utils
 * =======================================================================
 */
// fn.interval('abc', 2000, () => console.log(1));
// fn.interval('abc', 2000, () => console.log(1));
// fn.interval('abc', 2000, () => console.log(1));
// fn.interval('abc', 2000, () => console.log(1), true);
// fn.interval('abc', 2000, () => console.log(1), true);
// fn.interval('abc', 2000, () => console.log(1), true);
// fn.interval(2000, () => console.log(1));
// fn.interval(2000, () => console.log(1));
// fn.interval(2000, () => console.log(1));
// fn.interval(2000, () => console.log(1), true);
// fn.interval(2000, () => console.log(1), true);
// fn.interval(2000, () => console.log(1), true);
// fn.interval(() => console.log(1), 2000, 'abc');
// fn.interval(() => console.log(1), 2000, 'abc');
// fn.interval(() => console.log(1), 2000, 'abc');
// fn.interval(() => console.log(1), 2000, 'abc', true);
// fn.interval(() => console.log(1), 2000, 'abc', true);
// fn.interval(() => console.log(1), 2000, 'abc', true);
// fn.interval(() => console.log(1), 'abc', 2000);
// fn.interval(() => console.log(1), 'abc', 2000);
// fn.interval(() => console.log(1), 'abc', 2000);
// fn.interval(() => console.log(1), 'abc', 2000, true);
// fn.interval(() => console.log(1), 'abc', 2000, true);
// fn.interval(() => console.log(1), 'abc', 2000, true);
// fn.log(fn.interval(), '#interval');
// fn.log(fn.interval('abc'), '#interval_abc', { color: 'red' });
// fn.timeout(6100, () => fn.interval('abc', false));
// fn.timeout(6100, () => fn.interval('abc').clear());
// fn.timeout(() => fn.interval('abc').clear(), 6100);

// fn.timeout(() => fn.interval(), 3000)
// fn.timeout(() => fn.interval('abc', false), 2000);
// fn.log(fn.timeout('#abc').clear)

/**
 * Loger
 * =======================================================================
 */
// fn.log([{name: 'tom', age: 22}], false);
// fn.log([{name: 'tom', age: 22}], 'false');
// fn.log([{name: 'tom', age: 22}], {title: 'Hello Woooooooooooooo4d55oooo0000d04400000040000400ooooold'});
// fn.log([{name: 'tom', age: 22}], {title: 'Hello world', width: 80, color: 'red', ttColor: 'blue'});
// fn.log(() => {console.log(111)}, 'Function');
// fn.log(/aaa/);
// fn.log(null);
// fn.log(undefined);
// fn.log([{name: 'tom'}])
// class A {
//   constructor() {
//     this.a = 'aa';
//   }
// }
// fn.log(new A());

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
// const log = fn.debounce(() => fn.log(i, 'debounce'), 2000);
// fn.interval('test', 500, () => {
//     if(i < 10) i ++
//     else fn.interval('test').stop();
//     log();
// });

/**
 * Array
 * =======================================================================
 */
// const persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}];
// fn.log(fn(persons).find({name: 'Tom'}), 'fn.find');
// fn.log(fn.find(persons, ps => ps.name === 'Tom'), 'fn.find');
// fn.log(fn.filter(persons, {name: 'Tom'}), 'fn.filter');
// fn.log(fn.filter(persons, ps => ps.name === 'Tom'), 'fn.filter');
// fn.log(fn.reject(persons, {name: 'Tom'}), 'fn.reject');
// fn.log(fn.reject(persons, ps => ps.name === 'Tom'), 'fn.reject');
// fn.log(fn.contains(persons, {name: 'Tom'}), 'fn.contains');
// fn.log(fn.contains(persons, ps => ps.name === 'Tom'), 'fn.contains');
// fn.log(fn.contains(['Tom', 'Jerry', 'Marry'], 'Tom'), 'fn.contains');
// fn.log(fn.indexOf(persons, {name: 'Tom'}), 'fn.indexOf');
// fn.log(fn.indexOf(persons, ps => ps.name === 'Tom'), 'fn.indexOf');
// fn.log(fn.range(5));
// fn.log(fn.range(-5));
// fn.log(fn.range(2, 5));
// fn.log(fn.range(2, -5));

/**
 * Object
 * =======================================================================
 */
// const obj1 = [{name: 'Obj', metadata: {subObj: {name: 'abc'}}}]
// const obj2 = {name: 'Obj', metadata: null}
// fn.set(obj1, '/metadata/subObj/name', 'tom');
// fn.set(obj2, 'metadata/subObj/name', 'tom');
// fn.set(obj1, '.metadata.subObj.name', 'tom');
// fn.set(obj2, 'metadata.subObj.name', 'tom');
// fn(obj1).find({name: 'Obj'}).set('metadata.subObj.name', 'tom').val();
// fn.log(obj1, 'set1');
// fn.log(obj2, 'set2');

// fn.log(fn.get(obj1, '/metadata/subObj/name'));
// fn.log(fn.get(obj2, 'metadata/subObj/name'));
// fn.log(fn.get(obj1, '.metadata.subObj.name'));
// fn.log(fn.get(obj2, 'metadata.subObj.name'));
// fn.forIn(['aaa', 'bbb'], x => fn.log(x));

// const persons = [{name:'LiLi', age: 22, indexes: {height: 180, weight: 70}},
//                  {name:'Mari', age: undefined, indexes: {height: 180, weight: 72}},
//                  {name:'Enn', age: null, indexes: {height: 180, weight: 70}},
//                  {name:'Bob', age: '', indexes: {height: 180, weight: 70}},
//                  {name:'Tom', indexes: {height: 180, weight: 70}},
//                  {name:'Jerry', age: 18, indexes: {height: 175, weight: 70}}]
// fn.log(fn.get(persons, '.1.indexes.weight'), 'weight')
                 // const a = fn.sortBy(persons, 'age'); 
// const b = fn.sortBy(persons, 'age', true);
// const c = fn.sortBy(persons, '/indexes/height');
// const d = fn.sortBy(persons, '/indexes/weight');

// fn.log(a, 'By age');
// fn.log(b, 'By age decs');
// fn.log(c, 'By height');
// fn.log(d, 'By weight');

// fn.log(fn.isDeepEqual({name: 't', age: 11}, {age: 12, name: 't'}))
// fn.log(fn.uniq([0, {}, 0, false, null, false, [], [], {}, 'test', 'test']))
// fn.log(fn.uniq([0, {}, 0, false, null, false, [], [], {}, 'test', 'test'], false))
// fn.log(fn.uniq(persons, '/indexes'))

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
// const b = fn.typeVal('aaa', ['bol']);
// const c = fn.typeVal('aaa', ['str']);
// const d = fn.typeOf([], 'arr');
// const e = fn.typeVal({}, ['obj']);
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
// fn.log(fn.stringifyQueryString(params));

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

// fn.progress.stop();
// fn.log(1234)
// fn.progress('Hello', {type: 'spi', isSplit: false});
// console.log(12234534)
// fn.progress.start('Hello_', {isSplit: false});
// fn.timeout(5000, () => {
//   fn.progress.clear();
//   fn.progress('Nice');
//   fn.timeout(5000, () => fn.progress.stop());
// });
// fn.progress.start('Testing...', {type: 'spi'});
// console.log(111);
// console.log(222);