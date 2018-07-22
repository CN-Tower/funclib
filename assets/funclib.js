(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = new (factory().FuncLib)();
	else if(typeof define === 'function' && define.amd)
		define('fn', [], function() {return new (factory().FuncLib)()});
	else if(typeof exports === 'object')
		exports["fn"] = new (factory().FuncLib)();
	else
		root["fn"] = new (factory().FuncLib)();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = 'v2.1.13';
exports.SERVER_METHODS = [
    'chalk'
];
exports.CLIENT_METHODS = [
    'setCookie',
    'getCookie',
    'removeCookie',
    'fullScreen',
    'exitFullScreen',
    'isFullScreen',
    'fullScreenChange',
    'pollingEl',
    'noAutoComplete',
    'copyText'
];
exports.INIT_METHODS = [
    'deleteProp',
    'initTricks',
    'initFileSystem',
    'initProgress'
];
exports.COLOR_LIST = {
    'grey': '\x1B[90m%s\x1B[0m',
    'blue': '\x1B[34m%s\x1B[0m',
    'cyan': '\x1B[36m%s\x1B[0m',
    'green': '\x1B[32m%s\x1B[0m',
    'magenta': '\x1B[35m%s\x1B[0m',
    'red': '\x1B[31m%s\x1B[0m',
    'yellow': '\x1B[33m%s\x1B[0m'
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var _Type_1 = __webpack_require__(3);
var _Array_1 = __webpack_require__(4);
var _Object_1 = __webpack_require__(5);
var _String_1 = __webpack_require__(6);
var _Time_1 = __webpack_require__(7);
var _RegExp_1 = __webpack_require__(8);
var _Math_1 = __webpack_require__(9);
var _Function_1 = __webpack_require__(10);
var _Cookie_1 = __webpack_require__(11);
var _Dom_1 = __webpack_require__(12);
var _Loger_1 = __webpack_require__(13);
var _FileSys_1 = __webpack_require__(14);
var _Progress_1 = __webpack_require__(15);
var _Trick_1 = __webpack_require__(16);
var _Url_1 = __webpack_require__(17);
var funclib_conf_1 = __webpack_require__(1);
var isClient;
var FuncLib = /** @class */ (function () {
    function FuncLib() {
        var _this = this;
        this.version = funclib_conf_1.VERSION;
        this.deleteProp = function (prop) {
            delete _this[prop];
            if (_this['__proto__']) {
                delete _this['__proto__'][prop];
            }
        };
        if (typeof window === 'object' && window.window === window) {
            isClient = true;
            this.initTricks();
            funclib_conf_1.SERVER_METHODS.forEach(function (prop) { return _this.deleteProp(prop); });
        }
        else if (typeof global === 'object' && global.global === global) {
            isClient = false;
            this.initFileSystem();
            this.initProgress();
            funclib_conf_1.CLIENT_METHODS.forEach(function (prop) { return _this.deleteProp(prop); });
        }
        else {
            isClient = false;
            funclib_conf_1.SERVER_METHODS.forEach(function (prop) { return _this.deleteProp(prop); });
            funclib_conf_1.CLIENT_METHODS.forEach(function (prop) { return _this.deleteProp(prop); });
        }
        funclib_conf_1.INIT_METHODS.forEach(function (initMethod) { return delete _this[initMethod]; });
    }
    /**
     * [fn.typeOf] 检查值的类型，返回布尔值
     * @param value
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    FuncLib.prototype.typeOf = function (value, type) {
        return _Type_1.FnType.typeOf.call(this, value, type);
    };
    /**
     * [fn.typeValue] 检查值的类型，true则返回该值，否则返回false
     * @param value
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    FuncLib.prototype.typeValue = function (value, type) {
        return _Type_1.FnType.typeValue.call(this, value, type);
    };
    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param length [number]
     * @param value  [any, function]
     */
    FuncLib.prototype.array = function (length, value) {
        return _Array_1.FnArray.array(length, value);
    };
    /**
     * [fn.toArray] 值数组化
     * @param src
     */
    FuncLib.prototype.toArray = function (src) {
        return _Array_1.FnArray.toArray(src);
    };
    /**
     * [fn.find] 根据条件寻找值
     * @param src
     * @param predicate
     */
    FuncLib.prototype.find = function (src, predicate) {
        return _Array_1.FnArray.find.call(this, src, predicate);
    };
    /**
     * [fn.filter] 根据条件取过滤值
     * @param src
     * @param predicate
     */
    FuncLib.prototype.filter = function (src, predicate) {
        return _Array_1.FnArray.filter.call(this, src, predicate);
    };
    /**
     * [fn.reject] 根据条件过滤值
     * @param src
     * @param predicate
     */
    FuncLib.prototype.reject = function (src, predicate) {
        return _Array_1.FnArray.reject.call(this, src, predicate);
    };
    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param src
     * @param predicate
     */
    FuncLib.prototype.contains = function (src, predicate) {
        return _Array_1.FnArray.contains.call(this, src, predicate);
    };
    /**
    * [fn.findIndex] 寻找值在数组中的索引
    * @param src
    * @param predicate
    */
    FuncLib.prototype.findIndex = function (src, predicate) {
        return _Array_1.FnArray.findIndex.call(this, src, predicate);
    };
    /**
     * [fn.sortBy] 对象数组根据字段排序
     * @param data
     * @param field
     * @param isDesc
     */
    FuncLib.prototype.sortBy = function (data, field, isDesc) {
        return _Array_1.FnArray.sortBy.call(this, data, field, isDesc);
    };
    /**
     * [fn.len] 获取对象自有属性的个数
     * @arg obj
     */
    FuncLib.prototype.len = function (obj) {
        return _Object_1.FnObject.len(obj);
    };
    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @arg obj
     * @arg callback
     */
    FuncLib.prototype.forIn = function (obj, callback) {
        return _Object_1.FnObject.forIn(obj, callback);
    };
    /**
     * [fn.isEmpty] 判断对象是否为空对象或数组
     * @param obj
     */
    FuncLib.prototype.isEmpty = function (obj) {
        return _Object_1.FnObject.isEmpty(obj);
    };
    /**
     * [fn.overlay] 给对象赋值
     * @param target
     * @param source
     * @param propList
     */
    FuncLib.prototype.overlay = function (target, source, propList) {
        return _Object_1.FnObject.overlay(target, source, propList);
    };
    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param data
     */
    FuncLib.prototype.deepCopy = function (data) {
        return _Object_1.FnObject.deepCopy(data);
    };
    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param obj [Object]
     * @param layers [string]
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    FuncLib.prototype.get = function (obj, layers, type) {
        return _Object_1.FnObject.get.call(this, obj, layers, type);
    };
    /**
     * [fn.random] 返回一个指定范围内的随机数
     * @param sta
     * @param end
     */
    FuncLib.prototype.random = function (sta, end) {
        return _Math_1.FnMath.random(sta, end);
    };
    /**
     * [fn.rdid] 返回一个指定长度（最小4位）的随机ID
     * @param len
     */
    FuncLib.prototype.rdid = function (len) {
        if (len === void 0) { len = 12; }
        return _Math_1.FnMath.rdid.call(this, len);
    };
    /**
     * [fn.rdcolor] 返回一个随机颜色色值
     */
    FuncLib.prototype.rdcolor = function () {
        return _Math_1.FnMath.rdcolor();
    };
    /**
     * [fn.interval] 循环定时器
     * @param timerId
     * @param duration
     * @param callback
     */
    FuncLib.prototype.interval = function (timerId, duration, callback) {
        return _Time_1.FnTime.interval(timerId, duration, callback);
    };
    /**
     * [fn.timeout] 延时定时器
     * @param timerId
     * @param duration
     * @param callback
     */
    FuncLib.prototype.timeout = function (timerId, duration, callback) {
        return _Time_1.FnTime.timeout(timerId, duration, callback);
    };
    /**
     * [fn.defer] 延迟执行函数
     * @param func
     */
    FuncLib.prototype.defer = function (func) {
        return _Time_1.FnTime.defer(func);
    };
    /**
     * [fn.time] 返回一个当前时间戳
     * @param time
     */
    FuncLib.prototype.time = function (time) {
        return _Time_1.FnTime.time(time);
    };
    /**
     * [fn.fmtDate] 获取格式化的时间字符串
     * @param fmtStr
     * @param time
     */
    FuncLib.prototype.fmtDate = function (fmtStr, time) {
        return _Time_1.FnTime.fmtDate(fmtStr, time);
    };
    /**
     * [fn.encodeHtml] 编码HTML字符串
     * @param html
     */
    FuncLib.prototype.encodeHtml = function (html) {
        return _String_1.FnString.encodeHtml(html);
    };
    /**
     * [fn.decodeHtml] 解码HTML字符串
     * @param html
     */
    FuncLib.prototype.decodeHtml = function (html) {
        return _String_1.FnString.decodeHtml(html);
    };
    /**
     * [fn.fmtCurrency] 格式化显示货币
     * @param number
     * @param digit
     * @returns {string}
     */
    FuncLib.prototype.fmtCurrency = function (number, digit) {
        if (digit === void 0) { digit = 2; }
        return _String_1.FnString.fmtCurrency(number, digit);
    };
    /**
     * [fn.cutString] 裁切字符串到指定长度
     * @param str
     * @param len
     * @returns {string}
     */
    FuncLib.prototype.cutString = function (str, len) {
        return _String_1.FnString.cutString.call(this, str, len);
    };
    /**
     * [fn.getPattern] 与一个或几个通用正则匹配
     * @param type
     * @param isNoLimit
     * @returns {pattern|undefined}
     */
    FuncLib.prototype.getPattern = function (type, isNoLimit) {
        if (isNoLimit === void 0) { isNoLimit = false; }
        return _RegExp_1.FnRegExp.getPattern(type, isNoLimit);
    };
    /**
     * [fn.matchPattern] 获取一个通用的正则表达式
     * @param src
     * @param type
     * @param isNoLimit
     * @returns {boolean}
     */
    FuncLib.prototype.matchPattern = function (src, type, isNoLimit) {
        if (isNoLimit === void 0) { isNoLimit = false; }
        return _RegExp_1.FnRegExp.matchPattern(src, type, isNoLimit);
    };
    /**
     * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
     * @param  func
     * @param  wait
     * @param  options
     */
    FuncLib.prototype.throttle = function (func, wait, options) {
        return _Function_1.FnFunction.throttle.call(this, func, wait, options);
    };
    /**
     * [fn.debounce] 防抖函数, 适用于获取用户输入
     * @param func
     * @param wait
     * @param immediate
     */
    FuncLib.prototype.debounce = function (func, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        return _Function_1.FnFunction.debounce(func, wait, immediate);
    };
    /**
     * [fn.parseQueryString] 解析Url参数成对象
     * @param url [string]  default: window.location.href
     */
    FuncLib.prototype.parseQueryString = function (url) {
        return _Url_1.FnUrl.parseQueryString(url);
    };
    /**
     * [fn.stringfyQueryString] 把对象编译成Url参数
     * @param obj [string]  default: window.location.href
     */
    FuncLib.prototype.stringfyQueryString = function (obj) {
        return _Url_1.FnUrl.stringfyQueryString.call(this, obj);
    };
    /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el
     * @returns {any}
     */
    FuncLib.prototype.fullScreen = function (el) {
        return _Dom_1.FnDom.fullScreen(el);
    };
    /**
     * [fn.exitFullScreen] 退出全屏显示
     * @returns {any}
     */
    FuncLib.prototype.exitFullScreen = function () {
        return _Dom_1.FnDom.exitFullScreen();
    };
    /**
     * [fn.isFullScreen] 检测是否全屏状态
     * @returns {boolean}
     */
    FuncLib.prototype.isFullScreen = function () {
        return _Dom_1.FnDom.isFullScreen();
    };
    /**
     * [fn.fullScreenChange] 检测是否全屏状态
     * @param callback
     */
    FuncLib.prototype.fullScreenChange = function (callback) {
        return _Dom_1.FnDom.fullScreenChange(callback);
    };
    /**
     * [fn.pollingEl] 轮询获取异步出现的HTML元素
     * @param selector 选择器
     * @param timeout 超时时间
     * @param options {duration: number = 250; isSelectAll: boolean = false}
     * @param callback
     */
    FuncLib.prototype.pollingEl = function (selector, timeout, options, callback) {
        return _Dom_1.FnDom.pollingEl.call(this, selector, timeout, options, callback);
    };
    /**
     * [fn.noAutoComplete] 防止input密码自动填充
     * @param input [HTMLInputElement]
     * @param type ['username'|'password']
     */
    FuncLib.prototype.noAutoComplete = function (input, type) {
        return _Dom_1.FnDom.noAutoComplete(input, type);
    };
    /**
     * [fn.setCookie] 设置Cookie
     * @param name
     * @param value
     * @param days
     */
    FuncLib.prototype.setCookie = function (name, value, days) {
        if (days === void 0) { days = 0; }
        return _Cookie_1.FnCookie.setCookie(name, value, days);
    };
    /**
     * [fn.getCookie] 根据name读取cookie
     * @param  name
     * @return {String}
     */
    FuncLib.prototype.getCookie = function (name) {
        return _Cookie_1.FnCookie.getCookie(name);
    };
    /**
     * [fn.removeCookie] 根据name删除cookie
     * @param name
     */
    FuncLib.prototype.removeCookie = function (name) {
        return _Cookie_1.FnCookie.removeCookie(name);
    };
    /**
     * [fn.copyText] 复制文本到粘贴板
     * @param text [string]
     */
    FuncLib.prototype.copyText = function (text) {
        return _Trick_1.FnTrick.copyText(text);
    };
    /**
     * [fn.chalk] 在控制台打印有颜色的字符串
     * @param value
     * @param color
     */
    FuncLib.prototype.chalk = function (value, color) {
        return _Loger_1.FnLoger.chalk(value, color);
    };
    /**
     * [fn.log] 控制台格式化打印值
     * @param value
     * @param configs {
     * title: string,
     * width: number [20-100]
     * part: 'pre'|'end' [S]
     * isFmt: boolean
     * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [S]
     * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
     * @param isFmt
     */
    FuncLib.prototype.log = function (value, configs, isFmt) {
        if (isFmt === void 0) { isFmt = true; }
        return _Loger_1.FnLoger.log.call(this, isClient, value, configs, isFmt);
    };
    /**
     * 初始化NodeJs工具
     */
    FuncLib.prototype.initFileSystem = function () {
        var tools = new _FileSys_1.FnFileSys();
        /**
         * [fn.rd] 读文件
         * @param file
         */
        this['rd'] = function (file) { return tools.rd(file); };
        /**
         * [fn.wt] 写文件
         * @param file
         * @param text
         * @param flag ['w'|'a'] default: 'w'
         */
        this['wt'] = function (file, text, flag) {
            if (flag === void 0) { flag = 'w'; }
            return tools.wt(file, text, flag);
        };
        /**
         * [fn.cp] 复制文件或文件夹
         * @param src
         * @param dist
         */
        this['cp'] = function (src, dist) { return tools.cp(src, dist); };
        /**
         * [fn.mv] 移动文件或文件夹
         * @param src
         * @param dist
         */
        this['mv'] = function (src, dist) { return tools.mv(src, dist); };
        /**
         * [fn.rm] 删除文件或文件夹
         * @param src
         */
        this['rm'] = function (src) { return tools.rm(src); };
        /**
         * [fn.mk] 创建文件夹
         * @param dist
         */
        this['mk'] = function (dist) { return tools.mk(dist); };
    };
    /**
     * 初始化进度条工具
     */
    FuncLib.prototype.initProgress = function () {
        var _this = this;
        this['progress'] = {};
        /**
         * [fn.progress.start] 开启进度条，并传入参数
         * @param options {title: string, width: number (base: 40)}
         */
        this['progress']['start'] = function (options) {
            return _Progress_1.FnProgress.start.call(_this, options);
        };
        /**
         * [fn.progress.stop] 结束进度条，结束后触发回调
         * @param onStopped
         */
        this['progress']['stop'] = function (onStopped) {
            return _Progress_1.FnProgress.stop(onStopped);
        };
    };
    FuncLib.prototype.initTricks = function () {
        if (isClient) {
            if (!_Trick_1.FnTrick.extendJquery()) {
                this['extendJquery'] = function (jquery) { return _Trick_1.FnTrick.extendJquery(jquery); };
            }
        }
    };
    return FuncLib;
}());
exports.FuncLib = FuncLib;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnType = /** @class */ (function () {
    function FnType() {
    }
    /**
     * [fn.typeOf] 检查值的类型
     * @param value
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    FnType.typeOf = function (value, type) {
        var types = this.toArray(type);
        if (types.length === 0) {
            return false;
        }
        return types.some(function (type) {
            switch (type) {
                case 'arr': return value && value instanceof Array;
                case 'obj': return value && typeof value === 'object' && !(value instanceof Array);
                case 'fun': return value && typeof value === 'function';
                case 'str': return typeof value === 'string';
                case 'num': return typeof value === 'number';
                case 'bol': return typeof value === 'boolean';
                case 'udf': return typeof value === 'undefined';
                default: return typeof value === type;
            }
        });
    };
    /**
     * [fn.typeValue] 检查是否为某类型的值，是则返回该值，不是则返回false
     * @param value
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    FnType.typeValue = function (value, type) {
        return this.typeOf(value, type) && value;
    };
    return FnType;
}());
exports.FnType = FnType;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnArray = /** @class */ (function () {
    function FnArray() {
    }
    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param length [number]
     * @param value  [any, function]
     */
    FnArray.array = function (length, value) {
        var tmpArr = [];
        var isUndefied = value === undefined;
        var isFunction = typeof value === 'function';
        var tmpVal = 0;
        for (var i = 0; i < length; i++) {
            if (isUndefied) {
                tmpArr.push(tmpVal);
                tmpVal++;
            }
            else if (isFunction) {
                tmpArr.push(value());
            }
            else {
                tmpArr.push(value);
            }
        }
        return tmpArr;
    };
    /**
     * [fn.toArray] 值数组化
     * @param src
     */
    FnArray.toArray = function (src) {
        return src instanceof Array ? src : [src];
    };
    /**
     * [fn.find] 根据条件取值
     * @param src
     * @param predicate
     */
    FnArray.find = function (src, predicate) {
        var idx = this.findIndex(src, predicate);
        return idx > -1 ? src[idx] : undefined;
    };
    /**
     * [fn.filter] 根据条件取过滤值
     * @param src
     * @param predicate
     */
    FnArray.filter = function (src, predicate) {
        return FnArray._filter.call(this, src, predicate, true);
    };
    /**
     * [fn.reject] 根据条件过滤值
     * @param src
     * @param predicate
     */
    FnArray.reject = function (src, predicate) {
        return FnArray._filter.call(this, src, predicate, false);
    };
    /**
     * 过滤函数
     * @param src
     * @param predicate
     */
    FnArray._filter = function (src, predicate, isFlt) {
        var isPrdObj = this.typeOf(predicate, 'obj');
        var isPrdFun = this.typeOf(predicate, 'fun');
        var ftItems = [];
        var rjItems = [];
        src.forEach(function (item) {
            if (isPrdObj) {
                if (Object.keys(predicate).every(function (k) { return predicate[k] === item[k]; })) {
                    ftItems.push(item);
                }
                else {
                    rjItems.push(item);
                }
            }
            else if (isPrdFun) {
                predicate(item) ? ftItems.push(item) : rjItems.push(item);
            }
        });
        return isFlt ? ftItems : rjItems;
    };
    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param src
     * @param predicate
     */
    FnArray.contains = function (src, predicate) {
        var idx = this.findIndex(src, predicate);
        return idx > -1;
    };
    /**
     * [fn.findIndex] 寻找值在数组中的索引
     * @param src
     * @param predicate
     */
    FnArray.findIndex = function (src, predicate) {
        var isPrdObj = this.typeOf(predicate, 'obj');
        var isPrdFun = this.typeOf(predicate, 'fun');
        var _loop_1 = function (i) {
            if (isPrdObj) {
                if (Object.keys(predicate).every(function (k) { return src[i].hasOwnProperty(k); })) {
                    return { value: i };
                }
            }
            else if (isPrdFun) {
                if (predicate(src[i]))
                    return { value: i };
            }
        };
        for (var i = 0; i < src.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return src.indexOf(predicate);
    };
    /**
     * [fn.sortBy] 对象数组根据字段排序
     * @param data
     * @param field
     * @param isDesc
     */
    FnArray.sortBy = function (data, field, isDesc) {
        var _this = this;
        if (isDesc === void 0) { isDesc = false; }
        return data.sort(function (row1, row2) {
            var _a = [_this.get(row1, field), _this.get(row2, field)], rst1 = _a[0], rst2 = _a[1];
            if ([rst1, rst2].every(function (x) { return x === 0 || !!x; }) && rst1 !== rst2) {
                return rst1 > rst2 && isDesc ? -1 : 1;
            }
            else
                return 0;
        });
    };
    return FnArray;
}());
exports.FnArray = FnArray;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnObject = /** @class */ (function () {
    function FnObject() {
    }
    /**
     * [fn.len] 获取对象自有属性的个数
     * @arg obj [object]
     */
    FnObject.len = function (obj) {
        if (obj && typeof obj === 'object' && !(obj instanceof Array)) {
            return Object.keys(obj).length;
        }
        else {
            return obj && obj[length] || undefined;
        }
    };
    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @arg obj
     * @arg callback
     */
    FnObject.forIn = function (obj, callback) {
        return Object.keys(obj).forEach(callback);
    };
    /**
     * [fn.isEmpty] 判断对象是否为空对象或数组
     * @param obj
     */
    FnObject.isEmpty = function (obj) {
        return obj && !this.len(obj) || false;
    };
    /**
     * [fn.overlay] 给对象赋值
     * @param target
     * @param source
     * @param propList
     */
    FnObject.overlay = function (target, source, propList) {
        if (source) {
            if (propList && propList.length > 0) {
                propList.forEach(function (prop) {
                    if (source.hasOwnProperty(prop)) {
                        target[prop] = source[prop];
                    }
                });
            }
            else {
                Object.keys(source).forEach(function (key) {
                    target[key] = source[key];
                });
            }
        }
        return target;
    };
    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param data
     */
    FnObject.deepCopy = function (data) {
        if (typeof data !== 'object') {
            return data;
        }
        var tmpData;
        if (data instanceof Array) {
            tmpData = [];
            for (var i = 0; i < data.length; i++) {
                tmpData.push(this.deepCopy(data[i]));
            }
        }
        else {
            tmpData = {};
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    tmpData[key] = this.deepCopy(data[key]);
                }
            }
        }
        return tmpData;
    };
    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param obj [Object]
     * @param layers [string]
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    FnObject.get = function (obj, layers, type) {
        if (!obj || !layers || !layers.trim()) {
            return undefined;
        }
        var lys = layers.trim().split('/');
        var prop = lys[0] || lys[1];
        if (lys.length === lys.indexOf(prop) + 1) {
            return type ? this.typeValue(obj[prop], type) : obj[prop];
        }
        else {
            if (this.typeOf(obj[prop], ['obj', 'arr'])) {
                if (lys.indexOf(prop)) {
                    lys.shift();
                }
                lys.shift();
                return this.get(obj[prop], lys.join('/'), type);
            }
            else {
                return undefined;
            }
        }
    };
    return FnObject;
}());
exports.FnObject = FnObject;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnString = /** @class */ (function () {
    function FnString() {
    }
    /**
     * [fn.encodeHtml] 编码HTML字符串
     * @param html
     */
    FnString.encodeHtml = function (html) {
        var _this = this;
        this.htmlMap.src.forEach(function (src, i) { return html = html.replace(new RegExp(src, 'g'), _this.htmlMap.map[i]); });
        return html;
    };
    /**
     * [fn.decodeHtml] 解码HTML字符串
     * @param html
     */
    FnString.decodeHtml = function (html) {
        var _this = this;
        this.htmlMap.map.forEach(function (map, i) { return html = html.replace(new RegExp(map, 'g'), _this.htmlMap.src[i]); });
        return html;
    };
    /**
   * [fn.fmtCurrency] 格式化显示货币
   * @param number
   * @param digit
   * @returns {string}
   */
    FnString.fmtCurrency = function (number, digit) {
        var nbArr = String(number.toFixed(digit)).split('.');
        var integer = nbArr[0];
        var decimal = nbArr.length > 1 ? nbArr[1] : '';
        var integerStr, spn, sti, i;
        spn = Math.floor(integer.length / 3);
        sti = integer.length % 3;
        integerStr = integer.substr(0, sti);
        for (i = 0; i < spn; i++) {
            integerStr += (i === 0 && !integerStr) ? integer.substr(sti, 3) : ',' + integer.substr(sti, 3);
            sti += 3;
        }
        return decimal ? integerStr + '.' + decimal : integerStr;
    };
    /**
     * [fn.cutString] 裁切字符串到指定长度
     * @param str
     * @param len
     * @returns {string}
     */
    FnString.cutString = function (str, len) {
        var tmpStr = '';
        var count = 0;
        var tmpChar;
        for (var i = 0; i < str.length; i++) {
            if (count < len) {
                tmpChar = str.substr(i, 1);
                tmpStr += tmpChar;
                count += this.matchPattern(tmpChar, 'cnChar') ? 2 : 1;
            }
            else {
                break;
            }
        }
        return tmpStr + '...';
    };
    FnString.htmlMap = {
        src: ['&', '<', '>', ' ', '\'', '"'],
        map: ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;']
    };
    return FnString;
}());
exports.FnString = FnString;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnTime = /** @class */ (function () {
    function FnTime() {
    }
    /**
     * [fn.interval] 循环定时器
     * @param timerId
     * @param duration
     * @param callback
     */
    FnTime.interval = function (timerId, duration, callback) {
        if (duration === false) {
            clearInterval(this.intervalTimers[timerId]);
        }
        else if (typeof duration === 'number' && typeof callback === 'function') {
            clearInterval(this.intervalTimers[timerId]);
            this.intervalTimers[timerId] = setInterval(function () { return callback(); }, duration);
            return this.intervalTimers[timerId];
        }
        else if (typeof timerId === 'number' && typeof duration === 'function') {
            callback = duration;
            duration = timerId;
            return setInterval(function () { return callback(); }, duration);
        }
    };
    /**
     * [fn.timeout] 延时定时器
     * @param timerId
     * @param duration
     * @param callback
     */
    FnTime.timeout = function (timerId, duration, callback) {
        if (duration === false) {
            clearTimeout(this.timeoutTimers[timerId]);
        }
        else if (typeof duration === 'number' && typeof callback === 'function') {
            clearTimeout(this.timeoutTimers[timerId]);
            this.timeoutTimers[timerId] = setTimeout(function () { return callback(); }, duration);
            return this.timeoutTimers[timerId];
        }
        else if (typeof timerId === 'number' && typeof duration === 'function') {
            callback = duration;
            duration = timerId;
            return setTimeout(function () { return callback(); }, duration);
        }
        else if (typeof timerId === 'function') {
            callback = timerId;
            return setTimeout(function () { return callback(); });
        }
    };
    /**
     * [fn.defer] 延迟执行函数
     * @param func
     */
    FnTime.defer = function (func) {
        this.timeout(func);
    };
    /**
     * [fn.time] 返回一个当前时间戳
     * @param time
     */
    FnTime.time = function (time) {
        if (time instanceof Date) {
            return time.getTime();
        }
        else {
            return (new Date(String(time)).getTime() || (new Date()).getTime());
        }
    };
    /**
     * [fn.fmtDate] 获取格式化的时间字符串
     * @param fmtStr
     * @param time
     */
    FnTime.fmtDate = function (fmtStr, time) {
        var _date = new Date(String(time));
        var date = _date.getTime() ? _date : new Date();
        var obj = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmtStr)) {
            fmtStr = fmtStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                if (new RegExp("(" + k + ")").test(fmtStr)) {
                    fmtStr = fmtStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (('00' + obj[k]).substr(('' + obj[k]).length)));
                }
            }
        }
        return fmtStr;
    };
    FnTime.intervalTimers = {};
    FnTime.timeoutTimers = {};
    return FnTime;
}());
exports.FnTime = FnTime;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnRegExp = /** @class */ (function () {
    function FnRegExp() {
    }
    /**
     * 与一个或几个通用正则匹配
     * @param type
     * @param isNoLimit
     * @returns {pattern|undefined}
     */
    FnRegExp.getPattern = function (type, isNoLimit) {
        if (isNoLimit === void 0) { isNoLimit = false; }
        if (!type) {
            return;
        }
        var patternObj = {
            cnChar: FnRegExp.cnCharPattern,
            dblBitChar: FnRegExp.dblBitCharPattern,
            mobPhone: FnRegExp.mobPhonePattern,
            telPhone: FnRegExp.telPhonePattern,
            email: FnRegExp.emailPattern,
            idCard: FnRegExp.idCardPattern,
            base64Code: FnRegExp.base64CodePattern,
            mac: FnRegExp.macPattern,
            domain: FnRegExp.domainPattern,
            port: FnRegExp.portPattern,
            ip: FnRegExp.ipPattern,
            ipv4: FnRegExp.ipv4Pattern,
            ipv6: FnRegExp.ipv6Pattern,
            ipv4IpRange: FnRegExp.ipv4IpRangePattern,
            ipv6IpRange: FnRegExp.ipv6IpRangePattern,
            ipv4Cidr: FnRegExp.ipv4CidrPattern,
            ipv6Cidr: FnRegExp.ipv6CidrPattern,
            ipv4Url: FnRegExp.ipv4UrlPattern,
            ipv6Url: FnRegExp.ipv6UrlPattern,
            domainUrl: FnRegExp.domainUrlPattern,
            url: FnRegExp.urlPattern,
            ipv4WithPortUrl: FnRegExp.ipv4WithPortUrlPattern,
            ipv6WithPortUrl: FnRegExp.ipv6WithPortUrlPattern,
            domainWithPortUrl: FnRegExp.domainWithPortUrlPattern,
            withPortUrl: FnRegExp.withPortUrlPattern
        };
        patternObj['patternList'] = Object.keys(patternObj);
        return patternObj.hasOwnProperty(type) && patternObj[type]
            ? type === 'patternList'
                ? patternObj[type]
                : isNoLimit
                    ? new RegExp(patternObj[type].source)
                    : new RegExp("^(" + patternObj[type].source + ")$")
            : undefined;
    };
    /**
     * 获取一个通用的正则表达式
     * @param src
     * @param type
     * @param isNoLimit
     * @returns {boolean}
     */
    FnRegExp.matchPattern = function (src, type, isNoLimit) {
        if (!src || !type) {
            return false;
        }
        if (type instanceof Array) {
            var matchResult_1 = false;
            type.forEach(function (item) {
                var pattern = FnRegExp.getPattern(item, isNoLimit);
                if (pattern && pattern.test(src)) {
                    matchResult_1 = true;
                }
            });
            return matchResult_1;
        }
        else if (typeof type === 'string') {
            var pattern = FnRegExp.getPattern(type, isNoLimit);
            return pattern && pattern.test(src);
        }
    };
    /* tslint:disable */
    // 匹配汉字
    FnRegExp.cnCharPattern = /[\u4e00-\u9fa5]+/;
    // 匹配双字节字符
    FnRegExp.dblBitCharPattern = /[^x00-xff]/;
    // 匹配Email
    FnRegExp.emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 匹配中国大陆手机号码
    FnRegExp.mobPhonePattern = /(\+?0?86\-?)?1[3456789]\d{9}/;
    // 匹配中国大陆电话号码，格式为“XXXX-XXXXXXX”，“XXXX-XXXXXXXX”，“XXX-XXXXXXX”，“XXX-XXXXXXXX”，“XXXXXXX”，“XXXXXXXX”
    FnRegExp.telPhonePattern = /((d{3,4})|d{3,4}-)?d{7,8}/;
    // 匹配中国大陆身份证
    FnRegExp.idCardPattern = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/;
    // 匹配Base64编码格式
    FnRegExp.base64CodePattern = /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/;
    // 匹配Mac地址
    FnRegExp.macPattern = /[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}/;
    // 匹配域名
    FnRegExp.domainPattern = /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/;
    // 匹配端口号
    FnRegExp.portPattern = /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/;
    // 匹配IPv4地址
    FnRegExp.ipv4Pattern = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/;
    // 匹配IPv6地址
    FnRegExp.ipv6Pattern = new RegExp('' +
        '([\\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
        '|::([\\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
        '|([\\da-fA-F]{1,4}:):([\\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
        '|([\\da-fA-F]{1,4}:){2}:([\\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
        '|([\\da-fA-F]{1,4}:){3}:([\\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
        '|([\\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
        '|([\\da-fA-F]{1,4}:){7}[\\da-fA-F]{1,4}' +
        '|:((:[\\da-fA-F]{1,4}){1,6}|:)' +
        '|[\\da-fA-F]{1,4}:((:[\\da-fA-F]{1,4}){1,5}|:)' +
        '|([\\da-fA-F]{1,4}:){2}((:[\\da-fA-F]{1,4}){1,4}|:)' +
        '|([\\da-fA-F]{1,4}:){3}((:[\\da-fA-F]{1,4}){1,3}|:)' +
        '|([\\da-fA-F]{1,4}:){4}((:[\\da-fA-F]{1,4}){1,2}|:)' +
        '|([\\da-fA-F]{1,4}:){5}:([\\da-fA-F]{1,4})?' +
        '|([\\da-fA-F]{1,4}:){6}:');
    // 匹配IP
    FnRegExp.ipPattern = new RegExp("(" + FnRegExp.ipv4Pattern.source + "|" + FnRegExp.ipv6Pattern.source + ")");
    // 匹配IPv4 cidr
    FnRegExp.ipv4CidrPattern = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]|1[0-9]|2[0-9]|3[0-2]))/;
    // 匹配IPV6 cidr
    FnRegExp.ipv6CidrPattern = new RegExp('s*(' +
        '(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))' +
        '|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))' +
        '|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))' +
        '|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
        '|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
        '|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
        '|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
        '|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
        ')(\\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))');
    // 匹配IPv4范围
    FnRegExp.ipv4IpRangePattern = new RegExp("((" + FnRegExp.ipv4Pattern.source + ")-(" + FnRegExp.ipv4Pattern.source + ");)*(" + FnRegExp.ipv4Pattern.source + ")-(" + FnRegExp.ipv4Pattern.source + ")");
    // 匹配IPv6范围
    FnRegExp.ipv6IpRangePattern = new RegExp("((" + FnRegExp.ipv6Pattern.source + ")-(" + FnRegExp.ipv6Pattern.source + ");)*(" + FnRegExp.ipv6Pattern.source + ")-(" + FnRegExp.ipv6Pattern.source + ")");
    // 匹配IPv4 Url
    FnRegExp.ipv4UrlPattern = new RegExp("http(s)?://" + FnRegExp.ipv4Pattern.source + "(:" + FnRegExp.portPattern.source + ")?");
    // 匹配IPv6 Url
    FnRegExp.ipv6UrlPattern = new RegExp("http(s)?://\\[(" + FnRegExp.ipv6Pattern.source + ")\\](:" + FnRegExp.portPattern.source + ")?");
    // 匹配Domain Url
    FnRegExp.domainUrlPattern = new RegExp("http(s)?://" + FnRegExp.domainPattern.source + "(:" + FnRegExp.portPattern.source + ")?");
    // 匹配Url
    FnRegExp.urlPattern = new RegExp("http(s)?://(" + FnRegExp.ipv4Pattern.source + "|\\[(" + FnRegExp.ipv6Pattern.source + ")\\]|" + FnRegExp.domainPattern.source + ")(:" + FnRegExp.portPattern.source + ")?");
    // 匹配必需带端口的IPv4 Url
    FnRegExp.ipv4WithPortUrlPattern = new RegExp("http(s)?://" + FnRegExp.ipv4Pattern.source + ":" + FnRegExp.portPattern.source);
    // 匹配必需带端口的IPv6 Url
    FnRegExp.ipv6WithPortUrlPattern = new RegExp("http(s)?://\\[(" + FnRegExp.ipv6Pattern.source + ")\\]:" + FnRegExp.portPattern.source);
    // 匹配必需带端口的Domain Url
    FnRegExp.domainWithPortUrlPattern = new RegExp("http(s)?://" + FnRegExp.domainPattern.source + ":" + FnRegExp.portPattern.source);
    // 匹配必需带端口的Url
    FnRegExp.withPortUrlPattern = new RegExp("http(s)?://(" + FnRegExp.ipv4Pattern.source + "|\\[(" + FnRegExp.ipv6Pattern.source + ")\\]|" + FnRegExp.domainPattern.source + "):" + FnRegExp.portPattern.source);
    return FnRegExp;
}());
exports.FnRegExp = FnRegExp;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnMath = /** @class */ (function () {
    function FnMath() {
    }
    /**
     * [fn.random] 返回一个指定范围内的随机数
     * @param sta
     * @param end
     */
    FnMath.random = function (sta, end) {
        if (sta === undefined && end === undefined) {
            return Math.random();
        }
        else if (end === undefined || sta === end) {
            return Math.floor(Math.random() * sta);
        }
        else {
            if (sta > end) {
                var tmpSta = sta;
                sta = end;
                end = tmpSta;
            }
            return Math.floor(Math.random() * (end - sta) + sta);
        }
    };
    /**
     * [fn.rdid] 返回一个指定长度（最小4位）的随机ID
     * @param len
     */
    FnMath.rdid = function (len) {
        var _this = this;
        var charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var eleId = '';
        if (len < 4) {
            len = 4;
        }
        ;
        this.array(len).forEach(function (x) { return eleId += charSet[_this.random(charSet.length)]; });
        return eleId;
    };
    /**
     * [fn.rdColor] 返回一个随机颜色色值
     */
    FnMath.rdcolor = function () {
        return '#' + ('00000' + (this.random(0x1000000) << 0).toString(16)).slice(-6);
    };
    return FnMath;
}());
exports.FnMath = FnMath;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnFunction = /** @class */ (function () {
    function FnFunction() {
    }
    /**
     * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
     * @param  func
     * @param  wait
     * @param  options
     */
    FnFunction.throttle = function (func, wait, options) {
        var timeout, context, args, result;
        var previous = 0;
        var that = this;
        if (!options)
            options = {};
        var throttled = function () {
            var now = that.time();
            if (!previous && options.leading === false)
                previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            }
            else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(function () {
                    previous = options.leading === false ? 0 : that.time();
                    timeout = null;
                    result = func.apply(context, args);
                    if (!timeout)
                        context = args = null;
                }, remaining);
            }
            return result;
        };
        throttled.cancel = function () {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };
        return throttled;
    };
    /**
     * [fn.debounce] 防抖函数, 适用于获取用户输入
     * @param func
     * @param wait
     * @param immediate
     */
    FnFunction.debounce = function (func, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var timeout, result;
        var later = function (context, args) {
            timeout = null;
            if (args)
                result = func.apply(context, args);
        };
        var delay = function (func, wait) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return setTimeout(function () {
                return func.apply(null, args);
            }, wait);
        };
        var debounced = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (timeout)
                clearTimeout(timeout);
            if (immediate) {
                var callNow = !timeout;
                timeout = setTimeout(later, wait);
                if (callNow)
                    result = func.apply(this, args);
            }
            else {
                timeout = delay(later, wait, this, args);
            }
            return result;
        };
        debounced.cancel = function () {
            clearTimeout(timeout);
            timeout = null;
        };
        return debounced;
    };
    return FnFunction;
}());
exports.FnFunction = FnFunction;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnCookie = /** @class */ (function () {
    function FnCookie() {
    }
    /**
     * [fn.setCookie] 设置Cookie
     * @param name
     * @param value
     * @param days
     */
    FnCookie.setCookie = function (name, value, days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        document.cookie = name + "=" + value + ";expires=" + date;
    };
    /**
     * [fn.getCookie] 根据name读取cookie
     * @param  name
     * @return {String}
     */
    FnCookie.getCookie = function (name) {
        var cks = document.cookie.replace(/\s/g, "").split(';');
        for (var i = 0; i < cks.length; i++) {
            var tempArr = cks[i].split('=');
            if (tempArr[0] == name) {
                return decodeURIComponent(tempArr[1]);
            }
        }
        return '';
    };
    /**
     * [fn.removeCookie] 根据name删除cookie
     * @param name
     */
    FnCookie.removeCookie = function (name) {
        FnCookie.setCookie(name, '1', -1);
    };
    return FnCookie;
}());
exports.FnCookie = FnCookie;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnDom = /** @class */ (function () {
    function FnDom() {
    }
    /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el
     * @returns {any}
     */
    FnDom.fullScreen = function (el) {
        var rfs = el['requestFullScreen'] || el['webkitRequestFullScreen']
            || el['mozRequestFullScreen'] || el['msRequestFullScreen'];
        if (rfs) {
            return rfs.call(el);
        }
        if (window['ActiveXObject']) {
            var ws = new window['ActiveXObject']("WScript.Shell");
            if (ws) {
                ws.SendKeys("{F11}");
            }
        }
    };
    /**
     * [fn.exitFullScreen] 退出全屏显示
     * @returns {any}
     */
    FnDom.exitFullScreen = function () {
        var cfs = document['cancelFullScreen'] || document['webkitCancelFullScreen']
            || document['mozCancelFullScreen'] || document['exitFullScreen'];
        if (cfs) {
            return cfs.call(document);
        }
        if (window['ActiveXObject']) {
            var ws = new window['ActiveXObject']("WScript.Shell");
            if (ws != null) {
                ws.SendKeys("{F11}");
            }
        }
    };
    /**
     * [fn.isFullScreen] 检测是否全屏状态
     * @returns {boolean}
     */
    FnDom.isFullScreen = function () {
        return document['fullscreenEnabled']
            || window['fullScreen']
            || document['mozFullscreenEnabled']
            || document['webkitIsFullScreen']
            || document['msIsFullScreen'] || false;
    };
    /**
     * [fn.fullScreenChange] 检测是否全屏状态
     * @param callback
     */
    FnDom.fullScreenChange = function (callback) {
        if (window.addEventListener) {
            if (typeof callback === 'function') {
                this.fullScreenChange(false);
                window['fullScreenFunc'] = callback;
                document.addEventListener('fullscreenchange', window['fullScreenFunc']);
                document.addEventListener('webkitfullscreenchange', window['fullScreenFunc']);
                document.addEventListener('mozfullscreenchange', window['fullScreenFunc']);
                document.addEventListener('MSFullscreenChange', window['fullScreenFunc']);
            }
            else {
                if (window['fullScreenFunc']) {
                    document.removeEventListener('fullscreenchange', window['fullScreenFunc']);
                    document.removeEventListener('webkitfullscreenchange', window['fullScreenFunc']);
                    document.removeEventListener('mozfullscreenchange', window['fullScreenFunc']);
                    document.removeEventListener('MSFullscreenChange', window['fullScreenFunc']);
                }
            }
        }
    };
    /**
     * [fn.pollingEl] 轮询获取异步出现的HTML元素
     * @param selector 选择器
     * @param timeout 超时时间
     * @param options {duration: number = 250; isSelectAll: boolean = false}
     * @param callback
     */
    FnDom.pollingEl = function (selector, timeout, options, callback) {
        var _this = this;
        if ((this.typeOf(selector, ['str', 'arr'])) && typeof timeout === 'number') {
            var duration_1 = this.get(options, 'duration', 'num') || 250;
            var isSelectAll_1 = !!(options && options['isSelectAll']);
            callback = this.typeValue(callback, 'func') || this.typeValue(options, 'func');
            var count_1 = 0;
            this.interval(selector, duration_1, function (eles) {
                parseInt(String(timeout / duration_1), 10) <= count_1 ? _this.interval(selector, false) : count_1++;
                var tmpArr = [];
                var selectors = _this.toArray(selector);
                selectors.forEach(function (slt) {
                    var elements = isSelectAll_1 ? document.querySelectorAll(slt) : document.querySelector(slt);
                    if (elements.length > 0) {
                        tmpArr.push(elements);
                    }
                });
                if (tmpArr.length === selectors.length) {
                    _this.interval(selector, false);
                    if (callback) {
                        callback(tmpArr);
                    }
                }
            });
        }
        else {
            this.interval(selector, false);
        }
    };
    /**
     * [fn.noAutoComplete] 防止input密码自动填充
     * @param input [HTMLInputElement]
     * @param type ['username'|'password']
     */
    FnDom.noAutoComplete = function (input, type) {
        switch (type) {
            case 'username':
                input.setAttribute('autocomplete', 'off');
                var ipt = document.createElement('input');
                ipt.setAttribute('type', 'password');
                ipt.style.display = 'none';
                input.parentNode.insertBefore(ipt, input);
                break;
            case 'password':
                input.setAttribute('autocomplete', 'new-password');
                input.setAttribute('type', 'text');
                input.oninput = function () {
                    this.value ? this.setAttribute('type', 'password') : this.setAttribute('type', 'text');
                };
                break;
        }
    };
    return FnDom;
}());
exports.FnDom = FnDom;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var funclib_conf_1 = __webpack_require__(1);
var FnLoger = /** @class */ (function () {
    function FnLoger() {
    }
    /**
     * [fn.log] 控制台格式化打印值
     * @param value
     * @param configs {
     * title: string,
     * width: number [20-100]
     * part: 'pre'|'end'
     * isFmt: boolean
     * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
     * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
     * @param isFmt
     */
    FnLoger.log = function (isClient, value, configs, isFmt) {
        var isFormate = this.get(configs, '/isFmt') || isFmt;
        if (typeof configs === 'boolean') {
            isFormate = configs;
            configs = undefined;
        }
        value = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
        var time = "[" + this.fmtDate('hh:mm:ss') + "] ";
        var title = (this.typeValue(configs, 'str') || this.get(configs, '/title')
            || "funclib(" + this.version + ")").replace(/\n/mg, '');
        var originTtLength = (time + title + '[] ').length;
        if (!isFormate)
            title = "( " + title + " )";
        if (!isClient) {
            time = this.chalk(time);
            var titlec = this.get(configs, '/ttColor');
            var valuec = this.get(configs, '/color');
            title = this.chalk(title, titlec in funclib_conf_1.COLOR_LIST && titlec || 'green');
            value = this.chalk(value, valuec in funclib_conf_1.COLOR_LIST && valuec || 'cyan');
        }
        title = time + title;
        var width = this.get(configs, '/width');
        if (!width || width < 30 || width > 100)
            width = 66;
        if (originTtLength <= width) {
            if (isFormate) {
                title = this.array((width - originTtLength) / 2, ' ').join('') + title;
            }
        }
        else {
            var colorEnd = '\x1B[0m';
            var fixLength = title.length - originTtLength - colorEnd.length;
            if (isClient) {
                title = this.cutString(title, width - 3);
            }
            else {
                title = this.cutString(title, width + fixLength - 3) + colorEnd;
            }
        }
        if (!isFormate) {
            console.log(title + ": " + value);
        }
        else {
            var sgLine_1 = '', dbLine_1 = '';
            this.array(width).forEach(function (x) {
                sgLine_1 += '-';
                dbLine_1 += '=';
            });
            if (isClient) {
                console.log("\n" + dbLine_1 + "\n" + title + "\n" + sgLine_1 + "\n" + value + "\n" + dbLine_1 + "\n");
            }
            else {
                if (configs && ['pre', 'end'].indexOf(configs['part']) > -1) {
                    if (configs['part'] === 'pre') {
                        console.log('\n' + dbLine_1);
                        console.log(title);
                        console.log(sgLine_1);
                    }
                    else {
                        console.log(dbLine_1 + '\n');
                    }
                }
                else {
                    console.log('\n' + dbLine_1);
                    console.log(title);
                    console.log(sgLine_1);
                    console.log(value);
                    console.log(dbLine_1 + '\n');
                }
            }
        }
    };
    /**
     * [fn.chalk] 在控制台打印有颜色的字符串
     * @param value
     * @param color
     */
    FnLoger.chalk = function (value, color) {
        if (!(color in funclib_conf_1.COLOR_LIST))
            color = 'grey';
        return funclib_conf_1.COLOR_LIST[color].replace(/%s/, value);
    };
    return FnLoger;
}());
exports.FnLoger = FnLoger;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var fs, path, Buffer, execSync, process;
var FnFileSys = /** @class */ (function () {
    function FnFileSys() {
        /**
         * [fn.rd] 读文件
         * @param file
         */
        this.rd = function (file) {
            return fs.existsSync(file) ? fs.readFileSync(file, { encoding: 'utf8' }) : '';
        };
        /**
         * [fn.wt] 写文件
         * @param file
         * @param text
         * @param flag ['w'|'a'] default: 'w'
         */
        this.wt = function (file, text, flag) {
            fs.writeFileSync(file, text, { encoding: 'utf8', flag: flag });
        };
        fs = eval('require("fs")');
        path = eval('require("path")');
        execSync = eval('require("child_process").execSync');
        process = global.process;
        Buffer = global.Buffer;
    }
    /**
     * [fn.cp] 复制文件或文件夹
     * @param src
     * @param dist
     */
    FnFileSys.prototype.cp = function (src, dist) {
        var _this = this;
        if (fs.existsSync(src)) {
            if (fs.statSync(src).isFile()) {
                fs.createReadStream(src).pipe(fs.createWriteStream(dist));
            }
            else if (fs.statSync(src).isDirectory()) {
                this.mk(dist);
                var subSrcs = fs.readdirSync(src);
                subSrcs.forEach(function (file) {
                    var subSrc = path.join(src, file);
                    var subDist = path.join(dist, file);
                    _this.cp(subSrc, subDist);
                });
            }
        }
    };
    /**
     * [fn.mv] 移动文件或文件夹
     * @param src
     * @param dist
     */
    FnFileSys.prototype.mv = function (src, dist) {
        try {
            fs.renameSync(src, dist);
        }
        catch (e) {
            this.cp(src, dist);
            this.rm(src);
        }
    };
    /**
     * [fn.rm] 删除文件或文件夹
     * @param src
     */
    FnFileSys.prototype.rm = function (src) {
        var _this = this;
        if (fs.existsSync(src)) {
            if (fs.statSync(src).isFile()) {
                fs.unlinkSync(src);
            }
            else if (fs.statSync(src).isDirectory()) {
                var subSrcs = fs.readdirSync(src);
                subSrcs.forEach(function (file) {
                    var subSrc = path.join(src, file);
                    _this.rm(subSrc);
                });
                try {
                    fs.rmdirSync(src);
                }
                catch (e) {
                    setTimeout(function () {
                        if (/win/.test(process.platform)) {
                            var absSrc = path.resolve(src);
                            execSync("rd /s /q " + absSrc);
                        }
                        else {
                            execSync("rm -rf " + src);
                        }
                    }, 500);
                }
            }
        }
    };
    /**
     * [fn.mk] 创建文件夹
     * @param dist
     */
    FnFileSys.prototype.mk = function (dist) {
        var absDist = path.resolve(dist);
        if (!fs.existsSync(absDist)) {
            try {
                fs.mkdirSync(absDist);
            }
            catch (e) {
                this.mk(path.dirname(absDist));
                fs.mkdirSync(absDist);
            }
        }
        ;
    };
    return FnFileSys;
}());
exports.FnFileSys = FnFileSys;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var progress;
var duration;
var pgType;
var process = global.process;
var FnProgress = /** @class */ (function () {
    function FnProgress() {
    }
    /**
     * [fn.progress.start] 开启进度条，并传入参数
     * @param options {title: string, width: number (base: 40)}
     */
    FnProgress.start = function (options) {
        FnProgress.chalk = this.chalk;
        FnProgress.interval = this.interval;
        FnProgress.timeout = this.timeout;
        this.interval('pg_sping', false);
        this.timeout('pg_Bar', false);
        if (typeof options === 'string') {
            pgType = 'sp';
            FnProgress.startSping(options);
        }
        else {
            pgType = 'pg';
            FnProgress.startPgbar(options);
        }
    };
    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param onStopped
     */
    FnProgress.stop = function (onStopped) {
        if (pgType === 'sp') {
            pgType = null;
            FnProgress.stopSping();
        }
        else {
            FnProgress.stopPgbar(function () {
                pgType = null;
                if (typeof onStopped === 'function') {
                    onStopped();
                }
            });
        }
    };
    /**
     * 翻转
     */
    FnProgress.startSping = function (message) {
        this.interval('pg_sping', false);
        this.spingFun(message);
    };
    FnProgress.stopSping = function () {
        this.interval('pg_sping', false);
    };
    FnProgress.spingFun = function (msg) {
        var _this = this;
        var stream = process.stderr;
        var interrupt = function (frame) {
            stream.clearLine();
            stream.cursorTo(0);
            stream.write(frame);
        };
        var s = '/';
        this.interval('pg_sping', 180, function () {
            interrupt(_this.chalk(s, 'cyan') + " " + msg);
            switch (s) {
                case '/':
                    s = '-';
                    break;
                case '-':
                    s = '\\';
                    break;
                case '\\':
                    s = '|';
                    break;
                case '|':
                    s = '/';
                    break;
                default:
                    s = '-';
                    break;
            }
        });
    };
    /**
     * 进度条
     */
    FnProgress.startPgbar = function (options) {
        this.timeout('pg_Bar', false);
        var Pgbar = eval('require("progress")');
        var prog = (options && options.title || '[fn.progress]') + " [:bar] :percent";
        progress = new Pgbar(prog, {
            complete: '=', incomplete: ' ',
            width: options && options['width'] || 40,
            total: options && options['total'] || 20
        });
        duration = 250;
        this.tickFun('+');
    };
    FnProgress.stopPgbar = function (onStopped) {
        duration = 600;
        this.tickFun('-', onStopped);
    };
    FnProgress.tickFun = function (type, onStopped) {
        var _this = this;
        this.timeout('pg_Bar', duration, function () {
            progress.tick();
            switch (type) {
                case '+':
                    duration += 300;
                    break;
                case '-':
                    duration -= duration * 0.2;
                    break;
            }
            if (!progress.complete) {
                _this.tickFun(type, onStopped);
            }
            else if (onStopped) {
                onStopped();
            }
        });
    };
    return FnProgress;
}());
exports.FnProgress = FnProgress;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnTrick = /** @class */ (function () {
    function FnTrick() {
    }
    /**
     * [fn.copyText] 复制文本到粘贴板
     * @param text [string]
     */
    FnTrick.copyText = function (text) {
        if (text === void 0) { text = ''; }
        var textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.left = '200%';
        document.body.appendChild(textarea);
        textarea.value = text;
        textarea.select();
        document.execCommand('Copy');
        document.body.removeChild(textarea);
    };
    FnTrick.extendJquery = function (jquery) {
        var $ = jquery || window['jquery'] || window['jQuery'] || null;
        if ($) {
            // $.extend({});
            /**
             * [$ele.findCousin] 寻找元素的表亲
             * @param selector [string]
             * @param level    [number]
             */
            $.fn.findCousin = function (selector, level) {
                if (level === void 0) { level = 0; }
                if (!level) {
                    return selector ? this.parents().find(selector) : this.parents();
                }
                else {
                    var $parent = this;
                    for (var i = 0; i < level; i++) {
                        $parent = $parent.parent();
                    }
                    return selector ? $parent.find(selector) : $parent;
                }
            };
        }
        return !!$;
    };
    return FnTrick;
}());
exports.FnTrick = FnTrick;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnUrl = /** @class */ (function () {
    function FnUrl() {
    }
    /**
     * [fn.parseQueryString] 解析Url参数成对象
     * @param url [string]  default: window.location.href
     */
    FnUrl.parseQueryString = function (url) {
        url = url || typeof window !== 'undefined' && window.location.href || '';
        if (url.indexOf('?') === -1) {
            return {};
        }
        var queryStr = url.substring(url.lastIndexOf('?') + 1);
        if (queryStr === '') {
            return {};
        }
        var querys = queryStr.split('&');
        var params = {};
        for (var i = 0; i < querys.length; i++) {
            var kw = querys[i].split('=');
            params[decodeURIComponent(kw[0])] = decodeURIComponent(kw[1] || '');
        }
        return params;
    };
    /**
     * [fn.stringfyQueryString] 把对象编译成Url参数
     * @param obj [string]  default: window.location.href
     */
    FnUrl.stringfyQueryString = function (obj) {
        if (!this.typeOf(obj, 'obj')) {
            return '';
        }
        var pairs = [];
        for (var key in obj) {
            var value = obj[key];
            if (value instanceof Array) {
                for (var i = 0; i < value.length; ++i) {
                    pairs.push(encodeURIComponent(key + "[" + i + "]") + '=' + encodeURIComponent(value[i]));
                }
                continue;
            }
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return '?' + pairs.join('&');
    };
    return FnUrl;
}());
exports.FnUrl = FnUrl;


/***/ })
/******/ ]);
});