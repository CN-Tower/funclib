(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fn"] = factory();
	else
		root["fn"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FnType = /** @class */ (function () {
    function FnType() {
    }
    /**
     * [fn.typeOf] 检查值的类型
     * @param value
     * @param type_
     * @param types
     */
    FnType.typeOf = function (value, type_) {
        var types = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            types[_i - 2] = arguments[_i];
        }
        if (!type_)
            return false;
        type_ instanceof Array ? types = type_ : types.unshift(type_);
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
     * [fn.typeVal] 检查是否为某类型的值，是则返回该值，不是则返回false
     * @param value
     * @param type_
     * @param types
     */
    FnType.typeVal = function (value, type_) {
        var types = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            types[_i - 2] = arguments[_i];
        }
        return FnType.typeOf.apply(FnType, [value, type_].concat(types)) && value;
    };
    return FnType;
}());
exports.FnType = FnType;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _Type_1 = __webpack_require__(0);
var _Object_1 = __webpack_require__(2);
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
        var tmpVal = 0;
        for (var i = 0; i < length; i++) {
            if (value === undefined) {
                tmpArr.push(tmpVal);
                tmpVal++;
            }
            else if (typeof value === 'function') {
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
     * @param value
     */
    FnArray.toArray = function (value) {
        return value instanceof Array ? value : [value];
    };
    /**
     * [fn.find] 根据条件取值
     * @param srcArr
     * @param predicate
     */
    FnArray.find = function (srcArr, predicate) {
        var idx = FnArray.indexOf(srcArr, predicate);
        return idx > -1 ? srcArr[idx] : undefined;
    };
    /**
     * [fn.filter] 根据条件取过滤值
     * @param srcArr
     * @param predicate
     */
    FnArray.filter = function (srcArr, predicate) {
        return FnArray._filter(srcArr, predicate, true);
    };
    /**
     * [fn.reject] 根据条件过滤值
     * @param srcArr
     * @param predicate
     */
    FnArray.reject = function (srcArr, predicate) {
        return FnArray._filter(srcArr, predicate, false);
    };
    /**
     * 过滤函数
     * @param srcArr
     * @param predicate
     */
    FnArray._filter = function (srcArr, predicate, isFlt) {
        var ftItems = [];
        var rjItems = [];
        srcArr.forEach(function (item) {
            if (_Type_1.FnType.typeOf(predicate, 'obj')) {
                if (Object.keys(predicate).every(function (k) { return predicate[k] === item[k]; })) {
                    ftItems.push(item);
                }
                else {
                    rjItems.push(item);
                }
            }
            else if (_Type_1.FnType.typeOf(predicate, 'fun')) {
                predicate(item) ? ftItems.push(item) : rjItems.push(item);
            }
        });
        return isFlt ? ftItems : rjItems;
    };
    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param srcArr
     * @param predicate
     */
    FnArray.contains = function (srcArr, predicate) {
        var idx = FnArray.indexOf(srcArr, predicate);
        return idx > -1;
    };
    /**
     * [fn.drop] 去掉Boolean()后为false和空数组或对象的值
     * @param srcArr
     * @param isDrop0
     */
    FnArray.drop = function (srcArr, isDrop0) {
        if (isDrop0 === void 0) { isDrop0 = false; }
        var tmpArr = [];
        srcArr.forEach(function (val) {
            var isLen0 = _Type_1.FnType.typeOf(val, ['arr', 'obj']) && _Object_1.FnObject.len(val) === 0;
            if ((val && !isLen0) || (!isDrop0 && val === 0))
                tmpArr.push(val);
        });
        return tmpArr;
    };
    /**
     * [fn.flatten] 把有结构的数组打散，减少层数
     * @param srcArr
     * @param isDeep
     */
    FnArray.flatten = function (srcArr, isDeep) {
        if (isDeep === void 0) { isDeep = false; }
        var tmpArr = [];
        srcArr.forEach(function (val) {
            if (_Type_1.FnType.typeOf(val, 'arr')) {
                isDeep ? tmpArr.push.apply(tmpArr, FnArray.flatten(val, true)) : tmpArr.push.apply(tmpArr, val);
            }
            else {
                tmpArr.push(val);
            }
        });
        return tmpArr;
    };
    /**
     * [fn.pluck] 把结构中的字段取出合并到一个数组中
     * @param obj
     * @param path
     * @param isUniq
     */
    FnArray.pluck = function (srcArr, path) {
        var tmpArr = [];
        if (_Type_1.FnType.typeVal(path, 'str')) {
            srcArr.forEach(function (val) { return tmpArr.push(_Object_1.FnObject.get(val, path)); });
        }
        return tmpArr;
    };
    /**
     * [fn.uniq] 去重或根据字段去重
     * @param srcArr : any[]
     * @param path?  : string
     * @param isDeep : boolean = true
     */
    FnArray.uniq = function (srcArr, path, isDeep) {
        if (isDeep === void 0) { isDeep = true; }
        if (typeof path === 'boolean') {
            isDeep = path;
            path = undefined;
        }
        path = _Type_1.FnType.typeVal(path, 'str');
        var tmpArr = srcArr.slice();
        for (var i = 0; i < tmpArr.length - 1; i++) {
            for (var j = i + 1; j < tmpArr.length; j++) {
                var isDuplicate = void 0;
                if (path) {
                    var val1 = _Object_1.FnObject.get(tmpArr[i], path);
                    var val2 = _Object_1.FnObject.get(tmpArr[j], path);
                    isDuplicate = isDeep
                        ? _Object_1.FnObject.isDeepEqual(val1, val2) : val1 === val2;
                }
                else {
                    isDuplicate = isDeep
                        ? _Object_1.FnObject.isDeepEqual(tmpArr[i], tmpArr[j])
                        : tmpArr[i] === tmpArr[j];
                }
                if (isDuplicate) {
                    tmpArr.splice(j, 1);
                    j--;
                }
            }
        }
        return tmpArr;
    };
    /**
     * [fn.indexOf] 寻找值在数组中的索引
     * @param srcArr
     * @param predicate
     */
    FnArray.indexOf = function (srcArr, predicate) {
        var _loop_1 = function (i) {
            if (_Type_1.FnType.typeOf(predicate, 'obj')) {
                var isInSrc = Object.keys(predicate).every(function (k) {
                    return srcArr[i][k] === predicate[k];
                });
                if (isInSrc)
                    return { value: i };
            }
            else if (_Type_1.FnType.typeOf(predicate, 'fun')) {
                if (predicate(srcArr[i]))
                    return { value: i };
            }
        };
        for (var i = 0; i < srcArr.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return srcArr.indexOf(predicate);
    };
    /**
     * [fn.forEach] 遍历数组或类数组
     * @param obj
     * @param iteratee
     */
    FnArray.forEach = function (obj, iteratee) {
        var length = _Object_1.FnObject.get(obj, '/length', 'num');
        if (length && length >= 0 && length < Math.pow(2, 53) - 1) {
            for (var i = 0; i < length; i++) {
                iteratee(obj[i], i);
            }
        }
        else {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                iteratee(obj[keys[i]], keys[i]);
            }
        }
        return obj;
    };
    /**
     * [fn.sortBy] 返回对象数组根据字段排序后的副本
     * @param srcArr
     * @param field
     * @param isDesc
     */
    FnArray.sortBy = function (srcArr, field, isDesc) {
        if (isDesc === void 0) { isDesc = false; }
        return srcArr.slice().sort(function (row1, row2) {
            var _a = [_Object_1.FnObject.get(row1, field), _Object_1.FnObject.get(row2, field)], rst1 = _a[0], rst2 = _a[1];
            if ([rst1, rst2].some(function (x) { return x !== 0 && !x; }) || rst1 === rst2) {
                return 0;
            }
            else {
                return rst1 > rst2
                    ? isDesc ? -1 : 1
                    : isDesc ? 1 : -1;
            }
        });
    };
    return FnArray;
}());
exports.FnArray = FnArray;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _Type_1 = __webpack_require__(0);
var _Array_1 = __webpack_require__(1);
var FnObject = /** @class */ (function () {
    function FnObject() {
    }
    /**
     * [fn.len] 获取对象自有属性的个数
     * @arg obj
     */
    FnObject.len = function (obj) {
        if (_Type_1.FnType.typeOf(obj, 'obj')) {
            return Object.keys(obj).length;
        }
        else if (_Type_1.FnType.typeOf(obj, ['str', 'arr', 'fun'])
            || FnObject.get(obj, '/length', 'num')) {
            return obj.length;
        }
        else {
            return -1;
        }
    };
    /**
     * [fn.has] 判断对象是否存在某自有属性
     * @param obj
     * @param property
     */
    FnObject.has = function (obj, property) {
        return obj && obj.hasOwnProperty(property) || false;
    };
    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param obj [Object]
     * @param path [string]
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    FnObject.get = function (obj, path) {
        var types = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            types[_i - 2] = arguments[_i];
        }
        if (!obj || !_Type_1.FnType.typeOf(path, 'str'))
            return undefined;
        var paths = _Array_1.FnArray.drop(path.split('/'));
        var key = paths.shift();
        if (!key)
            return types.length ? _Type_1.FnType.typeVal.apply(_Type_1.FnType, [obj].concat(types)) : obj;
        if (paths.length) {
            if (!_Type_1.FnType.typeOf(obj[key], 'obj', 'arr'))
                return undefined;
            return FnObject.get.apply(FnObject, [obj[key], paths.join('/')].concat(types));
        }
        else {
            return types.length ? _Type_1.FnType.typeVal.apply(_Type_1.FnType, [obj[key]].concat(types)) : obj[key];
        }
    };
    /**
     * [fn.pick] 获取对象的部分属性
     * @param srcObj
     * @param predicate
     * @param propList
     */
    FnObject.pick = function (srcObj, predicate) {
        var propList = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            propList[_i - 2] = arguments[_i];
        }
        return FnObject.propsTraversal({}, srcObj, predicate, propList, false);
    };
    /**
     * [fn.extend] 给对象赋值
     * @param tarObj
     * @param srcObj
     * @param predicate
     * @param propList
     */
    FnObject.extend = function (target, srcObj, predicate) {
        var propList = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            propList[_i - 3] = arguments[_i];
        }
        if (_Type_1.FnType.typeVal(srcObj, 'object')) {
            FnObject.propsTraversal(target, srcObj, predicate, propList, true);
        }
        return target;
    };
    FnObject.propsTraversal = function (tarObj, srcObj, predicate, propList, isDoTraDft) {
        if (_Type_1.FnType.typeOf(predicate, 'str')) {
            propList.unshift(predicate);
            FnObject.doTraversal(tarObj, srcObj, propList);
        }
        else if (_Type_1.FnType.typeOf(predicate, 'arr')) {
            FnObject.doTraversal(tarObj, srcObj, predicate);
        }
        else if (_Type_1.FnType.typeOf(predicate, 'fun')) {
            FnObject.forIn(srcObj, function (k, v) {
                if (predicate(k, v))
                    tarObj[k] = v;
            });
        }
        else if (isDoTraDft) {
            FnObject.doTraversal(tarObj, srcObj, Object.keys(srcObj));
        }
        return tarObj;
    };
    FnObject.doTraversal = function (tarObj, srcObj, propList) {
        propList.forEach(function (prop) {
            if (FnObject.has(srcObj, prop))
                tarObj[prop] = srcObj[prop];
        });
    };
    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @arg obj
     * @arg iteratee
     */
    FnObject.forIn = function (obj, iteratee) {
        return _Array_1.FnArray.forEach(obj, function (v, k) { return iteratee(k, v); });
    };
    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param data
     */
    FnObject.deepCopy = function (data) {
        if (typeof data !== 'object')
            return data;
        var tmpData;
        if (data instanceof Array) {
            tmpData = [];
            for (var i = 0; i < data.length; i++) {
                tmpData.push(FnObject.deepCopy(data[i]));
            }
        }
        else {
            tmpData = {};
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    tmpData[key] = FnObject.deepCopy(data[key]);
                }
            }
        }
        return tmpData;
    };
    /**
     * [fn.isEmpty] 判断对象是否为空对象或数组
     * @param srcObj
     */
    FnObject.isEmpty = function (srcObj) {
        return FnObject.len(srcObj) === 0;
    };
    /**
     * [fn.isDeepEqual] 判断数组或对象是否相等
     * @param obj1
     * @param obj2
     * @param isStrict
     */
    FnObject.isDeepEqual = function (obj1, obj2, isStrict) {
        if (isStrict === void 0) { isStrict = false; }
        if (typeof obj1 !== typeof obj2)
            return false;
        if (_Type_1.FnType.typeOf(obj1, 'arr') && _Type_1.FnType.typeOf(obj2, 'arr')) {
            if (obj1.length !== obj2.length)
                return false;
            for (var i = 0; i < obj1.length; i++) {
                if (!FnObject.isDeepEqual(obj1[i], obj2[i], isStrict))
                    return false;
            }
            return true;
        }
        else if (_Type_1.FnType.typeOf(obj1, 'obj') && _Type_1.FnType.typeOf(obj2, 'obj')) {
            if (FnObject.len(obj1) !== FnObject.len(obj2))
                return false;
            var keys = Object.keys(obj1);
            if (isStrict && !FnObject.isDeepEqual(keys, Object.keys(obj2)))
                return false;
            for (var i = 0; i < keys.length; i++) {
                if (!obj2.hasOwnProperty(keys[i]))
                    return false;
                if (!FnObject.isDeepEqual(obj1[keys[i]], obj2[keys[i]], isStrict))
                    return false;
            }
            return true;
        }
        else {
            return obj1 === obj2;
        }
    };
    return FnObject;
}());
exports.FnObject = FnObject;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var intervalTimers = {};
var timeoutTimers = {};
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
            clearInterval(intervalTimers[timerId]);
        }
        else if (typeof duration === 'number' && typeof callback === 'function') {
            clearInterval(intervalTimers[timerId]);
            intervalTimers[timerId] = setInterval(function () { return callback(); }, duration);
            return intervalTimers[timerId];
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
            clearTimeout(timeoutTimers[timerId]);
        }
        else if (typeof duration === 'number' && typeof callback === 'function') {
            clearTimeout(timeoutTimers[timerId]);
            timeoutTimers[timerId] = setTimeout(function () { return callback(); }, duration);
            return timeoutTimers[timerId];
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
        FnTime.timeout(func);
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
                    fmtStr = fmtStr.replace(RegExp.$1, RegExp.$1.length === 1
                        ? obj[k] : ("00" + obj[k]).substr((obj[k] + '').length));
                }
            }
        }
        return fmtStr;
    };
    return FnTime;
}());
exports.FnTime = FnTime;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _Type_1 = __webpack_require__(0);
var _RegExp_1 = __webpack_require__(5);
var _Object_1 = __webpack_require__(2);
var htmlMap = {
    src: ['&', '<', '>', ' ', '\'', '"'],
    map: ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;']
};
var FnString = /** @class */ (function () {
    function FnString() {
    }
    /**
     * [fn.match] 类型匹配，默认情况还可以写表达式
     * @param source
     * @param cases
     * @param isExec
     */
    FnString.match = function (source, cases, isExec) {
        if (isExec === void 0) { isExec = true; }
        var type_;
        if (_Object_1.FnObject.has(cases, source)) {
            type_ = source;
        }
        else if (_Object_1.FnObject.has(cases, '@default')) {
            type_ = '@default';
        }
        if (type_) {
            if (isExec && typeof cases[type_] === 'function') {
                return _Object_1.FnObject.len(cases[type_]) > 0 ? cases[type_](source) : cases[type_]();
            }
            else {
                return cases[type_];
            }
        }
        return undefined;
    };
    /**
     * [fn.pretty] 转换成格式化字符串
     * @param obj
     */
    FnString.pretty = function (obj) {
        return typeof obj === 'object' ? JSON.stringify(obj, null, 2) : String(obj);
    };
    /**
     * [fn.encodeHtml] 编码HTML字符串 同: fn.escape
     * @param html
     */
    FnString.encodeHtml = function (html) {
        htmlMap.src.forEach(function (src, i) {
            html = html.replace(new RegExp(src, 'g'), htmlMap.map[i]);
        });
        return html;
    };
    /**
     * [fn.decodeHtml] 解码HTML字符串 同: fn.unescape
     * @param html
     */
    FnString.decodeHtml = function (html) {
        htmlMap.map.forEach(function (map, i) {
            html = html.replace(new RegExp(map, 'g'), htmlMap.src[i]);
        });
        return html;
    };
    /**
     * [fn.capitalize] 字符串首字母大写
     * @param str
     */
    FnString.capitalize = function (str) {
        return str && typeof str === 'string'
            ? str[0].toUpperCase() + str.substr(1) : str;
    };
    /**
   * [fn.fmtCurrency] 格式化显示货币
   * @param number
   * @param digit
   * @returns {string}
   */
    FnString.fmtCurrency = function (number, digit) {
        if (digit === void 0) { digit = 2; }
        var nbArr = String(number.toFixed(digit)).split('.');
        var integer = nbArr[0];
        var decimal = nbArr.length > 1 ? nbArr[1] : '';
        var integerStr, spn, sti, i;
        spn = Math.floor(integer.length / 3);
        sti = integer.length % 3;
        integerStr = integer.substr(0, sti);
        for (i = 0; i < spn; i++) {
            integerStr += i === 0 && !integerStr
                ? integer.substr(sti, 3)
                : ',' + integer.substr(sti, 3);
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
            if (count >= len)
                break;
            tmpChar = str.substr(i, 1);
            tmpStr += tmpChar;
            count += _RegExp_1.FnRegExp.matchPattern(tmpChar, 'cnChar') ? 2 : 1;
        }
        return tmpStr + '...';
    };
    /**
     * [fn.parseQueryStr] 解析Url参数成对象
     * @param url [string]
     */
    FnString.parseQueryStr = function (url) {
        if (url.indexOf('?') === -1)
            return {};
        var queryStr = url.substring(url.lastIndexOf('?') + 1);
        if (queryStr === '')
            return {};
        var querys = queryStr.split('&');
        var params = {};
        for (var i = 0; i < querys.length; i++) {
            var kw = querys[i].split('=');
            params[decodeURIComponent(kw[0])] = decodeURIComponent(kw[1] || '');
        }
        return params;
    };
    /**
     * [fn.stringifyQueryStr] 把对象编译成Url参数
     * @param obj [string]
     */
    FnString.stringifyQueryStr = function (obj) {
        if (!_Type_1.FnType.typeOf(obj, ['obj', 'arr']))
            return '';
        obj = JSON.parse(JSON.stringify(obj));
        var pairs = [];
        _Object_1.FnObject.forIn(obj, function (key, value) {
            if (_Type_1.FnType.typeOf(value, 'arr')) {
                value.forEach(function (v, i) {
                    var _k = encodeURIComponent(key + "[" + i + "]");
                    pairs.push(_k + "=" + encodeURIComponent(v));
                });
            }
            else {
                var _v = encodeURIComponent(value);
                pairs.push(encodeURIComponent(key) + "=" + _v);
            }
        });
        return '?' + pairs.join('&');
    };
    FnString.escape = FnString.encodeHtml;
    FnString.unescape = FnString.decodeHtml;
    return FnString;
}());
exports.FnString = FnString;


