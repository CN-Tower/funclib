/**
 * @license
 * Funclib v3.4.2 <https://www.funclib.net>
 * GitHub Repository <https://github.com/CN-Tower/funclib.js>
 * Released under MIT license <https://github.com/CN-Tower/funclib.js/blob/master/LICENSE>
 */
; (function () {

  var undefined;
  var _global = typeof global == 'object' && global && global.Object === Object && global;
  var _window = typeof window == 'object' && window && window.Object === Object && window;
  var _self = typeof self == 'object' && self && self.Object === Object && self;
  var _exports = typeof exports == 'object' && exports && !exports.nodeType && exports;
  var _module = _exports && typeof module == 'object' && module && !module.nodeType && module;
  var root = _global || _window || _self || Function('return this')();
  var expFuncErr = new TypeError('Expected a function');

  var version = '3.4.2';
  var originalFn = root.fn;

  var fn = (function () {

    /**
     * [fn.typeOf] 检查值的类型
     * @param value : any
     * @param type_ : string|string[]
     * @param types : ...string[]
     */
    var typeOf = restArgs(function (value, type_, types) {
      if (!type_) return false;
      types = toArr(type_).concat(types);
      return types.some(function (tp) {
        switch (tp) {
          case 'str': return typeof value === 'string';
          case 'num': return typeof value === 'number';
          case 'bol': return typeof value === 'boolean';
          case 'fun': return typeof value === 'function';
          case 'nul': return value === null;
          case 'udf': return value === undefined;
          case 'dat': return value instanceof Date;
          case 'ptn': return value instanceof RegExp;
          case 'arr': return value instanceof Array;
          case 'obj': return (function () {
            if (!value || typeof value !== "object" || value.nodeType || [_global, _window, _self].indexOf(value) > -1) {
              return false;
            }
            try {
              if (value.constructor && !has(value, "constructor") && !has(value.constructor.prototype, "isPrototypeOf")) {
                return false;
              }
            } catch (e) {
              return false;
            }
            for (var key in value) { }
            return key === undefined || has(value, key);
          })();
          default: return typeof value === tp;
        }
      });
    });

    /**
     * [fn.typeVal] 获取期望类型的值
     * @param value : any
     * @param type_ : string|string[]
     * @param types : ...string[]
     */
    var typeVal = restArgs(function (value, type_, types) {
      return typeOf.apply(void 0, [value, type_].concat(types)) && value;
    });

    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param value  : any|function [?]
     */
    function array(length, value) {
      var tmpArr = [], tmpVal = 0;
      for (var i = 0; i < length; i++) {
        if (value === undefined) {
          tmpArr.push(tmpVal);
          tmpVal++;
        } else if (typeOf(value, 'fun')) {
          tmpArr.push(value.length > 0 ? value(i) : value());
        } else {
          tmpArr.push(value);
        }
      }
      return tmpArr;
    }

    /**
     * [fn.range] 返回一个范围数组
     * @param start  : number [?]
     * @param length : number
     */
    function range(start, length) {
      var rgArr = [];
      if (typeOf(start, 'num')) {
        var rangeLoop = function (isAdd) {
          if (length >= 0) {
            for (var i = 0; i < length; i++) {
              rgArr.push(isAdd ? i + start : i);
            }
          } else if (length < 0) {
            for (var i = 0; i > length; i--) {
              rgArr.push(isAdd ? i + start : i);
            }
          }
        };
        if (length === void 0) {
          length = start, start = undefined;
          rangeLoop(false);
        } else if (typeOf(length, 'num')) {
          rangeLoop(true);
        }
      }
      return rgArr;
    }

    /**
     * [fn.toArr] 值数组化
     * @param value : any
     */
    function toArr(value) {
      return value && value instanceof Array ? value : [value];
    }

    /**
     * [fn.indexOf] 寻找值在数组中的索引
     * @param srcArr    : array|string
     * @param predicate : object|function|any
     */
    function indexOf(srcArr, predicate) {
      for (var i = 0; i < srcArr.length; i++) {
        if (typeOf(predicate, 'obj')) {
          var isMatched = keys(predicate).every(function (k) {
            return srcArr[i][k] === predicate[k];
          });
          if (isMatched) return i;
        } else if (typeOf(predicate, 'fun')) {
          if (predicate(srcArr[i])) return i;
        }
      }
      return srcArr.indexOf(predicate);
    }

    /**
     * [fn.find] 根据条件取一个值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    function find(srcArr, predicate) {
      var idx = indexOf(srcArr, predicate);
      return idx > -1 ? srcArr[idx] : undefined;
    }

    /**
     * [fn.filter] 根据条件取过滤值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    function filter(srcArr, predicate) {
      return filterBase(srcArr, predicate, true);
    }

    /**
      * [fn.reject] 根据条件过滤值
     * @param srcArr    : array
     * @param predicate : object|function|any
      */
    function reject(srcArr, predicate) {
      return filterBase(srcArr, predicate, false);
    }

    function filterBase(srcArr, predicate, isFilter) {
      var ftItems = [], rjItems = [];
      forEach(srcArr, function (item) {
        if (typeOf(predicate, 'obj')) {
          var isMatched = keys(predicate).every(function (k) {
            return predicate[k] === item[k];
          });
          isMatched ? ftItems.push(item) : rjItems.push(item);
        }
        else if (typeOf(predicate, 'fun')) {
          predicate(item) ? ftItems.push(item) : rjItems.push(item);
        }
      });
      return isFilter ? ftItems : rjItems;
    }

    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    function contains(srcArr, predicate) {
      return indexOf(srcArr, predicate) > -1;
    }

    /**
     * [fn.drop] 去掉空数组、空对象及布尔化后为false的值
     * @param srcArr  : array
     * @param isDrop0 : boolean = false
     */
    function drop(srcArr, isDrop0) {
      if (isDrop0 === void 0) isDrop0 = false;
      var tmpArr = [];
      forEach(srcArr, function (val) {
        var isLen0 = typeOf(val, ['arr', 'obj']) && len(val) === 0;
        if ((val && !isLen0) || (!isDrop0 && val === 0)) {
          tmpArr.push(val);
        }
      });
      return tmpArr;
    }

    /**
     * [fn.flatten] 把有结构的数组打散，减少层数
     * @param srcArr : array
     * @param isDeep : boolean = false
     */
    function flatten(srcArr, isDeep) {
      if (isDeep === void 0) isDeep = false;
      var tmpArr = [];
      forEach(srcArr, function (val) {
        if (typeOf(val, 'arr')) {
          tmpArr.push.apply(tmpArr, isDeep ? flatten(val, true) : val);
        } else {
          tmpArr.push(val);
        }
      });
      return tmpArr;
    }

    /**
     * [fn.pluck] 把结构中的字段取出合并到一个数组中
     * @param srcArr  : array
     * @param pathStr : string
     */
    function pluck(srcArr, pathStr) {
      var tmpArr = [];
      if (typeVal(pathStr, 'str')) {
        forEach(srcArr, function (val) {
          return tmpArr.push(get(val, pathStr));
        });
      }
      return tmpArr;
    }

    /**
     * [fn.uniq] 去重或根据字段去重
     * @param srcArr  : array
     * @param pathStr : string [?]
     * @param isDeep  : boolean = true
     */
    function uniq(srcArr, pathStr, isDeep) {
      if (isDeep === void 0) isDeep = true;
      if (typeof pathStr === 'boolean') {
        isDeep = pathStr, pathStr = undefined;
      }
      pathStr = typeVal(pathStr, 'str');
      var tmpArr = srcArr.slice();
      for (var i = 0; i < tmpArr.length - 1; i++) {
        for (var j = i + 1; j < tmpArr.length; j++) {
          var isDuplicate = void 0;
          if (pathStr) {
            var val1 = get(tmpArr[i], pathStr);
            var val2 = get(tmpArr[j], pathStr);
            isDuplicate = isDeep ? isDeepEqual(val1, val2) : val1 === val2;
          } else {
            isDuplicate = isDeep ? isDeepEqual(tmpArr[i], tmpArr[j]) : tmpArr[i] === tmpArr[j];
          }
          if (isDuplicate) {
            tmpArr.splice(j, 1);
            j--;
          }
        }
      }
      return tmpArr;
    }

    /**
     * [fn.forEach] 遍历数组或类数组
     * @alias fn.each
     * @param srcObj   : array|object
     * @param iteratee : function
     */
    function forEach(srcObj, iteratee) {
      if (!srcObj) return srcObj;
      if (!typeOf(iteratee, 'fun')) throw expFuncErr;
      var length = srcObj.length;
      if (length && length >= 0 && length < Math.pow(2, 53) - 1) {
        for (var i = 0; i < length; i++) {
          iteratee(srcObj[i], i);
        }
      }
      else {
        var ks = keys(srcObj);
        for (var i = 0; i < ks.length; i++) {
          iteratee(srcObj[ks[i]], ks[i]);
        }
      }
      return srcObj;
    }

    /**
     * [fn.sortBy] 返回对象数组根据字段排序后的副本
     * @param srcArr : array
     * @param field  : string
     * @param isDesc : boolean = false
     */
    function sortBy(srcArr, field, isDesc) {
      if (isDesc === void 0) isDesc = false;
      return srcArr.slice().sort(function (row1, row2) {
        var rst1 = get(row1, field), rst2 = get(row2, field);
        if (rst1 !== 0 && !rst1) {
          return isDesc ? 1 : -1;
        } else if (rst2 !== 0 && !rst2) {
          return isDesc ? -1 : 1;
        } else if (rst1 === rst2) {
          return 0;
        } else {
          return (rst1 > rst2) ? (isDesc ? -1 : 1) : (isDesc ? 1 : -1);
        }
      });
    }

    /**
     * [fn.len] 获取对象自有属性的个数
     * @arg srcObj : any
     */
    function len(srcObj) {
      if (typeOf(srcObj, 'obj')) {
        return keys(srcObj).length;
      }
      else if (typeOf(srcObj, 'str', 'arr', 'fun') || get(srcObj, 'length', 'num')) {
        return srcObj.length;
      } else {
        return -1;
      }
    }

    /**
     * [fn.has] 判断对象是否存在某自有属性
     * @param srcObj   : object
     * @param property : string
     * @param types    : ...string[]
     */
    var has = restArgs(function (srcObj, property, types) {
      var isHas = srcObj && srcObj.hasOwnProperty(property);
      return types.length ? isHas && typeOf(srcObj[property], types) : isHas;
    });

    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param srcObj  : object
     * @param pathStr : string
     * @param types   : ...string[]
     */
    var get = restArgs(function (srcObj, pathStr, types) {
      if (!srcObj || !typeOf(pathStr, 'str')) return undefined;
      var paths = contains(pathStr, '.') ? drop(pathStr.split('.')) : drop(pathStr.split('/'));
      var prop = paths.shift();
      if (!prop) {
        return types.length ? typeVal.apply(void 0, [srcObj].concat(types)) : srcObj;
      }
      if (paths.length) {
        if (!typeOf(srcObj[prop], 'obj', 'arr')) return undefined;
        return get.apply(void 0, [srcObj[prop], paths.join('/')].concat(types));
      } else {
        return types.length ? typeVal.apply(void 0, [srcObj[prop]].concat(types)) : srcObj[prop];
      }
    });

    /**
     * [fn.keys] 获取对象的键数组
     * @param srcObj : object
     */
    function keys(srcObj) {
      return Object.keys(srcObj);
    }

    /**
     * [fn.pick] 获取对象的部分属性
     * @param srcObj    : object
     * @param predicate : function
     * @param props     : ...string[]
     */
    var pick = restArgs(function (srcObj, predicate, props) {
      return extendBase({}, srcObj, predicate, props, false);
    });

    /**
     * [fn.extend] 给对象赋值
     * @param tarObj    : object
     * @param srcObj    : object
     * @param predicate : function
     * @param props     : ...string[]
     */
    var extend = restArgs(function (tarObj, srcObj, predicate, props) {
      if (typeVal(srcObj, 'object')) {
        extendBase(tarObj, srcObj, predicate, props, true);
      }
      return tarObj;
    });

    function extendBase(tarObj, srcObj, predicate, propList, isTraDft) {
      var traversal = function (tarObj, srcObj, propList) {
        forEach(propList, function (prop) {
          tarObj[prop] = has(srcObj, prop) ? srcObj[prop] : undefined;
        });
      }
      if (typeOf(predicate, 'str')) {
        propList.unshift(predicate);
        traversal(tarObj, srcObj, propList);
      }
      else if (typeOf(predicate, 'arr')) {
        traversal(tarObj, srcObj, predicate);
      }
      else if (typeOf(predicate, 'fun')) {
        forIn(srcObj, function (key, val) {
          if (predicate(key, val)) tarObj[key] = val;
        });
      }
      else if (isTraDft) {
        traversal(tarObj, srcObj, Object.keys(srcObj));
      }
      return tarObj;
    }

    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @arg srcObj   : object
     * @arg iteratee : function
     */
    function forIn(srcObj, iteratee) {
      if (!typeOf(iteratee, 'fun')) {
        throw expFuncErr;
      }
      return forEach(srcObj, function (val, key) {
        return iteratee(key, val);
      });
    }

    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param srcObj : object
     */
    function deepCopy(srcObj) {
      if (typeof srcObj !== 'object') {
        return srcObj;
      }
      var tmpObj;
      if (typeOf(srcObj, 'arr')) {
        tmpObj = [];
        for (var i = 0; i < srcObj.length; i++) {
          tmpObj.push(deepCopy(srcObj[i]));
        }
      } else if (typeOf(srcObj, 'obj')) {
        tmpObj = {};
        for (var key in srcObj) {
          if (has(srcObj, key)) tmpObj[key] = deepCopy(srcObj[key]);
        }
      } else {
        tmpObj = srcObj;
      }
      return tmpObj;
    }

    /**
     * [fn.isEmpty] 判断对象是否为空对象或数组
     * @param srcObj : object
     */
    function isEmpty(srcObj) {
      return len(srcObj) === 0;
    }

    /**
     * [fn.isDeepEqual] 判断数组或对象是否相等
     * @param obj1     : object|array
     * @param obj2     : object|array
     * @param isStrict : boolean = false
     */
    function isDeepEqual(obj1, obj2, isStrict) {
      if (isStrict === void 0) isStrict = false;
      if (typeof obj1 !== typeof obj2) {
        return false;
      }
      if (typeOf(obj1, 'arr') && typeOf(obj2, 'arr')) {
        if (obj1.length !== obj2.length) {
          return false;
        }
        for (var i = 0; i < obj1.length; i++) {
          if (!isDeepEqual(obj1[i], obj2[i], isStrict)) {
            return false;
          }
        }
        return true;
      } else if (typeOf(obj1, 'obj') && typeOf(obj2, 'obj')) {
        if (len(obj1) !== len(obj2)) {
          return false;
        }
        var ks = keys(obj1);
        if (isStrict && !isDeepEqual(ks, keys(obj2))) {
          return false;
        }
        for (var i = 0; i < ks.length; i++) {
          if (!obj2.hasOwnProperty(ks[i])) {
            return false;
          }
          if (!isDeepEqual(obj1[ks[i]], obj2[ks[i]], isStrict)) {
            return false;
          }
        }
        return true;
      } else {
        return obj1 === obj2;
      }
    }

    /**
     * [fn.random] 返回一个指定范围内的随机数
     * @param start : number
     * @param end   : number [?]
     */
    function random(start, end) {
      if (start === undefined && end === undefined) {
        return Math.random();
      }
      else if (end === undefined || start === end) {
        return Math.floor(Math.random() * start);
      }
      else {
        if (start > end) {
          var tmpSta = start;
          start = end, end = tmpSta;
          return Math.ceil(Math.random() * (end - start) + start);
        }
        else {
          return Math.floor(Math.random() * (end - start) + start);
        }
      }
    }

    /**
     * [fn.gid] 返回一个指定长度的随机ID
     * @param length : number = 12
     */
    function gid(length) {
      if (length === void 0) length = 12;
      var charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var id = '';
      forEach(array(length), function (x) {
        return id += charSet[random(charSet.length)];
      });
      return id;
    }

    /**
     * [fn.gcolor] 返回一个随机颜色色值
     */
    function gcolor() {
      return '#' + ('00000' + (random(0x1000000) << 0).toString(16)).slice(-6);
    }

    var intervalTimers = {};
    var timeoutTimers = {};

    /**
     * [fn.interval] 循环定时器
     * @param timerId  : string [?]
     * @param duration : number|false|null [?]
     * @param callback : function
     */
    function interval(timerId, duration, callback) {
      return timerBase(timerId, duration, callback, 'interval');
    }

    /**
     * [fn.timeout] 延时定时器
     * @param timerId  : string [?]
     * @param duration : number|false|null [?]
     * @param callback : function
     */
    function timeout(timerId, duration, callback) {
      return timerBase(timerId, duration, callback, 'timeout');
    }

    function timerBase(timerId, duration, callback, type_) {
      var params, timer, setTimer, clearTimer;
      if (type_ === 'interval') {
        timer = intervalTimers, setTimer = setInterval, clearTimer = clearInterval;
      } else if (type_ === 'timeout') {
        timer = timeoutTimers, setTimer = setTimeout, clearTimer = clearTimeout;
      }
      var isIdStr = typeVal(timerId, 'str');
      if (isIdStr && duration === undefined) {
        function clearFn() { return clearTimer(timer[timerId]); };
        return { id: timer[timerId], stop: clearFn, clear: clearFn };
      }
      if (isIdStr && contains([null, false], duration)) {
        clearTimer(timer[timerId]);
        return timer[timerId] = null;
      }
      if (isIdStr && typeOf(duration, 'fun')) {
        params = [duration, 0], callback = params[0], duration = params[1];
      }
      if (typeOf(timerId, 'num') && typeOf(duration, 'fun')) {
        params = [undefined, timerId, duration];
        timerId = params[0], duration = params[1], callback = params[2];
      }
      if (typeOf(timerId, 'fun')) {
        params = [undefined, 0, timerId];
        timerId = params[0], duration = params[1], callback = params[2];
      }
      if (typeOf(callback, 'fun') && typeOf(duration, 'num') && duration >= 0) {
        if (isIdStr) {
          clearTimer(timer[timerId]);
          return timer[timerId] = setTimer(callback, duration);
        }
        if (timerId === undefined) return setTimer(callback, duration);
      }
    }

    /**
     * [fn.defer] 延迟执行函数
     * @param srcFunc : function
     */
    function defer(srcFunc) {
      return setTimeout(srcFunc);
    }

    /**
     * [fn.timestamp] 返回一个时间戳
     * @param time : date|string|number
     */
    function timestamp(time) {
      return dateBase(time).getTime();
    }

    /**
     * [fn.asUtcTime] 转化为相同时间的UTC时间戳
     * @param time : date|string|number
     */
    function asUtcTime(time) {
      var date = dateBase(time);
      if (!date.getTime()) return NaN;
      return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );
    }

    /**
     * [fn.asXyzTime] 转化为相同时间的指定时差的时间戳
     * @param time : date|string|number
     * @param offset : number
     */
    function asXyzTime(time, offset) {
      return asUtcTime(time) - (!+offset ? 0 : +offset);
    }

    /**
     * [fn.fmtDate] 获取格式化的时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     */
    function fmtDate(fmtStr, time) {
      return fmtDateBase(fmtStr, time, function (date, mtd) {
        return match(mtd, {
          'y': date.getFullYear(),
          'M': date.getMonth() + 1,
          'd': date.getDate(),
          'h': date.getHours(),
          'm': date.getMinutes(),
          's': date.getSeconds(),
          'q': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        });
      });
    }

    /**
     * [fn.fmtUtcDate] 获取格式化的UTC时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     */
    function fmtUtcDate(fmtStr, time) {
      return fmtDateBase(fmtStr, time, function (date, mtd) {
        return match(mtd, {
          'y': date.getUTCFullYear(),
          'M': date.getUTCMonth() + 1,
          'd': date.getUTCDate(),
          'h': date.getUTCHours(),
          'm': date.getUTCMinutes(),
          's': date.getUTCSeconds(),
          'q': Math.floor((date.getUTCMonth() + 3) / 3),
          'S': date.getUTCMilliseconds()
        });
      });
    }

    /**
     * [fn.fmtXyzDate] 获取格式化指定时差的时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     * @param offset : number
     */
    function fmtXyzDate(fmtStr, time, offset) {
      var date = dateBase(time);
      if (!date.getTime()) return '';
      var ms = date.getUTCMilliseconds();
      return fmtDate(fmtStr, timestamp(fmtUtcDate('yyyy-MM-dd hh:mm:ss', time)) + ms + (!+offset ? 0 : +offset));
    }

    function fmtDateBase(fmtStr, time, fmtObj) {
      var date = dateBase(time);
      if (!date.getTime()) return '';
      var obj = {
        'M+': fmtObj(date, 'M'), 'd+': fmtObj(date, 'd'), 'h+': fmtObj(date, 'h'),
        'm+': fmtObj(date, 'm'), 's+': fmtObj(date, 's'), 'q+': fmtObj(date, 'q'), 'S': fmtObj(date, 'S'),
      };
      if (/(y+)/.test(fmtStr)) {
        fmtStr = fmtStr.replace(RegExp.$1, (fmtObj(date, 'y') + '').substr(4 - RegExp.$1.length));
      }
      forIn(obj, function (k) {
        if (new RegExp('(' + k + ')').test(fmtStr)) {
          fmtStr = fmtStr.replace(
            RegExp.$1, (RegExp.$1.length === 1) ? obj[k] : (('00' + obj[k]).substr((obj[k] + '').length))
          );
        }
      });
      return fmtStr;
    }

    function dateBase(time) {
      if (time instanceof Date) return time;
      time = String(time);
      return new Date(time.match(/^[0-9]*$/) ? +time : time);
    }

    /**
     * [fn.match] 字符串匹配
     * @param source : any
     * @param cases  ：object
     * @param isExec : boolean = true
     */
    function match(source, cases, isExec) {
      if (!typeOf(cases, 'obj')) throw new Error('Cases must be an Object!');
      if (isExec === void 0) isExec = true;
      var symbol = '__@fnMatch__';
      if (has(cases, source)) {
        symbol = source;
      } else if (has(cases, 'default')) {
        symbol = 'default';
      }
      var matched = cases[symbol];
      if (matched === '@next') {
        var ks = keys(cases);
        for (var i = ks.indexOf(symbol); i < ks.length; i++) {
          if (cases[ks[i]] !== '@next') {
            matched = cases[ks[i]];
            break;
          }
        }
      }
      if (isExec && typeOf(matched, 'fun')) {
        return len(matched) ? matched(source) : matched();
      } else {
        return matched === '@next' ? undefined : matched;
      }
    }

    /**
     * [fn.pretty] 转换成格式化字符串
     * @param srcObj : any
     */
    function pretty(srcObj) {
      return typeOf(srcObj, 'arr', 'obj') ? JSON.stringify(srcObj, null, 2) : String(srcObj);
    }

    var deCodes = ['&', '<', '>', ' ', '\'', '"'];
    var enCodes = ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;'];

    /**
     * [fn.escape] 编码HTML字符串
     * @param srcStr : string
     */
    function escape(srcStr) {
      forEach(deCodes, function (str, i) {
        srcStr = srcStr.replace(new RegExp(str, 'g'), enCodes[i]);
      });
      return srcStr;
    }

    /**
     * [fn.unescape] 解码HTML字符串
     * @param srcStr : string
     */
    function unescape(srcStr) {
      forEach(enCodes, function (str, i) {
        srcStr = srcStr.replace(new RegExp(str, 'g'), deCodes[i]);
      });
      return srcStr;
    }

    /**
     * [fn.capitalize] 字符串首字母大写
     * @param srcStr : string
     */
    function capitalize(srcStr) {
      return typeVal(srcStr, 'str') ? srcStr[0].toUpperCase() + srcStr.substr(1) : srcStr;
    }

    /**
     * [fn.fmtCurrency] 格式化显示货币
     * @param number : number
     * @param digit  : number = 2
     */
    function fmtCurrency(number, digit) {
      if (digit === void 0) digit = 2;
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
    }

    /**
     * [fn.cutString] 裁切字符串到指定长度
     * @param srcStr : string
     * @param length : number
     */
    function cutString(srcStr, length) {
      var tmpStr = '';
      var count = 0;
      var tmpChar;
      for (var i = 0; i < srcStr.length; i++) {
        if (count >= length) break;
        tmpChar = srcStr.substr(i, 1);
        tmpStr += tmpChar;
        count += matchPattern(tmpChar, 'dbChar') ? 2 : 1;
      }
      return tmpStr + '...';
    }

    /**
     * [fn.parseQueryStr] 解析Url参数成对象
     * @param url : string
     */
    function parseQueryStr(url) {
      if (!contains(url, '?')) return {};
      var queryStr = url.substring(url.lastIndexOf('?') + 1);
      if (queryStr === '') return {};
      var querys = queryStr.split('&');
      var params = {};
      for (var i = 0; i < querys.length; i++) {
        var kw = querys[i].split('=');
        params[decodeURIComponent(kw[0])] = decodeURIComponent(kw[1] || '');
      }
      return params;
    }

    /**
     * [fn.stringifyQueryStr] 把对象编译成Url参数
     * @param obj : object
     */
    function stringifyQueryStr(obj) {
      if (!typeOf(obj, ['obj', 'arr'])) return '';
      obj = JSON.parse(JSON.stringify(obj));
      var pairs = [];
      var encode = encodeURIComponent;
      forIn(obj, function (key, value) {
        if (typeOf(value, 'arr')) {
          forEach(value, function (val, i) {
            var k = encode(key + '[' + i + ']');
            pairs.push(k + '=' + encode(val));
          });
        }
        else {
          var val = encode(value);
          pairs.push(encode(key) + '=' + val);
        }
      });
      return '?' + pairs.join('&');
    }

    var patterns = {
      // 匹配汉字
      cnChar: /[\u4e00-\u9fa5]/,
      // 匹配双字节字符
      dbChar: /[^x00-xff]/,
      // 匹配Email,
      email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
      // 匹配中国大陆手机号码
      mobPhone: /(\+?0?86\-?)?1[3456789]\d{9}/,
      // 匹配中国大陆电话号码，格式为“XXXX-XXXXXXX”，“XXXX-XXXXXXXX”，“XXX-XXXXXXX”，“XXX-XXXXXXXX”，“XXXXXXX”，“XXXXXXXX”
      telPhone: /((d{3,4})|d{3,4}-)?d{7,8}/,
      // 匹配中国大陆身份证
      idCard: /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/,
      // 匹配uuid
      uuid: /[0-9a-zA-Z]{8}-([0-9a-zA-Z]{4}-){3}[0-9a-zA-Z]{12}/,
      // 匹配Base64编码格式
      base64Code: /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/,
      // 匹配域名
      domain: /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/,
      // 匹配端口号
      port: /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/,
      // 匹配IP
      ip: /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/
    };
    // 匹配IP Url
    patterns['ipUrl'] = new RegExp('http(s)?://' + patterns.ip.source + '(:' + patterns.port.source + ')?');
    // 匹配Domain Url
    patterns['domainUrl'] = new RegExp('http(s)?://' + patterns.domain.source + '(:' + patterns.port.source + ')?');
    // 匹配Url
    patterns['url'] = new RegExp('http(s)?://(' + patterns.ip.source + '|' + patterns.domain.source + ')(:' + patterns.port.source + ')?');
    // 匹配必需带端口的IP Url
    patterns['ipWithPortUrl'] = new RegExp('http(s)?://' + patterns.ip.source + ':' + patterns.port.source);
    // 匹配必需带端口的Domain Url
    patterns['domainWithPortUrl'] = new RegExp('http(s)?://' + patterns.domain.source + ':' + patterns.port.source);
    // 匹配必需带端口的Url
    patterns['withPortUrl'] = new RegExp('http(s)?://(' + patterns.ip.source + '|' + patterns.domain.source + '):' + patterns.port.source);

    /**
     * [fn.setPattern]设置一个正则表达式
     * @param ptnMap  : string|object
     * @param pattern : regexp [?]
     */
    function setPattern(ptnMap, pattern) {
      if (pattern && !typeOf(pattern, 'ptn')) {
        throw new TypeError('Expected a RegExp pattern');
      }
      if (typeVal(ptnMap, 'str')) {
        patterns[ptnMap] = pattern;
      }
      else if (typeOf(ptnMap, 'obj')) {
        forIn(ptnMap, function (ptn, ptnVal) {
          if (typeOf(ptnVal, 'ptn')) {
            patterns[ptn] = ptnVal;
          } else {
            throw new TypeError('Expected RegExp pattern values');
          }
        });
      };
    }

    /**
     * [fn.getPattern]获取一个通用的正则表达式
     * @param type_ : string
     * @param limit : boolean = true
     */
    function getPattern(type_, limit) {
      if (!type_) return;
      if (limit === void 0) limit = true;
      if (contains(['all', 'list'], type_)) {
        return keys(patterns);
      };
      if (!get(patterns, type_)) {
        return undefined;
      }
      var pattern = patterns[type_];
      if (limit) {
        return new RegExp('^(' + pattern.source.replace(/^\^|\$$/mg, '') + ')$');
      } else {
        return pattern;
      }
    }

    /**
     * [fn.testPattern]用一个或几个通用正则测试
     * @param srcStr : string
     * @param type_  : string
     * @param types  : ...string[]
     * @param limit  : boolean = true
     */
    var testPattern = restArgs(function (srcStr, type_, types) {
      if (!srcStr || !type_) return false;
      return patternBase(srcStr, [type_].concat(types), true);
    });

    /**
     * [fn.matchPattern]与一个或几个通用正则匹配
     * @param srcStr : string
     * @param type_  : string
     * @param types  : ...string[]
     * @param limit  : boolean = true
     */
    var matchPattern = restArgs(function (srcStr, type_, types) {
      if (!srcStr || !type_) return null;
      return patternBase(srcStr, [type_].concat(types), false);
    });

    function patternBase(srcStr, types, isTest) {
      var limit = true,
        ttRst = false, mtRst = null;
      if (types.length && typeOf(types[types.length - 1], 'bol')) {
        limit = types.pop();
      }
      for (var i = 0; i < types.length; i++) {
        var pattern = getPattern(types[i], limit);
        if (pattern) {
          isTest ? ttRst = pattern.test(srcStr) : mtRst = srcStr.match(pattern);
          if (ttRst || mtRst) break;
        }
      }
      return isTest ? ttRst : mtRst;
    }

    /**
     * [fn.restArgs] 获取函数的剩余参数
     * @param srcFunc : function
     */
    function restArgs(srcFunc) {
      var start = srcFunc.length - 1;
      return function () {
        var length = Math.max(arguments.length - start, 0);
        var rest = Array(length);
        for (var index = 0; index < length; index++) {
          rest[index] = arguments[index + start];
        }
        switch (start) {
          case 0: return srcFunc.call(this, rest);
          case 1: return srcFunc.call(this, arguments[0], rest);
          case 2: return srcFunc.call(this, arguments[0], arguments[1], rest);
          default:
            var args = Array(start + 1);
            for (index = 0; index < start; index++) {
              args[index] = arguments[index];
            }
            args[start] = rest;
            return srcFunc.apply(this, args);
        };
      };
    }

    /**
     * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
     * @param  srcFunc : function
     * @param  wait    : number
     * @param  options : object [?]
     * leading: boolean = true
     * trailing: boolean = true
     */
    function throttle(srcFunc, wait, options) {
      var leading = true, trailing = true;
      if (!typeOf(srcFunc, 'fun')) throw expFuncErr;
      if (typeOf(options, 'obj')) {
        leading = has(options, 'leading') ? !!options.leading : leading;
        trailing = has(options, 'trailing') ? !!options.trailing : trailing;
      }
      return debounce(srcFunc, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * [fn.debounce] 防抖函数, 适用于获取用户输入
     * @param  srcFunc : function
     * @param  wait    : number
     * @param  options : object [?]
     * leading: boolean = false
     * maxing: boolean = false
     * maxWait: number = Math.max(0, wait)
     * trailing: boolean = true
     */
    function debounce(srcFunc, wait, options) {
      if (!typeOf(srcFunc, 'fun')) throw expFuncErr;
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime;
      var lastInvokeTime = 0;
      var leading = false, maxing = false, trailing = true;
      wait = Number(wait) || 0;
      if (typeOf(options, 'obj')) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      var invokeFunc = function (time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = srcFunc.apply(thisArg, args);
        return result;
      }
      var leadingEdge = function (time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      var remainingWait = function (time) {
        var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;
        return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      var shouldInvoke = function (time) {
        var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === undefined
          || timeSinceLastCall >= wait
          || timeSinceLastCall < 0
          || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = Date.now();
        if (shouldInvoke(time)) return trailingEdge(time);
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = undefined;
        if (trailing && lastArgs) return invokeFunc(time);
        lastArgs = lastThis = undefined;
        return result;
      }
      function debounced() {
        var time = Date.now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === undefined) return leadingEdge(lastCallTime);
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = function () {
        if (timerId !== undefined) clearTimeout(timerId);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      };
      debounced.flush = function () {
        return timerId === undefined ? result : trailingEdge(Date.now());
      };
      return debounced;
    }

    /**@spliter*/
    /**=================================================================== */

    /**
     * [fn.print] 在控制台打印值
     * @param value  : any
     */
    function print(value) {
      console.log(pretty(value));
    }

    /**
     * [fn.log] 在控制台打印格式化的值
     * @param value   : any
     * @param title   : string|boolean [?]
     * @param configs : object [?]
     * title: string
     * width: number = 66 [30-100]
     * isFmt: boolean = true
     * isShowTime: boolean = true
     * isSplit: boolean = true,
     */
    function log(value, title, configs) {
      var isFmt;
      function getIsFmt(configs) {
        return has(configs, 'isFmt', 'bol') ? configs.isFmt : true;
      };
      function getTitle(configs) {
        return get(configs, 'title', 'str') || 'funclib(' + version + ')';
      };
      if (typeVal(title, 'str')) {
        if (typeOf(configs, 'bol')) {
          isFmt = configs, configs = {};
        } else {
          isFmt = getIsFmt(configs);
        }
      }
      else if (typeOf(title, 'bol')) {
        isFmt = title;
        title = getTitle(configs);
      }
      else if (typeOf(title, 'obj')) {
        configs = title;
        isFmt = getIsFmt(configs);
        title = getTitle(configs);
      }
      else {
        isFmt = true;
        title = 'funclib(' + version + ')';
      }
      value = pretty(value);
      var isShowTime = has(configs, 'isShowTime') ? !!configs.isShowTime : true;
      var time = isShowTime ? '[' + fmtDate('hh:mm:ss', new Date()) + '] ' : '';
      title = title.replace(/\n/mg, '');
      var originTtLength = (time + title + '[] ').length;
      if (!isFmt) {
        title = '( ' + title + ' )';
      }
      title = time + title;
      var width = get(configs, '/width');
      if (!width || width < 30 || width > 100) {
        width = 66;
      }
      if (originTtLength > width) {
        title = cutString(title, width - 3);
      }
      else if (isFmt) {
        title = array((width - originTtLength) / 2, ' ').join('') + title;
      }
      var isSplit = has(configs, 'isSplit', 'bol') ? configs.isSplit : true;
      if (!isFmt) {
        var logMsg = title + ':\n' + value;
        console.log(isSplit ? '\n' + logMsg + '\n' : logMsg);
      }
      else {
        var sgLine_1 = '', dbLine_1 = '';
        array(width).forEach(function (x) { sgLine_1 += '-', dbLine_1 += '='; });
        var logMsg = dbLine_1 + '\n' + title + '\n' + sgLine_1 + '\n' + value + '\n' + dbLine_1;
        console.log(isSplit ? '\n' + logMsg + '\n' : logMsg);
      }
    }

    /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el : HTMLElement
     */
    function fullScreen(el) {
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }
      if (el && el.tagName) {
        var rfs = el['requestFullScreen']
          || el['webkitRequestFullScreen']
          || el['mozRequestFullScreen']
          || el['msRequestFullScreen'];
        if (rfs) {
          return rfs.call(el);
        }
        if (window['ActiveXObject']) {
          var ws = new window['ActiveXObject']('WScript.Shell');
          if (ws) {
            ws.SendKeys('{F11}');
          }
        }
      }
    }

    /**
     * [fn.exitFullScreen] 退出全屏显示
     */
    function exitFullScreen() {
      var cfs = document['cancelFullScreen']
        || document['webkitCancelFullScreen']
        || document['mozCancelFullScreen']
        || document['exitFullScreen'];
      if (cfs) {
        return cfs.call(document);
      }
      if (window['ActiveXObject']) {
        var ws = new window['ActiveXObject']('WScript.Shell');
        if (ws != null) {
          ws.SendKeys('{F11}');
        }
      }
    }

    /**
     * [fn.isFullScreen] 检测是否全屏状态
     */
    function isFullScreen() {
      return document['fullscreenEnabled']
        || window['fullScreen']
        || document['mozFullscreenEnabled']
        || document['webkitIsFullScreen']
        || document['msIsFullScreen']
        || false;
    }

    /**
     * [fn.fullScreenChange] 全屏状态变化事件
     * @param callback function|false [?]
     */
    function fullScreenChange(callback) {
      var event = 'fullscreenchange';
      var events = [event, 'webkit' + event, 'moz' + event, 'MS' + event];
      function removeFsChangeEvent() {
        return events.forEach(function (e) {
          document.removeEventListener(e, window['onfullscreen']);
        });
      };
      if (typeOf(callback, 'fun')) {
        window['onfullscreen'] = callback;
        events.forEach(function (e) {
          document.addEventListener(e, window['onfullscreen']);
        });
      }
      else if (window['onfullscreen']) {
        if (callback === false) {
          removeFsChangeEvent();
        }
        else {
          return { off: removeFsChangeEvent };
        }
      }
    }

    /**
     * [fn.copyText] 复制文本到粘贴板
     * @param text : string
     */
    function copyText(text) {
      if (text === void 0) text = '';
      var textarea = document.createElement('textarea');
      textarea.style.position = 'fixed';
      textarea.style.left = '200%';
      document.body.appendChild(textarea);
      textarea.value = text;
      textarea.select();
      document.execCommand('Copy');
      document.body.removeChild(textarea);
    }

    /**=================================================================== */
    /**@spliter*/

    /**
     * [fn.noConflict] 释放fn变量占用权
     */
    function noConflict() {
      if (root.fn === this) root.fn = originalFn;
      return this;
    }

    var shadowFn = {};

    function funclib(data) {
      shadowFn.data = data;
      return shadowFn;
    }

    funclib.typeOf = typeOf;
    funclib.typeVal = typeVal;

    funclib.array = array;
    funclib.range = range;
    funclib.toArr = toArr;
    funclib.indexOf = indexOf;
    funclib.find = find;
    funclib.filter = filter;
    funclib.reject = reject;
    funclib.contains = contains;
    funclib.drop = drop;
    funclib.flatten = flatten;
    funclib.pluck = pluck;
    funclib.uniq = uniq;
    funclib.forEach = forEach;
    funclib.each = forEach;
    funclib.sortBy = sortBy;

    funclib.len = len;
    funclib.has = has;
    funclib.get = get;
    funclib.keys = keys;
    funclib.pick = pick;
    funclib.extend = extend;
    funclib.forIn = forIn;
    funclib.deepCopy = deepCopy;
    funclib.isEmpty = isEmpty;
    funclib.isDeepEqual = isDeepEqual;

    funclib.random = random;
    funclib.gid = gid;
    funclib.gcolor = gcolor;

    funclib.interval = interval;
    funclib.timeout = timeout;
    funclib.defer = defer;
    funclib.time = timestamp;
    funclib.timestamp = timestamp;
    funclib.asUtcTime = asUtcTime;
    funclib.asXyzTime = asXyzTime;
    funclib.fmtDate = fmtDate;
    funclib.fmtUtcDate = fmtUtcDate;
    funclib.fmtXyzDate = fmtXyzDate;

    funclib.match = match;
    funclib.pretty = pretty;
    funclib.escape = escape;
    funclib.unescape = unescape;
    funclib.capitalize = capitalize;
    funclib.fmtCurrency = fmtCurrency;
    funclib.cutString = cutString;
    funclib.parseQueryStr = parseQueryStr;
    funclib.stringifyQueryStr = stringifyQueryStr;

    funclib.setPattern = setPattern;
    funclib.getPattern = getPattern;
    funclib.testPattern = testPattern;
    funclib.matchPattern = matchPattern;

    funclib.restArgs = restArgs;
    funclib.throttle = throttle;
    funclib.debounce = debounce;

    /**@spliter*/
    /**=================================================================== */

    funclib.print = print;
    funclib.log = log;
    funclib.fullScreen = fullScreen;
    funclib.exitFullScreen = exitFullScreen;
    funclib.isFullScreen = isFullScreen;
    funclib.fullScreenChange = fullScreenChange;
    funclib.copyText = copyText;

    /**=================================================================== */
    /**@spliter*/

    forEach(keys(funclib), function (method) {
      shadowFn[method] = restArgs(function (args) {
        if (shadowFn.data !== void 0) {
          args = [shadowFn.data].concat(args);
        }
        return fn[method].apply(void 0, args);
      });
    });

    funclib.version = version;
    funclib.noConflict = noConflict;

    return funclib;
  })();

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    root.fn = fn;
    define(function () {
      return fn;
    });
  }
  else if (_module) {
    (_module.exports = fn).fn = fn;
    _module.fn = fn;
  }
  else {
    root.fn = fn;
  }

}.call(this));