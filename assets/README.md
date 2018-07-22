# funclib.js (凡客杰斯)
[![npm](https://img.shields.io/npm/v/funclib.svg)
![LICENSE MIT](https://img.shields.io/npm/l/funclib.svg)](https://www.npmjs.com/package/funclib) 
[![Build Status](https://travis-ci.org/CN-Tower/funclib.js.svg?branch=master)](https://travis-ci.org/CN-Tower/funclib.js)
[![Coverage Status](https://coveralls.io/repos/github/CN-Tower/funclib.js/badge.svg)](https://coveralls.io/github/CN-Tower/funclib.js)

## Brief Intro
Javascript通用型UMD函数库，采用Typescript开发，Webpack打包编译!
> 目的：高效率完成前端业务代码！

## Quick start
```bash
# Install funclib.js
$ npm install funclib

# Use funclib
$ node
> var fn = require('funclib');
> console.log(fn.rdid()) // => 8GH9IYO60MXQ
```

## Clone Repo
```bash
# Download funclib repo
$ git clone https://github.com/CN-Tower/funclib.js.git
# $ git clone http://gitlab.zte.com.cn/CN-Tower/funclib.js.git

# Install dependency
$ npm install

# Start
$ npm start

# Do Try
$ npm run usage

# Build
$ npm run build

# Test
$ npm run test
```

## Structure
```
funclib.js
├── node_modules/           # You know the drill...
├── assets                  # 构建目录
│   ├── funclib.min.js      # 生成的UMD文件
│   ├── index.d.ts          # 定义文件
│   ├── index.js            # 索引文件
│   ├── package.json        # 库模块定义
│   └── README.md           # Read this FIRST :)
├── script                  # 脚本
│   ├── build.js            # 编译脚本
│   └── webpack.conf.js     # Webpack配置
├── src                     # Source code
│   ├── modules             # 模块
│   │   ├── Array.ts        # Array
│   │   ├── Cookie.ts       # Cookie
│   │   ├── Dom.ts          # Element
│   │   ├── FileSys.ts      # FileSystem
│   │   ├── Function.ts     # Function
│   │   ├── Loger.ts        # Loger
│   │   ├── Math.ts         # Mathematic
│   │   ├── Object.ts       # Object
│   │   ├── Pattern.ts      # RegExp
│   │   ├── Progress.ts     # Progress
│   │   ├── String.ts       # String
│   │   ├── Time.ts         # Time
│   │   ├── Trick.ts        # Trick
│   │   ├── Type.ts         # Type
│   │   └── Url.ts          # Url
│   ├── funclib.conf.ts     # 配置文件
│   └── funclib.ts          # Main函数
├── test                    # 测试
│   ├── client-methods      # 客户端方法测试用例
│   ├── server-methods      # 服务端方法测试用例
│   └── *.spec.js           # 通用方法测试用例
├── .coveralls.yml          # 测试覆盖率
├── .editorconfig           # Set coding style (indents, charset, etc.)
├── .gitignore              # You know the drill...
├── .travis.yml             # CI配置
├── LICENSE                 # 授权说明
├── package-lock.json       # NPM Lock
├── package.json            # 库配置
├── README.md               # Read this FIRST :)
├── tsconfig.json           # Typescript配置
├── usage.html              # 客户端试验
└── usage.js                # 服务端试验
```

## Document (CM: Client side method, SM: Server side method)
### CONTENT
#### Type      
[fn.typeOf](#fntypeof)&nbsp;&nbsp;检查值的类型，返回布尔值<br/>
[fn.typeValue](#fntypevalue)&nbsp;&nbsp;检查值的类型，是则返回该值，否则返回false
#### Array      
[fn.array](#fnarray)&nbsp;&nbsp;返回指定长度和默认值的数组<br/>
[fn.toArray](#fntoarray)&nbsp;&nbsp;值数组化<br/>
[fn.find](#fnfind)&nbsp;&nbsp;根据条件寻找值<br/>
[fn.filter](#fnfilter)&nbsp;&nbsp;根据条件过滤值<br/>
[fn.reject](#fnreject)&nbsp;&nbsp;根据条件取过滤值<br/>
[fn.contains](#fncontains)&nbsp;&nbsp;判断数组是否包含符合条件的值<br/>
[fn.findIndex](#fnfindindex)&nbsp;&nbsp;寻找值在数组中的索引<br/>
[fn.sortBy](#fnsortby)&nbsp;&nbsp;对象数组根据字段排序
#### Object     
[fn.len](#fnlen)&nbsp;&nbsp;获取对象自有属性的个数<br/>
[fn.forIn](#fnforin)&nbsp;&nbsp;遍历对象的可数自有属性<br/>
[fn.isEmpty](#fnisempty)&nbsp;&nbsp;判断对象是否为空对象或数组<br/>
[fn.overlay](#fnoverlay)&nbsp;&nbsp;给对象赋值，可指定字段<br/>
[fn.deepCopy](#fndeepcopy)&nbsp;&nbsp;深拷贝数组或对象<br/>
[fn.get](#fnget)&nbsp;&nbsp;返回对象或子孙对象的属性，可判断类型
#### Math
[fn.random](#fnrandom)&nbsp;&nbsp;返回指定范围的随机数<br/>
[fn.rdid](#fnrdid)&nbsp;&nbsp;返回指定长度(最小6位)的随机ID<br/>
[fn.rdcolor](#fnrdcolor)&nbsp;&nbsp;返回一个随机色值
#### Time       
[fn.interval](#fninterval)&nbsp;&nbsp;循环定时器<br/>
[fn.timeout](#fntimeout)&nbsp;&nbsp;延时定时器<br/>
[fn.defer](#fndefer)&nbsp;&nbsp;延迟执行函数<br/>
[fn.time](#fntime)&nbsp;&nbsp;返回一个当前时间戳<br/>
[fn.fmtDate](#fnfmtdate)&nbsp;&nbsp;获取格式化的时间字符串
#### String     
[fn.encodeHtml](#fnencodehtml)&nbsp;&nbsp;编码HTML字符串<br/>
[fn.decodeHtml](#fndecodehtml)&nbsp;&nbsp;解码HTML字符串<br/>
[fn.fmtCurrency](#fnfmtcurrency)&nbsp;&nbsp;格式化显示货币<br/>
[fn.cutString](#fncutstring)&nbsp;&nbsp;裁切字符串到指定长度
#### RegExp     
[fn.getPattern](#fngetpattern)&nbsp;&nbsp;获取一个通用的正则表达式<br/>
[fn.matchPattern](#fnmatchpattern)&nbsp;&nbsp;与一个或几个通用正则匹配
#### Function
[fn.throttle](#fnthrottle)&nbsp;&nbsp;节流函数，适用于限制resize和scroll等函数的调用频率<br/>
[fn.debounce](#fndebounce)&nbsp;&nbsp;防抖函数, 适用于获取用户输入
#### Url
[fn.parseQueryString](#fnparsequerystring)&nbsp;&nbsp;解析Url参数成对象<br/>
[fn.stringfyQueryString](#fnstringfyquerystring)&nbsp;&nbsp;把对象编译成Url参数
#### Dom        
[fn.fullScreen](#fnfullscreen)&nbsp;&nbsp;全屏显示一个HTML元素<br/>
[fn.exitFullScreen](#fnexitfullscreen)&nbsp;&nbsp;退出全屏显示<br/>
[fn.isFullScreen](#fnisFullScreen)&nbsp;&nbsp;检测是否处理全屏状态<br/>
[fn.fullScreenChange](#fullscreenchange)&nbsp;&nbsp;检测是否全屏状态<br/>
[fn.pollingEl](#fnpollingel)&nbsp;&nbsp;轮询获取异步出现的HTML元素<br/>
[fn.noAutoComplete](#fnnoautocomplete)&nbsp;&nbsp;防止input密码自动填充<br/>
#### Cookie     
[fn.setCookie](#fnsetcookie)&nbsp;&nbsp;设置Cookie<br/>
[fn.getCookie](#fngetcookie)&nbsp;&nbsp;根据name读取cookie<br/>
[fn.removeCookie](#fnremovecookie)&nbsp;&nbsp;根据name删除cookie
#### Tricks
[fn.copyText](#fncopytext)&nbsp;&nbsp;复制文本到粘贴板
[fn.extendJquery](#fnextendjquery)&nbsp;&nbsp;jQuery拓展]<br/>
[$ele.findCousin](#elefindcousin)&nbsp;&nbsp;jQuery获取元素表亲
#### Loger
[fn.chalk](#fnchalk)&nbsp;&nbsp;返回带颜色的字符串<br/>
[fn.log](#fnlog)&nbsp;&nbsp;控制打印格式化值
#### Tools      
[fn.rd](#fnrd)&nbsp;&nbsp;NodeJs读文件<br/> 
[fn.wt](#fnwt)&nbsp;&nbsp;NodeJs写文件<br/> 
[fn.cp](#fncp)&nbsp;&nbsp;NodeJs复制文件夹和文件<br/>
[fn.mv](#fnmv)&nbsp;&nbsp;NodeJs移动文件夹和文件<br/>
[fn.rm](#fnrm)&nbsp;&nbsp;NodeJs删除文件夹和文件<br/>
[fn.mk](#fnmk)&nbsp;&nbsp;NodeJs创建文件夹
#### Progress      
[fn.progress.start](#fnprogressstart)&nbsp;&nbsp;开启进度条，并传入参数<br/>
[fn.progress.stop](#fnprogressstop)&nbsp;&nbsp;停止进度条，结束后触发回调
#### Version
[fn.version](#fnversion)&nbsp;&nbsp;返回当前函数库版本

### Type  
#### fn.typeOf
```
/**
  * [fn.typeOf] 检查值的类型，返回布尔值
  * @param value 
  * @param type ['arr'|'obj'|'fun'|string|string[]]
  */
typeOf(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): boolean;

// examples:
const a = fn.typeOf(true, 'bol');
const b = fn.typeOf([], ['arr, 'str']);
const c = fn.typeValue([], ['obj']);
console.log(a); // true
console.log(b); // true
console.log(c); // false
```
#### fn.typeValue
```
/**
  * [fn.typeValue] 检查值的类型，true则返回该值，否则返回false
  * @param value 
  * @param type ['arr'|'obj'|'fun'|string|string[]]
  */
typeValue(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): any;

// examples:
const a = fn.typeValue(true, 'bol');
const b = fn.typeValue([], 'obj');
const c = fn.typeValue([], ['arr']);
console.log(a); // true
console.log(b); // false
console.log(c); // []
```
### Array
#### fn.array
```
/**
  * [fn.array] 返回一个指定长度和默认值的数组
  * @param length [number]
  * @param value  [any, function]
  */
fn.array(length: number, value?: any): any[];

// examples:
fn.array(5);    // [0, 1, 2, 3, 4, 5]
fn.array(5, 0); // [0, 0, 0, 0, 0]
let x = 0;
fn.array(5, () => x += 2); // [2, 4, 6, 8, 10]
```
#### fn.toArray
```
/**
  * [fn.toArray] 值数组化
  * @param src 
  */
fn.toArray(src: any): any[];

// examples:
fn.toArray('str');   // ['str']
fn.toArray(['str']); // ['str']
```
#### fn.find
```
/**
  * [fn.find] 根据条件寻找值
  * @param src 
  * @param predicate 
  */
fn.find(src: any[], predicate: any): any;

// examples:
const persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}]
fn.find(persons, {name: 'Tom'});             // {name:'Tom', age: 22}
fn.find(persons, ps => ps.name === 'Tom');   // {name:'Tom', age: 22}
```
#### fn.filter
```
/**
  * [fn.filter] 根据条件取过滤值
  * @param src 
  * @param predicate 
  */
fn.filter(src: any[], predicate: any): any[];

// examples:
const persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}]
fn.filter(persons, {name: 'Tom'});             // [{name:'Tom', age: 22}]
fn.filter(persons, ps => ps.name === 'Tom');   // [{name:'Tom', age: 22}]
```
#### fn.reject
```
/**
  * [fn.reject] 根据条件过滤值
  * @param src 
  * @param predicate 
  */
fn.reject(src: any[], predicate: any): any[];

// examples:
const persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}]
fn.reject(persons, {name: 'Tom'});             // [{name:'Jerry', age: 18}]
fn.reject(persons, ps => ps.name === 'Tom');   // [{name:'Jerry', age: 18}]
```
#### fn.contains
```
/**
  * [fn.contains] 判断数组是否包含符合条件的值
  * @param src 
  * @param predicate 
  */
fn.contains(src: any[], predicate: any): boolean;

// examples:
const persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}]
fn.contains(persons, {name: 'Tom'});             // true
fn.contains(persons, ps => ps.name === 'Tom');   // true
fn.contains(['Tom', 'Jerry', 'Marry'], 'Tom');   // true
```
#### fn.findIndex
```
/**
  * [fn.findIndex] 寻找值在数组中的索引
  * @param src 
  * @param predicate 
  */
findIndex(src: any[], predicate: any): number;

// examples:
const persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}]
fn.findIndex(persons, {name: 'Tom'});             // 1
fn.findIndex(persons, ps => ps.name === 'Tom');   // 1
```
#### fn.sortBy
```
/**
  * [fn.sortBy] 对象数组根据字段排序
  * @param tableData
  * @param field
  * @param isDesc
  */
fn.sortBy(tableData: any, field: string, isDesc?: boolean): any;

// examples:
const persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}]
fn.sortBy(); //[{name:'Jerry', age: 18}, {name:'Tom', age: 22}]
```
### Object     
#### fn.len
```
/**
  * [fn.len] 获取对象自有属性的个数
  * @arg obj
  */
fn.len(obj: any): number;

// examples:
fn.len({name: 'Tom'});       // 1
fn.len(['x']);               // 1
fn.len(x => console.log(s)); // 1
```
#### fn.forIn
```
/**
  * [fn.forIn] 遍历对象的可数自有属性
  * @arg obj
  * @arg callback
  */
forIn(obj: Object, callback: any): void;

// examples:
const tom = {name: 'Tom', age: 28}
fn.forIn(tom, prop => console.log(prop)); // name \n age
```
#### fn.isEmpty
```
/**
  * [fn.isEmpty] 判断对象是否为空对象或数组
  * @param obj 
  */
fn.isEmpty(obj: Object| Function | string | any[]): boolean;

// examples:
fn.isEmpty({});            // true
fn.isEmpty({name: 'Tom'}); // false
```
#### fn.overlay
```
/**
  * [fn.overlay] 给对象赋值
  * @param target 
  * @param source 
  * @param propList 
  */
fn.overlay(target: Object, source: Object, propList?: string[]): void;

// examples:
const tom = {name: 'Tom'};
const jerry = {name: 'Jerry', age: 28, sex: 'm'};
fn.overlay(tom, jerry, ['age', 'sex']);
console.log(tom); // {name: 'Tom', age: 28, sex: 'm'}
```
#### fn.deepCopy
```
/**
  * [fn.deepCopy] 深拷贝对象或数组
  * @param data
  */
fn.deepCopy(data: any): any;

// examples:
You know the drill...
```
#### fn.get
```
/**
  * [fn.get] 返回对象或子孙对象的属性，可判断类型
  * @param obj [Object]
  * @param chain [string]
  * @param type ['arr'|'obj'|'fun'|string|string[]]
  */
fn.get(obj: Object, chain: string, type?: 'arr'|'obj'|'fun'|string|string[]): any;

// examples:
const obj1 = {name: 'Obj', metadata: {subObj: {name: 'Tom'}}}
const obj2 = {name: 'Obj', metadata: null}
const val1 = fn.get(obj1, 'metadata/subObj/name');
const val2 = fn.get(obj2, 'metadata/subObj/name');
fn.log(val1); // Tom
fn.log(val2); // undefined
```
### Mathematic 
#### fn.random
```
/**
  * [fn.random] 返回一个指定范围的随机数
  * @param sta [number]
  * @param end [number]
  */
fn.random(sta: number, end?: number): number;

// examples:
fn.random(5);     // 2
fn.random(5);     // 3
fn.random(5, 10); // 6
fn.random(5, 10); // 9
```
#### fn.rdid
```
/**
  * [fn.rdid] 返回一个指定长度(最小4位，默认12位)的随机ID。
  * @param len [number]
  */
fn.rdid(len?: number): string;

// examples:
fn.rdid();  // 8GH9IYO60MXQ
fn.rdid(6); // 9Y0MQZ
```
#### fn.rdcolor
```
/**
  * [fn.rdcolor] 返回一个随机色值
  */
fn.rdcolor(): string;

// examples:
fn.rdcolor(); // #2913ba
```
### Time       
#### fn.interval
```
/**
  * [fn.interval] 循环定时器
  * @param timerId
  * @param duration
  * @param callback
  */
fn.interval(timerId: string, duration: number | boolean, callback?: Function): void;

// examples:
// 设置Id为test的循环定时器
fn.interval('test', 1000, () => console.log(111));
// 清除Id为test的循环定时器
fn.interval('test', false);
```
#### fn.timeout
```
/**
  * [fn.timeout] 延时定时器
  * @param timerId
  * @param duration
  * @param callback
  */
fn.timeout(timerId: string, duration: number | boolean, callback?: Function): void;

// examples:
// 设置Id为test的延时定时器
fn.timeout('test', 1000, () => console.log(111));
// 清除Id为test的延时定时器
fn.timeout('test', false);
```
#### fn.defer
```
/**
  * [fn.defer] 延迟执行函数
  * @param func 
  */
fn.defer(func: Function): void;

// 相当于:
setTimeout(func, 0);
```
#### fn.time
```
/**
  * [fn.time] 返回一个当前时间戳
  * @param time 
  */
fn.time(time: Date | string | number): number;

// examples:
fn.time();                             // 1528295152832
fn.time(new Date('2018-06-06 12:30')); // 1528259400000
```
#### fn.fmtDate
```
/**
  * [fn.fmtDate] 获取格式化的时间字符串
  * @param fmtStr 
  * @param time 
  */
fn.fmtDate(fmtStr: string, time?: Date | string | number): string;

// examples:
fn.fmtDate('yy-MM-dd hh:mm:ss');                // 18-06-06 22:31:16
fn.fmtDate('yyyy-MM-dd hh:mm', 1528259400000);  // 2018-06-06 12:30
fn.fmtDate('yy-MM-dd hh:mm', new Date('2018-06-06 12:30')); // 18-06-06 12:30
```
### String     
#### fn.encodeHtml
```
/**
  * [fn.encodeHtml] 编码HTML字符串
  * @param html 
  */
fn.encodeHtml(html: string): string;

// examples:
fn.encodeHtml('<div></div>');             // &lt;div&gt;&lt;/div&gt;
```
#### fn.decodeHtml
```
/**
  * [fn.decodeHtml] 解码HTML字符串
  * @param html 
  */
fn.decodeHtml(html: string): string;

// examples:
fn.decodeHtml('&lt;div&gt;&lt;/div&gt;'); // <div></div>
```
#### fn.fmtCurrency
```
/**
  * [fn.fmtCurrency] 格式化显示货币
  * @param number
  * @param digit
  * @returns {string}
  */
fn.fmtCurrency(number: number, digit?: number): any;

// examples:
'￥' + fn.fmtCurrency(199999999);    // ￥199,999,999.00
'￥' + fn.fmtCurrency(199999999, 4); // ￥199,999,999.0000
```
#### fn.cutString
```
/**
  * [fn.cutString] 裁切字符串到指定长度
  * @param str
  * @param len
  * @returns {string}
  */
fn.cutString(str: number, len: number): string;

// examples:
fn.cutString('test测试！', 6); // test测...
fn.cutString('test测试！', 4); // test...
```
### RegExp     
#### fn.getPattern
```
/**
  * [fn.getPattern] 获取一个通用的正则表达式
  * @param type
  * @param isNoLimit
  * @returns {pattern|undefined}
  */
fn.getPattern(type: string, isNoLimit?: boolean): any;

// examples:
fn.getPattern('email'); // /^(([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+)$/
```
#### fn.matchPattern
```
/**
  * [fn.matchPattern] 与一个或几个通用正则匹配
  * @param src
  * @param type
  * @param isNoLimit
  * @returns {boolean}
  */
fn.matchPattern(src: string, type: string | string[], isNoLimit?: boolean): boolean;

// examples:
fn.matchPattern('cntower@yahoo.com', 'email'); // true
```
### Function
#### fn.throttle
```
/**
  * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
  * @param  func
  * @param  wait
  * @param  options
  */
fn.throttle(func: Function, wait: number, options?: { leading?: boolean, trailing?: boolean }): Function;
```
#### fn.debounce
```
/**
  * [fn.debounce] 防抖函数, 适用于获取用户输入
  * @param func
  * @param wait
  * @param immediate
  */
fn.debounce(func: Function, wait: number, immediate?: boolean): Function;
```
### Url
#### fn.parseQueryString
```
/**
  * [fn.parseQueryString] 解析Url参数成对象
  * @param url [string]  default: window.location.href
  */
parseQueryString(url?: string): Object;

// examples:
const url = 'https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10';
fn.log(fn.parseQueryString(url));       // {"wd": "百度", "rsv_spt": "10"}
```
#### fn.stringfyQueryString
```
/**
  * [fn.stringfyQueryString] 把对象编译成Url参数
  * @param obj [string]  default: window.location.href
  */
stringfyQueryString(obj: Object): string;

// examples:
const params = {name: 'Tom', age: 28};
fn.log(fn.stringfyQueryString(params)); // ?name=Tom&age=28
```
### Element        
#### fn.fullScreen
```
/**
  * [fn.fullScreen] 全屏显示HTML元素
  * @param el
  * @returns {any}
  */
fn.fullScreen(el: any): void;

// examples:
fn.fullScreen($('html')[0]);
```
#### fn.exitFullScreen
```
/**
  * [fn.exitFullScreen] 退出全屏显示
  * @returns {any}
  */
fn.exitFullScreen(): void;

// examples:
fn.exitFullScreen();
```
#### fn.isFullScreen
```
/**
  * [fn.isFullScreen] 检测是否全屏状态
  * @returns {boolean}
  */
fn.isFullScreen(): boolean;

// examples:
fn.isFullScreen(); // false
```
#### fn.fullScreenChange
```
/**
  * [fn.fullScreenChange] 检测是否全屏状态
  * @param callback
  */
fullScreenChange(callback?: boolean|any): void;

// examples:
fn.isFullScreen(() => {Do something!});
fn.isFullScreen(false);
```
#### fn.pollingEl
```
/**
  * [fn.pollingEl] 轮询获取异步出现的HTML元素
  * @param selector 选择器
  * @param timeout 超时时间
  * @param options {duration: number = 250; isSelectAll: boolean = false}
  * @param callback
  */
pollingEl(selector: string|string[], timeout: number|boolean, options?: Object, callback?: Function): void;
```
#### fn.noAutoComplete
```
/**
  * [fn.noAutoComplete] 防止input密码自动填充
  * @param input [HTMLInputElement]
  * @param type ['username'|'password']
  */
noAutoComplete(input: any, type: 'username'|'password'): void;
```
### Cookie     
#### fn.setCookie
```
/**
  * [fn.setCookie] 设置Cookie
  * @param name 
  * @param value 
  * @param days 
  */
fn.setCookie(name: string, value: string, days?: number): void;

// examples:
fn.setCookie('name', 'Tom');
```
#### fn.getCookie
```
/**
  * [fn.getCookie] 根据name读取cookie
  * @param  name 
  * @return {String}
  */
fn.getCookie(name: string): string;

// examples:
fn.getCookie('name'); // 'Tom'
```
#### fn.removeCookie
```
/**
  * [fn.removeCookie] 根据name删除cookie
  * @param name 
  */
fn.removeCookie(name: string): void;

// examples:
fn.removeCookie('name'); // 'Tom'
```
### Tricks
#### fn.copyText
```
/**
  * [fn.copyText] 复制文本到粘贴板
  * @param text [string]
  */
copyText(text: string): void;
```
#### fn.extendJquery
```
/**
  * [fn.extendJquery] jQuery拓展
  * @param jquery
  */
fn.extendJquery(jquery: any): void;
```
#### $ele.findCousin
```
/**
  * [$ele.findCousin] 寻找元素的表亲
  * @param selector [string]
  * @param level    [number]
  */
$.fn.findCousin(selector: string, level: number = 0): any;
```
### Loger
#### fn.chalk
```
/**
  * [fn.chalk] 返回带颜色的字符串
  * @param value 
  * @param color 
  */
fn.chalk(value: string, color?: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'): string;

// examples:
console.log(fn.chalk('test', 'cyan'));
```
#### fn.log
```
/**
  * [fn.log] 控制台打印
  * @param value 
  * @param configs {
  * title: string,
  * width: number [20-100]
  * part: 'pre'|'end' (opt.)
  * isFmt: boolean
  * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
  * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
  * @param isFmt 
  */
fn.log(value: any, configs?: Object|string): void;

// examples:
fn.log({name: 'Tom', age: 28});
/*
==================================================================
                          funclib V2.0.5
------------------------------------------------------------------
{
  "name": "Tom",
  "age": 28
}
==================================================================*/
```
### Tools      
#### fn.rd
```
/**
  * [fn.rd] 读文件
  * @param file
  */
fn.rd(file: string): string;
```
#### fn.wt
```
/**
  * [fn.wt] 写文件
  * @param file
  * @param text
  * @param flag ['w'|'a'] default: 'w'
  */
fn.wt(file: string, text: string, flag?: 'w' | 'a'): void;
```
#### fn.cp
```
/**
  * [fn.cp] 复制文件或文件夹
  * @param src
  * @param dist
  */
fn.cp(src: string, dist: string): void;
```
#### fn.mv
```
/**
  * [fn.mv] 移动文件或文件夹
  * @param src
  * @param dist
  */
fn.mv(src: string, dist: string): void;
```
#### fn.rm
```
/**
  * [fn.rm] 删除文件或文件夹
  * @param src
  */
fn.rm(src: string): void;
```
#### fn.mk
```
/**
  * [fn.mk] 创建文件夹
  * @param dist
  */
fn.mk(dist: string): void;
```
### Progress      
#### fn.progress.start
```
/**
  * [fn.progress.start] 开启进度，并传入参数
  * @param options {title: string, width: number (base: 40)} | 'message'
  */
fn.start(options: any): void;
```
#### fn.progress.stop
```
/**
  * [fn.progress.stop] 结束进度，结束后触发回调
  * @param options 
  */
fn.stop(onStopped?: Function): void;
```
### Version
#### fn.version
返回当前函数库版本
```
/**
  * [fn.version] 返回一个指定长度和默认值的数组
  */

// examples:
fn.version;  // V2.0.5
```