/***/ }),
/* 5 */
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
        if (!type)
            return;
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
     */
    FnRegExp.matchPattern = function (src, type, isNoLimit) {
        if (!src || !type)
            return null;
        if (type instanceof Array) {
            var matchRst_1 = null;
            type.forEach(function (item) {
                var pattern = FnRegExp.getPattern(item, isNoLimit);
                if (!matchRst_1 && pattern)
                    matchRst_1 = src.match(pattern);
            });
            return matchRst_1;
        }
        else if (typeof type === 'string') {
            var pattern = FnRegExp.getPattern(type, isNoLimit);
            return pattern && src.match(pattern) || null;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = 'v2.2.9';
exports.MAIN_METHODS = [
    /* Type */
    'typeOf',
    'typeVal',
    /* Array */
    'array',
    'toArray',
    'find',
    'filter',
    'reject',
    'contains',
    'drop',
    'flatten',
    'pluck',
    'uniq',
    'indexOf',
    'forEach',
    'sortBy',
    /* Object */
    'len',
    'has',
    'get',
    'pick',
    'forIn',
    'extend',
    'deepCopy',
    'isEmpty',
    'isDeepEqual',
    /* Math */
    'random',
    'rdid',
    'rdcolor',
    /* Time */
    'interval',
    'timeout',
    'defer',
    'time',
    'fmtDate',
    /* String */
    'match',
    'pretty',
    'escape',
    'unescape',
    'encodeHtml',
    'decodeHtml',
    'capitalize',
    'fmtCurrency',
    'cutString',
    'parseQueryStr',
    'stringifyQueryStr',
    /* RegExp */
    'getPattern',
    'matchPattern',
    /* Function */
    'throttle',
    'debounce',
    /* Log */
    'log'
];


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _Type_1 = __webpack_require__(0);
var _Array_1 = __webpack_require__(1);
var _Object_1 = __webpack_require__(2);
var _String_1 = __webpack_require__(4);
var _Time_1 = __webpack_require__(3);
var _RegExp_1 = __webpack_require__(5);
var _Math_1 = __webpack_require__(8);
var _Function_1 = __webpack_require__(9);
var _Cookie_1 = __webpack_require__(10);
var _Dom_1 = __webpack_require__(11);
var _Trick_1 = __webpack_require__(12);
var _Logc_1 = __webpack_require__(13);
var funclib_conf_1 = __webpack_require__(6);
var fnModules = [
    _Type_1.FnType, _Array_1.FnArray, _Object_1.FnObject, _String_1.FnString, _Time_1.FnTime, _RegExp_1.FnRegExp,
    _Math_1.FnMath, _Function_1.FnFunction, _Cookie_1.FnCookie, _Dom_1.FnDom, _Trick_1.FnTrick, _Logc_1.FnLog
];
var methods = funclib_conf_1.MAIN_METHODS.concat([
    'fullScreen',
    'exitFullScreen',
    'isFullScreen',
    'fullScreenChange',
    'pollingEl',
    'noAutoComplete',
    'setCookie',
    'getCookie',
    'removeCookie',
    'copyText',
]);
var _fn = {};
fnModules.forEach(function (fnModule) {
    _Object_1.FnObject.forIn(fnModule, function (mtd, method) {
        if (methods.indexOf(mtd) > -1)
            _fn[mtd] = function () {
                var args = arguments;
                args = Object.keys(args).map(function (key) { return args[key]; });
                return _fn.data !== undefined ? method.apply(void 0, [_fn.data].concat(args)) : method.apply(void 0, args);
            };
    });
});
var fn = function (data) {
    _fn.data = data;
    return _fn;
};
fnModules.forEach(function (fnModule) {
    _Object_1.FnObject.forIn(fnModule, function (mtd, method) {
        if (methods.indexOf(mtd) > -1)
            fn[mtd] = method;
    });
});
fn.version = funclib_conf_1.VERSION;
module.exports = fn;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _Array_1 = __webpack_require__(1);
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
     * [fn.rdid] 返回一个指定长度的随机ID
     * @param len
     */
    FnMath.rdid = function (len) {
        if (len === void 0) { len = 12; }
        var charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var id = '';
        _Array_1.FnArray.array(len).forEach(function (x) { return id += charSet[FnMath.random(charSet.length)]; });
        return id;
    };
    /**
     * [fn.rdColor] 返回一个随机颜色色值
     */
    FnMath.rdcolor = function () {
        return '#' + ("00000" + (FnMath.random(0x1000000) << 0).toString(16)).slice(-6);
    };
    return FnMath;
}());
exports.FnMath = FnMath;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _Time_1 = __webpack_require__(3);
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
        if (!options)
            options = {};
        var throttled = function () {
            var now = _Time_1.FnTime.time();
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
                    previous = options.leading === false ? 0 : _Time_1.FnTime.time();
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
/* 10 */
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
        if (days === void 0) { days = 0; }
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
            if (tempArr[0] == name)
                return decodeURIComponent(tempArr[1]);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _Type_1 = __webpack_require__(0);
var _Object_1 = __webpack_require__(2);
var _Array_1 = __webpack_require__(1);
var _Time_1 = __webpack_require__(3);
var FnDom = /** @class */ (function () {
    function FnDom() {
    }
    /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el
     * @returns {any}
     */
    FnDom.fullScreen = function (el) {
        var rfs = el['requestFullScreen']
            || el['webkitRequestFullScreen']
            || el['mozRequestFullScreen']
            || el['msRequestFullScreen'];
        if (rfs)
            return rfs.call(el);
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
        var cfs = document['cancelFullScreen']
            || document['webkitCancelFullScreen']
            || document['mozCancelFullScreen']
            || document['exitFullScreen'];
        if (cfs)
            return cfs.call(document);
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
            || document['msIsFullScreen']
            || false;
    };
    /**
     * [fn.fullScreenChange] 检测是否全屏状态
     * @param callback
     */
    FnDom.fullScreenChange = function (callback) {
        var e = 'fullscreenchange';
        var events = [e, "webkit" + e, "moz" + e, "MS" + e];
        var eventHandler = function (event, isAdd) {
            var fullFunc = window['fullScreenFunc'];
            isAdd ? document.addEventListener(event, fullFunc)
                : document.removeEventListener(event, fullFunc);
        };
        if (window.addEventListener) {
            if (typeof callback === 'function') {
                this.fullScreenChange(false);
                window['fullScreenFunc'] = callback;
                events.forEach(function (e) { return eventHandler(e, true); });
            }
            else if (window['fullScreenFunc']) {
                events.forEach(function (e) { return eventHandler(e, false); });
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
        if ((_Type_1.FnType.typeOf(selector, ['str', 'arr'])) && typeof timeout === 'number') {
            var duration_1 = _Object_1.FnObject.get(options, 'duration', 'num') || 250;
            var isSelectAll_1 = !!(options && options['isSelectAll']);
            callback = _Type_1.FnType.typeVal(callback, 'func') || _Type_1.FnType.typeVal(options, 'func');
            var count_1 = 0;
            _Time_1.FnTime.interval(selector, duration_1, function (eles) {
                parseInt(String(timeout / duration_1), 10) > count_1
                    ? count_1++ : _Time_1.FnTime.interval(selector, false);
                var tmpArr = [];
                var selectors = _Array_1.FnArray.toArray(selector);
                selectors.forEach(function (slt) {
                    var elements = isSelectAll_1
                        ? document.querySelectorAll(slt)
                        : document.querySelector(slt);
                    if (elements.length > 0)
                        tmpArr.push(elements);
                });
                if (tmpArr.length === selectors.length) {
                    _Time_1.FnTime.interval(selector, false);
                    if (callback)
                        callback(tmpArr);
                }
            });
        }
        else {
            _Time_1.FnTime.interval(selector, false);
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
                break;
        }
    };
    return FnDom;
}());
exports.FnDom = FnDom;


/***/ }),
/* 12 */
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
    return FnTrick;
}());
exports.FnTrick = FnTrick;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _Array_1 = __webpack_require__(1);
var _Object_1 = __webpack_require__(2);
var _String_1 = __webpack_require__(4);
var _Time_1 = __webpack_require__(3);
var _Type_1 = __webpack_require__(0);
var funclib_conf_1 = __webpack_require__(6);
var FnLog = /** @class */ (function () {
    function FnLog() {
    }
    /**
     * [fn.log] 控制台格式化打印值
     * @param value
     * @param configs
     * {title: string, width: number [20-100], isFmt: boolean}
     * @param isFmt
     */
    FnLog.log = function (value, configs, isFmt) {
        if (isFmt === void 0) { isFmt = true; }
        if (configs && typeof configs.isFmt === 'boolean')
            isFmt = configs.isFmt;
        if (typeof configs === 'boolean') {
            isFmt = configs;
            configs = undefined;
        }
        // Value
        value = _String_1.FnString.pretty(value);
        // Title
        var time = "[" + _Time_1.FnTime.fmtDate('hh:mm:ss') + "] ";
        var title = (_Type_1.FnType.typeVal(configs, 'str') || _Object_1.FnObject.get(configs, '/title')
            || "funclib(" + funclib_conf_1.VERSION + ")").replace(/\n/mg, '');
        var originTtLength = (time + title + '[] ').length;
        if (!isFmt)
            title = "( " + title + " )";
        title = time + title;
        // Line width
        var width = _Object_1.FnObject.get(configs, '/width');
        if (!width || width < 30 || width > 100)
            width = 66;
        // Fix title width
        if (originTtLength > width) {
            title = _String_1.FnString.cutString(title, width - 3);
        }
        else if (isFmt) {
            title = _Array_1.FnArray.array((width - originTtLength) / 2, ' ').join('') + title;
        }
        // Do log
        if (!isFmt) {
            console.log(title + ":\n" + value);
        }
        else {
            var sgLine_1 = '', dbLine_1 = '';
            _Array_1.FnArray.array(width).forEach(function (x) {
                sgLine_1 += '-';
                dbLine_1 += '=';
            });
            console.log("\n" + dbLine_1 + "\n" + title + "\n" + sgLine_1 + "\n" + value + "\n" + dbLine_1 + "\n");
        }
    };
    return FnLog;
}());
exports.FnLog = FnLog;


/***/ })
/******/ ]);
});