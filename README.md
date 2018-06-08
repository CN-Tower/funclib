# funclib.js (凡客杰斯)
[![npm](https://img.shields.io/npm/v/funclib.svg)
![LICENSE MIT](https://img.shields.io/npm/l/funclib.svg)
![Build Status](https://travis-ci.org/CN-Tower/funclib.js.svg?branch=master) 
![Coverage](https://coveralls.io/repos/github/CN-Tower/funclib.js/badge.svg?branch=master) 
](https://www.npmjs.com/package/funclib) 

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
> console.log(fn.rdId()) // => 8GH9IYO60MXQ
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

# DoTry
$ npm run dist

# Build
$ npm run build

# Test
$ npm run test
```

## Structure
```
funclib.js
├── node_modules/           # You know the drill...
├── dist                    # 构建目录
│   ├── funclib.d.ts        # 定义文件
│   ├── funclib.min.js      # 生成的UMD文件
│   ├── index.js            # Index
│   ├── package.json        # 库模块定义
│   └── README.md           # Read this FIRST :)
├── script                  # 脚本
│   ├── build.js            # 编译脚本
│   └── webpack.conf.js     # Webpack配置
├── src                     # Source code
│   ├── asstes              # 静态文件
│   │   ├── funclib.d.ts    # 定义文件
│   │   ├── index.js        # Index
│   │   └── package.json    # 库模块定义
│   ├── configs             # 配置
│   │   ├── fnConf.ts       # 特殊方法
│   │   └── keyMap.ts       # 键映射表
│   ├── modules             # 模块
│   │   ├── $.extends.ts    # jQuery拓展
│   │   ├── array.ts        # Array
│   │   ├── cookie.ts       # Cookie
│   │   ├── dom.ts          # DOM
│   │   ├── events.ts       # Events
│   │   ├── loger.ts        # Loger
│   │   ├── math.ts         # Mathematic
│   │   ├── object.ts       # Object
│   │   ├── patterns.ts     # RegExp
│   │   ├── progress.ts     # 进度条工具
│   │   ├── string.ts       # String
│   │   ├── table.ts        # Bootstrap表格
│   │   ├── time.ts         # Time
│   │   └── tools.ts        # NodeJs工具
│   └── funclib.ts          # Main函数
├── test                    # 测试
│   ├── client-methods      # 客户端方法测试用例
│   ├── server-methods      # 服务端方法测试用例
│   └── *.spec.js           # 通用方法测试用例
├── .coveralls.yml          # 测试覆盖率
├── .editorconfig           # Set coding style (indents, charset, etc.)
├── .gitignore              # You know the drill...
├── .travis.yml             # CI配置
├── app.js                  # 服务端试验
├── funclib.html            # 客户端试验
├── LICENSE                 # 授权说明
├── package-lock.json       # NPM Lock
├── package.json            # 库配置
├── README.md               # Read this FIRST :)
└── tsconfig.json           # Typescript配置
```

## Document (CM: Client side method, SM: Server side method)
### CONTENT
#### Version
[fn.version](#fnversion)&nbsp;&nbsp;返回当前函数库版本
#### Array      
[fn.array](#fnarray)&nbsp;&nbsp;返回指定长度和默认值的数组<br/>
[fn.toArr](#fntoarr)&nbsp;&nbsp;值数组化<br/>
[fn.sortByField](#fnsortbyfield)&nbsp;&nbsp;对象数组根据字段排序
#### Object     
[fn.len](#fnlen)&nbsp;&nbsp;获取对象自有属性的个数<br/>
[fn.isEmpty](#fnisempty)&nbsp;&nbsp;判断对象是否为空对象或数组<br/>
[fn.overlay](#fnoverlay)&nbsp;&nbsp;给对象赋值，可指定字段<br/>
[fn.deepCopy](#fndeepcopy)&nbsp;&nbsp;深拷贝数组或对象
#### Mathematic 
[fn.random](#fnrandom)&nbsp;&nbsp;返回指定范围的随机数<br/>
[fn.rdId](#fnrdid)&nbsp;&nbsp;返回指定长度(最小6位)的随机ID<br/>
[fn.rdColor](#fnrdcolor)&nbsp;&nbsp;返回一个随机色值
#### Time       
[fn.interval](#fninterval)&nbsp;&nbsp;循环定时器<br/>
[fn.timeout](#fntimeout)&nbsp;&nbsp;延时定时器<br/>
[fn.timeStamp](#fntimestamp)&nbsp;&nbsp;返回一个当前时间戳<br/>
[fn.fmtDate](#fnfmtdate)&nbsp;&nbsp;获取格式化的时间字符串
#### String     
[fn.encodeHtml](#fnencodehtml)&nbsp;&nbsp;编码HTML字符串<br/>
[fn.decodeHtml](#fndecodehtml)&nbsp;&nbsp;解码HTML字符串<br/>
[fn.currency](#fncurrency)&nbsp;&nbsp;格式化显示货币<br/>
[fn.cutString](#fncutstring)&nbsp;&nbsp;裁切字符串到指定长度
#### RegExp     
[fn.getPattern](#fngetpattern)&nbsp;&nbsp;获取一个通用的正则表达式<br/>
[fn.matchPattern](#fnmatchpattern)&nbsp;&nbsp;与一个或几个通用正则匹配
#### Events     
[fn.getKeyCodeByName](#fngetkeycodebyname)&nbsp;&nbsp;根据键名获取键码<br/>
[fn.getKeyNameByCode](#fngetkeynamebycode)&nbsp;&nbsp;根据键码获取键名
#### Dom        
[fn.fullScreen](#fnfullscreen)&nbsp;&nbsp;全屏显示一个HTML元素<br/>
[fn.exitFullScreen](#fnexitfullscreen)&nbsp;&nbsp;退出全屏显示<br/>
[fn.checkIsFullScreen](#fncheckisfullscreen)&nbsp;&nbsp;检测是否处理全屏状态
#### Cookie     
[fn.setCookie](#fnsetcookie)&nbsp;&nbsp;设置Cookie<br/>
[fn.getCookie](#fngetcookie)&nbsp;&nbsp;根据name读取cookie<br/>
[fn.removeCookie](#fnremovecookie)&nbsp;&nbsp;根据name删除cookie
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
#### Table 
[fn.initBootstrapTable](#fninitbootstraptable)&nbsp;&nbsp;初始化Bootstrap表格工具<br/>
[fn.table.render](#fntablerender)&nbsp;&nbsp;渲染Bootstrap表格
#### ExtendJq      
[$.pollingElement](#pollingelement)&nbsp;&nbsp;jQuery获取异步出现的元素<br/>
[$.noAutoComplete](#noautocomplete)&nbsp;&nbsp;jQuery禁止input密码自动填充<br/>
[$.copyText](#copytext)&nbsp;&nbsp;jQuery复制文本到粘贴板<br/>
[$ele.findCousin](#elefindcousin)&nbsp;&nbsp;jQuery获取元素表亲
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
#### fn.toArr
```
/**
* [fn.toArr] 值数组化
* @param src 
*/
fn.toArr(src: any): any[];

// examples:
fn.toArr('str');   // ['str']
fn.toArr(['str']); // ['str']
```
#### fn.sortByField
```
/**
* [fn.sortByField] 对象数组根据字段排序
* @param tableData
* @param field
* @param isDesc
*/
fn.sortByField(tableData: any, field: string, isDesc?: boolean): any;

// examples:
const person = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}]
fn.sortByField(); //[{name:'Jerry', age: 18}, {name:'Tom', age: 22}]
```
### Object     
#### fn.len
```
/**
* [fn.len] 获取对象自有属性的个数
* @arg obj [object]
*/
fn.len(obj: any): number;

// examples:
fn.len({name: 'Tom'});       // 1
fn.len(['x']);               // 1
fn.len(x => console.log(s)); // 1
```
#### fn.isEmpty
```
/**
* [fn.isEmpty] 判断对象是否为空对象或数组
* @param obj 
*/
fn.isEmpty(obj: Object | any[]): boolean;

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
#### fn.rdId
```
/**
* [fn.rdId] 返回一个指定长度(最小4位，默认12位)的随机ID。
* @param len [number]
*/
fn.rdId(len?: number): string;

// examples:
fn.rdId();  // 8GH9IYO60MXQ
fn.rdId(6); // 9Y0MQZ
```
#### fn.rdColor
```
/**
* [fn.rdColor] 返回一个随机色值
*/
fn.rdColor(): string;

// examples:
fn.rdColor(); // #2913ba
```
### Time       
#### fn.interval
```
/**
* [fn.interval] 循环定时器
* @param timerId
* @param duration
* @param func
*/
fn.interval(timerId: string, duration: number | boolean, func?: Function): void;

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
* @param func
*/
fn.timeout(timerId: string, duration: number | boolean, func?: Function): void;

// examples:
// 设置Id为test的延时定时器
fn.timeout('test', 1000, () => console.log(111));
// 清除Id为test的延时定时器
fn.timeout('test', false);
```
#### fn.timeStamp
```
/**
* [fn.timeStamp] 返回一个当前时间戳
*/
fn.timeStamp(date?: Date | string): number;

// examples:
fn.timeStamp();                             // 1528295152832
fn.timeStamp(new Date('2018-06-06 12:30')); // 1528259400000
```
#### fn.fmtDate
```
/**
* [fn.fmtDate] 获取格式化的时间字符串
* @param fmtStr 
* @param time 
*/
fn.fmtDate(fmtStr: string, time?: any): string;

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
#### fn.currency
```
/**
* [fn.currency] 格式化显示货币
* @param number
* @param digit
* @returns {string}
*/
fn.currency(number: number, digit?: number): any;

// examples:
'￥' + fn.currency(199999999);    // ￥199,999,999.00
'￥' + fn.currency(199999999, 4); // ￥199,999,999.0000
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
### Events     
#### fn.getKeyCodeByName
```
/**
* [fn.getKeyCodeByName] 根据键名获取键码
* @param keyName 
*/
fn.getKeyCodeByName(keyName: string): number;

// examples:
fn.getKeyCodeByName('Ctrl'); // 17
```
#### fn.getKeyNameByCode
```
/**
* [fn.getKeyCodeByName] 根据键码获取键名
* @param keyName 
*/
fn.getKeyNameByCode(keyCode: number): string;

// examples:
fn.getKeyNameByCode(38); // Up
```
### DOM        
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
#### fn.checkIsFullScreen
```
/**
* [fn.checkIsFullScreen] 检测是否全屏状态
* @returns {boolean}
*/
fn.checkIsFullScreen(): boolean;

// examples:
fn.checkIsFullScreen(); // false
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
* lineLen: number [20-100]
* part: 'pre'|'end' (opt.)
* color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
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
### Table 
#### fn.initBootstrapTable
```
/**
* [fn.initBootstrapTable] 初始化一个BootstrapTable对象
* @param translate [Object]
*/
fn.initBootstrapTable(translate?: Object): void;
```
#### fn.table.render
```
/**
* [fn.table.render] 渲染Bootstrap表格
* @param $table
* @param options
    * tableConfig {Object Opt.}
    * gridOptions {Object Opt.},
    * tableLabel {String Opt.},
    * showLoading {Boolean Opt.},
    * tableScope {String Opt.},
    * onRefreshing {Function Opt.},
    * onRendered {Function Opt.}
*/
fn.render($table: any, options: any): void;
```
### ExtendJq      
#### $.pollingElement
```
/**
* [$.pollingElement] 轮询获取异步出现的jQuery元素
* @param timerId
* @param selector
* @param interval
* @param func [opt.]
*/
$.pollingElement(timerId: string, selector: boolean | string | any[], interval: number, func?: Function): void;
```
#### $.noAutoComplete
```
/**
* [$.noAutoComplete] 防止input密码自动填充
* @param options [{type: 'username'|'password', $input: $(input)} | [{}]]
*/
$.noAutoComplete(options: Object | Object[]): void;
```
#### $.copyText
```
/**
* [$.copyText] 复制文本到粘贴板
* @param text [string]
*/
$.copyText(text: string): void;
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
