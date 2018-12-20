/**
 * @license
 * FuncLib <https://www.funclib.net/>
 * GitHub Repository <https://github.com/CN-Tower/funclib.js>
 * Released under MIT license <https://github.com/CN-Tower/funclib.js/blob/master/LICENSE>
 */
; (function () {

  var VERSION = '3.1.2';

  var _global = typeof global == 'object' && global && global.Object === Object && global;

  var _self = typeof self == 'object' && self && self.Object === Object && self;

  var _exports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  var _module = _exports && typeof module == 'object' && module && !module.nodeType && module;

  var root = _global || _self || Function('return this')();

  var originalFn = root.fn;

  var fn = (function () {

    /**
     * [fn.typeOf] 检查值的类型
     * @param value : any
     * @param _type : string
     * @param types : ...string[]|string[]
     */
    function typeOf(value, _type) {
      var types = [];
      for (var i = 2; i < arguments.length; i++) {
        types[i - 2] = arguments[i];
      }
      if (!_type) return false;
      _type instanceof Array ? types = _type : types.unshift(_type);
      return types.some(function (type_) {
        switch (type_) {
          case 'arr': return value && value instanceof Array;
          case 'obj': return value && typeof value === 'object' && !(value instanceof Array);
          case 'fun': return value && typeof value === 'function';
          case 'str': return typeof value === 'string';
          case 'num': return typeof value === 'number';
          case 'bol': return typeof value === 'boolean';
          case 'udf': return value === undefined;
          case 'nul': return value === null;
          default: return typeof value === type_;
        }
      });
    }

    /**
     * [fn.typeVal] 检查是否为某类型的值，是则返回该值，不是则返回false
     * @param value : any
     * @param _type : string
     * @param types : ...string[]|string[]
     */
    function typeVal(value, _type) {
      var types = [];
      for (var i = 2; i < arguments.length; i++) {
        types[i - 2] = arguments[i];
      }
      return typeOf.apply(void 0, [value, _type].concat(types)) && value;
    }

    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param length : number
     * @param value  : any|function
     */
    function array(length, value) {
      var tmpArr = [];
      var tmpVal = 0;
      for (var i = 0; i < length; i++) {
        if (value === undefined) {
          tmpArr.push(tmpVal);
          tmpVal++;
        }
        else if (typeOf(value, 'fun')) {
          tmpArr.push(value.length > 0 ? value(i) : value());
        }
        else {
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
      var _range = [];
      if (typeOf(start, 'num')) {
        if (length === void 0) {
          length = start;
          start = undefined;
          loopFn(false);
        }
        else if (typeOf(length, 'num')) {
          loopFn(true);
        }
        function loopFn(isAdd) {
          if (length >= 0) {
            for (var i = 0; i < length; i ++) {
              _range.push(isAdd ? i + start : i);
            }
          }
          else if (length < 0) {
            for (var i = 0; i > length; i --) {
              _range.push(isAdd ? i + start : i);
            }
          }
        }
      }
      return _range;
    }

    /**
     * [fn.toArr] 值数组化
     * @param value : any
     */
    function toArr(value) {
      return typeOf(value, 'arr') ? value : [value];
    }

    /**
     * [fn.indexOf] 寻找值在数组中的索引
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    function indexOf(srcArr, predicate) {
      for (var i = 0; i < srcArr.length; i++) {
        if (typeOf(predicate, 'obj')) {
          if (keys(predicate).every(function (k) { return srcArr[i][k] === predicate[k]; }))
            return i;
        }
        else if (typeOf(predicate, 'fun')) {
          if (predicate(srcArr[i]))
            return i;
        }
      }
      return srcArr.indexOf(predicate);
    }

    /**
     * [fn.find] 根据条件取值
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
      return doFilter(srcArr, predicate, true);
    }

    /**
      * [fn.reject] 根据条件过滤值
     * @param srcArr    : array
     * @param predicate : object|function|any
      */
    function reject(srcArr, predicate) {
      return doFilter(srcArr, predicate, false);
    }

    function doFilter(srcArr, predicate, isFlt) {
      var ftItems = [];
      var rjItems = [];
      srcArr.forEach(function (item) {
        if (typeOf(predicate, 'obj')) {
          if (keys(predicate).every(function (k) { return predicate[k] === item[k]; })) {
            ftItems.push(item);
          }
          else {
            rjItems.push(item);
          }
        }
        else if (typeOf(predicate, 'fun')) {
          predicate(item) ? ftItems.push(item) : rjItems.push(item);
        }
      });
      return isFlt ? ftItems : rjItems;
    }

    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    function contains(srcArr, predicate) {
      var idx = indexOf(srcArr, predicate);
      return idx > -1;
    }

    /**
     * [fn.drop] 去掉Boolean()后为false和空数组或对象的值
     * @param srcArr  : array
     * @param isDrop0 : boolean = false
     */
    function drop(srcArr, isDrop0) {
      if (isDrop0 === void 0) { isDrop0 = false; }
      var tmpArr = [];
      srcArr.forEach(function (val) {
        var isLen0 = typeOf(val, ['arr', 'obj']) && len(val) === 0;
        if ((val && !isLen0) || (!isDrop0 && val === 0))
          tmpArr.push(val);
      });
      return tmpArr;
    }

    /**
     * [fn.flatten] 把有结构的数组打散，减少层数
     * @param srcArr : array
     * @param isDeep : boolean = false
     */
    function flatten(srcArr, isDeep) {
      if (isDeep === void 0) { isDeep = false; }
      var tmpArr = [];
      srcArr.forEach(function (val) {
        if (typeOf(val, 'arr')) {
          isDeep ? tmpArr.push.apply(tmpArr, flatten(val, true)) : tmpArr.push.apply(tmpArr, val);
        }
        else {
          tmpArr.push(val);
        }
      });
      return tmpArr;
    }

    /**
     * [fn.pluck] 把结构中的字段取出合并到一个数组中
     * @param srcArr : array
     * @param path   : string
     */
    function pluck(srcArr, path) {
      var tmpArr = [];
      if (typeVal(path, 'str')) {
        srcArr.forEach(function (val) { return tmpArr.push(get(val, path)); });
      }
      return tmpArr;
    }

    /**
     * [fn.uniq] 去重或根据字段去重
     * @param srcArr : array
     * @param path   : string [?]
     * @param isDeep : boolean = true
     */
    function uniq(srcArr, path, isDeep) {
      if (isDeep === void 0) { isDeep = true; }
      if (typeof path === 'boolean') {
        isDeep = path;
        path = undefined;
      }
      path = typeVal(path, 'str');
      var tmpArr = srcArr.slice();
      for (var i = 0; i < tmpArr.length - 1; i++) {
        for (var j = i + 1; j < tmpArr.length; j++) {
          var isDuplicate = void 0;
          if (path) {
            var val1 = get(tmpArr[i], path);
            var val2 = get(tmpArr[j], path);
            isDuplicate = isDeep
              ? isDeepEqual(val1, val2)
              : val1 === val2;
          }
          else {
            isDuplicate = isDeep
              ? isDeepEqual(tmpArr[i], tmpArr[j])
              : tmpArr[i] === tmpArr[j];
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
     * @param srcObj   : array|object
     * @param iteratee : function
     */
    function forEach(srcObj, iteratee) {
      var length = get(srcObj, '/length', 'num');
      if (length && length >= 0 && length < Math.pow(2, 53) - 1) {
        for (var i = 0; i < length; i++) {
          iteratee(srcObj[i], i);
        }
      }
      else {
        var _keys = keys(srcObj);
        for (var i = 0; i < _keys.length; i++) {
          iteratee(srcObj[_keys[i]], _keys[i]);
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
      if (isDesc === void 0) { isDesc = false; }
      return srcArr.slice().sort(function (row1, row2) {
        var _a = [get(row1, field), get(row2, field)], rst1 = _a[0], rst2 = _a[1];
        if (rst1 !== 0 && !rst1) {
          return isDesc ? 1 : -1;
        }
        else if (rst2 !== 0 && !rst2) {
          return isDesc ? -1 : 1;
        }
        else if (rst1 === rst2) {
          return 0;
        }
        else {
          return rst1 > rst2
            ? isDesc ? -1 : 1
            : isDesc ? 1 : -1;
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
      else if (typeOf(srcObj, 'str', 'arr', 'fun') || get(srcObj, '/length', 'num')) {
        return srcObj.length;
      }
      else {
        return -1;
      }
    }

    /**
     * [fn.has] 判断对象是否存在某自有属性
     * @param srcObj   : object
     * @param property : string
     */
    function has(srcObj, property) {
      return srcObj && srcObj.hasOwnProperty(property) || false;
    }

    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param srcObj : object
     * @param path   : string
     * @param type   : ...string[]|string[] [?]
     */
    function get(srcObj, path) {
      var types = [];
      for (var i = 2; i < arguments.length; i++) {
        types[i - 2] = arguments[i];
      }
      if (!srcObj || !typeOf(path, 'str'))
        return undefined;
      var paths;
      if (contains(path, '.')) {
        paths = drop(path.split('.'));
      }
      else {
        paths = drop(path.split('/'));
      }
      var key = paths.shift();
      if (!key)
        return types.length ? typeVal.apply(void 0, [srcObj].concat(types)) : srcObj;
      if (paths.length) {
        if (!typeOf(srcObj[key], 'obj', 'arr'))
          return undefined;
        return get.apply(void 0, [srcObj[key], paths.join('/')].concat(types));
      }
      else {
        return types.length ? typeVal.apply(void 0, [srcObj[key]].concat(types)) : srcObj[key];
      }
    }

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
     * @param predicate : ...string[]|string|function
     */
    function pick(srcObj, predicate) {
      var propList = [];
      for (var i = 2; i < arguments.length; i++) {
        propList[i - 2] = arguments[i];
      }
      return propsTraversal({}, srcObj, predicate, propList, false);
    }

    /**
     * [fn.extend] 给对象赋值
     * @param tarObj    : object
     * @param srcObj    : object
     * @param predicate : ...string[]|string|function
     */
    function extend(tarObj, srcObj, predicate) {
      var propList = [];
      for (var i = 3; i < arguments.length; i++) {
        propList[i - 3] = arguments[i];
      }
      if (typeVal(srcObj, 'object')) {
        propsTraversal(tarObj, srcObj, predicate, propList, true);
      }
      return tarObj;
    }

    function propsTraversal(tarObj, srcObj, predicate, propList, isDoTraDft) {
      if (typeOf(predicate, 'str')) {
        propList.unshift(predicate);
        doTraversal(tarObj, srcObj, propList);
      }
      else if (typeOf(predicate, 'arr')) {
        doTraversal(tarObj, srcObj, predicate);
      }
      else if (typeOf(predicate, 'fun')) {
        forIn(srcObj, function (key, val) {
          if (predicate(key, val))
            tarObj[key] = val;
        });
      }
      else if (isDoTraDft) {
        doTraversal(tarObj, srcObj, Object.keys(srcObj));
      }
      return tarObj;
    }

    function doTraversal(tarObj, srcObj, propList) {
      propList.forEach(function (prop) {
        if (has(srcObj, prop))
          tarObj[prop] = srcObj[prop];
      });
    }

    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @arg srcObj   : object
     * @arg iteratee : function
     */
    function forIn(srcObj, iteratee) {
      return forEach(srcObj, function (val, key) { return iteratee(key, val); });
    }

    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param srcObj : object
     */
    function deepCopy(srcObj) {
      if (typeof srcObj !== 'object')
        return srcObj;
      var tmpObj;
      if (srcObj instanceof Array) {
        tmpObj = [];
        for (var i = 0; i < srcObj.length; i++) {
          tmpObj.push(deepCopy(srcObj[i]));
        }
      }
      else {
        tmpObj = {};
        for (var key in srcObj) {
          if (srcObj.hasOwnProperty(key)) {
            tmpObj[key] = deepCopy(srcObj[key]);
          }
        }
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
      if (isStrict === void 0) { isStrict = false; }
      if (typeof obj1 !== typeof obj2)
        return false;
      if (typeOf(obj1, 'arr') && typeOf(obj2, 'arr')) {
        if (obj1.length !== obj2.length)
          return false;
        for (var i = 0; i < obj1.length; i++) {
          if (!isDeepEqual(obj1[i], obj2[i], isStrict))
            return false;
        }
        return true;
      }
      else if (typeOf(obj1, 'obj') && typeOf(obj2, 'obj')) {
        if (len(obj1) !== len(obj2))
          return false;
        var _keys = keys(obj1);
        if (isStrict && !isDeepEqual(_keys, keys(obj2)))
          return false;
        for (var i = 0; i < _keys.length; i++) {
          if (!obj2.hasOwnProperty(_keys[i]))
            return false;
          if (!isDeepEqual(obj1[_keys[i]], obj2[_keys[i]], isStrict))
            return false;
        }
        return true;
      }
      else {
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
          start = end;
          end = tmpSta;
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
      if (length === void 0) { length = 12; }
      var charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var id = '';
      array(length).forEach(function (x) { return id += charSet[random(charSet.length)]; });
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
      var _a, _b, _c;
      var isIdStr = typeVal(timerId, 'str');
      if (isIdStr && duration === undefined)
        return { id: intervalTimers[timerId], stop: function () { return clearInterval(intervalTimers[timerId]); } };
      if (isIdStr && contains([null, false], duration)) {
        clearInterval(intervalTimers[timerId]);
        return intervalTimers[timerId] = null;
      }
      if (isIdStr && typeOf(duration, 'fun'))
        _a = [duration, 0], callback = _a[0], duration = _a[1];
      if (typeOf(timerId, 'num') && typeOf(duration, 'fun'))
        _b = [undefined, timerId, duration], timerId = _b[0], duration = _b[1], callback = _b[2];
      if (typeOf(timerId, 'fun'))
        _c = [undefined, 0, timerId], timerId = _c[0], duration = _c[1], callback = _c[2];

      if (typeOf(callback, 'fun')) {
        if (typeOf(duration, 'num') && duration >= 0) {
          if (isIdStr) {
            clearInterval(intervalTimers[timerId]);
            return intervalTimers[timerId] = setInterval(callback, duration);
          }
          if (timerId === undefined) {
            return setInterval(callback, duration);
          }
        }
      }
    }

    /**
     * [fn.timeout] 延时定时器
     * @param timerId  : string [?]
     * @param duration : number|false|null [?]
     * @param callback : function
     */
    function timeout(timerId, duration, callback) {
      var _a, _b, _c;
      var isIdStr = typeVal(timerId, 'str');
      if (isIdStr && duration === undefined) {
        return { id: timeoutTimers[timerId], stop: function () { return clearTimeout(timeoutTimers[timerId]); } };
      }
      if (isIdStr && contains([null, false], duration)) {
        clearTimeout(timeoutTimers[timerId]);
        return timeoutTimers[timerId] = null;
      }
      if (isIdStr && typeOf(duration, 'fun'))
        _a = [duration, 0], callback = _a[0], duration = _a[1];
      if (typeOf(timerId, 'num') && typeOf(duration, 'fun'))
        _b = [undefined, timerId, duration], timerId = _b[0], duration = _b[1], callback = _b[2];
      if (typeOf(timerId, 'fun'))
        _c = [undefined, 0, timerId], timerId = _c[0], duration = _c[1], callback = _c[2];

      if (typeOf(callback, 'fun')) {
        if (typeOf(duration, 'num') && duration >= 0) {
          if (isIdStr) {
            clearTimeout(timeoutTimers[timerId]);
            return timeoutTimers[timerId] = setTimeout(callback, duration);
          }
          if (timerId === undefined) {
            return setTimeout(callback, duration);
          }
        }
      }
    }

    /**
     * [fn.defer] 延迟执行函数
     * @param func : function
     */
    function defer(func) {
      return setTimeout(func);
    }

    /**
     * [fn.timestamp] 返回一个当前时间戳
     * @param time : date|string|number [?]
     */
    function timestamp(time) {
      var date = new Date(String(time));
      if (!date.getTime())
        date = new Date();
      return date.getTime();
    }

    /**
     * [fn.fmtDate] 获取格式化的时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number [?]
     */
    function fmtDate(fmtStr, time) {
      var date = new Date(String(time));
      if (!date.getTime())
        date = new Date();
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
          if (new RegExp('(' + k + ')').test(fmtStr)) {
            fmtStr = fmtStr.replace(RegExp.$1, RegExp.$1.length === 1
              ? obj[k] : ('00' + obj[k]).substr((obj[k] + '').length));
          }
        }
      }
      return fmtStr;
    }

    /**
     * [fn.match] 字符串匹配
     * @param srcStr : string
     * @param cases  ：object
     * @param isExec : boolean = true
     */
    function match(srcStr, cases, isExec) {
      if (isExec === void 0) { isExec = true; }
      var _type;
      if (has(cases, srcStr)) {
        _type = srcStr;
      }
      else if (has(cases, '@dft')) {
        _type = '@dft';
      }
      else if (has(cases, '@default')) {
        _type = '@default';
      }
      if (_type) {
        if (cases[_type] === '@pass') {
          var _keys = keys(cases);
          var idx = _keys.indexOf(_type);
          if (idx + 1 === _keys.length)
            return undefined;
          return match(_keys[idx + 1], cases, isExec);
        }
        else if (isExec && typeof cases[_type] === 'function') {
          return len(cases[_type]) > 0 ? cases[_type](srcStr) : cases[_type]();
        }
        else {
          return cases[_type];
        }
      }
      return undefined;
    }

    /**
     * [fn.pretty] 转换成格式化字符串
     * @param srcObj : any
     */
    function pretty(srcObj) {
      return typeof srcObj === 'object' ? JSON.stringify(srcObj, null, 2) : String(srcObj);
    }

    var deCodes = ['&', '<', '>', ' ', '\'', '"'];
    var enCodes = ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;'];

    /**
     * [fn.escape] 编码HTML字符串
     * @param srcStr : string
     */
    function escape(srcStr) {
      deCodes.forEach(function (str, i) {
        srcStr = srcStr.replace(new RegExp(str, 'g'), enCodes[i]);
      });
      return srcStr;
    }

    /**
     * [fn.unescape] 解码HTML字符串
     * @param srcStr : string
     */
    function unescape(srcStr) {
      enCodes.forEach(function (str, i) {
        srcStr = srcStr.replace(new RegExp(str, 'g'), deCodes[i]);
      });
      return srcStr;
    }

    /**
     * [fn.capitalize] 字符串首字母大写
     * @param srcStr : string
     */
    function capitalize(srcStr) {
      return srcStr && typeof srcStr === 'string'
        ? srcStr[0].toUpperCase() + srcStr.substr(1) : srcStr;
    }

    /**
     * [fn.fmtCurrency] 格式化显示货币
     * @param number : number
     * @param digit  : number = 2
     */
    function fmtCurrency(number, digit) {
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
        if (count >= length)
          break;
        tmpChar = srcStr.substr(i, 1);
        tmpStr += tmpChar;
        count += matchPattern(tmpChar, 'cnChar') ? 2 : 1;
      }
      return tmpStr + '...';
    }

    /**
     * [fn.parseQueryStr] 解析Url参数成对象
     * @param url : string
     */
    function parseQueryStr(url) {
      if (!contains(url, '?'))
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
    }

    /**
     * [fn.stringifyQueryStr] 把对象编译成Url参数
     * @param obj : object
     */
    function stringifyQueryStr(obj) {
      if (!typeOf(obj, ['obj', 'arr']))
        return '';
      obj = JSON.parse(JSON.stringify(obj));
      var pairs = [];
      forIn(obj, function (key, value) {
        if (typeOf(value, 'arr')) {
          value.forEach(function (v, i) {
            var _k = encodeURIComponent(key + '[' + i + ']');
            pairs.push(_k + '=' + encodeURIComponent(v));
          });
        }
        else {
          var _v = encodeURIComponent(value);
          pairs.push(encodeURIComponent(key) + '=' + _v);
        }
      });
      return '?' + pairs.join('&');
    }

    // 匹配汉字
    var cnCharPattern = /[\u4e00-\u9fa5]+/;
    // 匹配双字节字符
    var dblBitCharPattern = /[^x00-xff]/;
    // 匹配Email
    var emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 匹配中国大陆手机号码
    var mobPhonePattern = /(\+?0?86\-?)?1[3456789]\d{9}/;
    // 匹配中国大陆电话号码，格式为“XXXX-XXXXXXX”，“XXXX-XXXXXXXX”，“XXX-XXXXXXX”，“XXX-XXXXXXXX”，“XXXXXXX”，“XXXXXXXX”
    var telPhonePattern = /((d{3,4})|d{3,4}-)?d{7,8}/;
    // 匹配中国大陆身份证
    var idCardPattern = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/;
    // 匹配Base64编码格式
    var base64CodePattern = /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/;
    // 匹配域名
    var domainPattern = /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/;
    // 匹配端口号
    var portPattern = /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/;
    // 匹配IP
    var ipPattern = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/;
    // 匹配IP Url
    var ipUrlPattern = new RegExp('http(s)?://' + ipPattern.source + '(:' + portPattern.source + ')?');
    // 匹配Domain Url
    var domainUrlPattern = new RegExp('http(s)?://' + domainPattern.source + '(:' + portPattern.source + ')?');
    // 匹配Url
    var urlPattern = new RegExp('http(s)?://(' + ipPattern.source + '|' + domainPattern.source + ')(:' + portPattern.source + ')?');
    // 匹配必需带端口的IP Url
    var ipWithPortUrlPattern = new RegExp('http(s)?://' + ipPattern.source + ':' + portPattern.source);
    // 匹配必需带端口的Domain Url
    var domainWithPortUrlPattern = new RegExp('http(s)?://' + domainPattern.source + ':' + portPattern.source);
    // 匹配必需带端口的Url
    var withPortUrlPattern = new RegExp('http(s)?://(' + ipPattern.source + '|' + domainPattern.source + '):' + portPattern.source);

    /**
     * [fn.getPattern]获取一个通用的正则表达式
     * @param _type     : string
     * @param isNoLimit : boolean = false
     */
    function getPattern(_type, isNoLimit) {
      if (isNoLimit === void 0) { isNoLimit = false; }
      if (!_type)
        return;
      var patternObj = {
        cnChar: cnCharPattern,
        dblBitChar: dblBitCharPattern,
        mobPhone: mobPhonePattern,
        telPhone: telPhonePattern,
        email: emailPattern,
        idCard: idCardPattern,
        base64Code: base64CodePattern,
        domain: domainPattern,
        port: portPattern,
        ip: ipPattern,
        ipUrl: ipUrlPattern,
        domainUrl: domainUrlPattern,
        url: urlPattern,
        ipWithPortUrl: ipWithPortUrlPattern,
        domainWithPortUrl: domainWithPortUrlPattern,
        withPortUrl: withPortUrlPattern
      };
      patternObj['patternList'] = Object.keys(patternObj);
      return patternObj.hasOwnProperty(_type) && patternObj[_type]
        ? _type === 'patternList'
          ? patternObj[_type]
          : isNoLimit
            ? new RegExp(patternObj[_type].source)
            : new RegExp('^(' + patternObj[_type].source + ')$')
        : undefined;
    }

    /**
     * [fn.matchPattern]与一个或几个通用正则匹配
     * @param srcStr    : string
     * @param _type     : string|string[]
     * @param isNoLimit : boolean = false
     */
    function matchPattern(srcStr, _type, isNoLimit) {
      if (isNoLimit === void 0) { isNoLimit = false; }
      if (!srcStr || !_type)
        return null;
      if (_type instanceof Array) {
        var matchs = null;
        _type.forEach(function (item) {
          var pattern = getPattern(item, isNoLimit);
          if (!matchs && pattern)
            matchs = srcStr.match(pattern);
        });
        return matchs;
      }
      else if (typeof _type === 'string') {
        var pattern = getPattern(_type, isNoLimit);
        return pattern && srcStr.match(pattern) || null;
      }
    }

    /**
     * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
     * @param  func    : function
     * @param  wait    : number
     * @param  options : object [?]
     * leading: boolean = true
     * trailing: boolean = true
     */
    function throttle(func, wait, options) {
      var leading = true,
        trailing = true;

      if (typeof func != 'function') {
        throw new TypeError('Expected a function');
      }
      if (typeOf(options, 'obj')) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * [fn.debounce] 防抖函数, 适用于获取用户输入
     * @param  func    : function
     * @param  wait    : number
     * @param  options : object [?]
     * leading: boolean = false
     * maxing: boolean = false
     * maxWait: number = Math.max(0, wait)
     * trailing: boolean = true
     */
    function debounce(func, wait, options) {
      var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

      if (typeof func != 'function') {
        throw new TypeError('Expected a function');
      }
      wait = Number(wait) || 0;

      if (typeOf(options, 'obj')) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
          thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

        return maxing
          ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

        return lastCallTime === undefined
          || timeSinceLastCall >= wait
          || timeSinceLastCall < 0
          || maxing && timeSinceLastInvoke >= maxWait;
      }

      function timerExpired() {
        var time = Date.now();
        if (shouldInvoke(time))
          return trailingEdge(time);
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;
        if (trailing && lastArgs)
          return invokeFunc(time);
        lastArgs = lastThis = undefined;
        return result;
      }

      function debounced() {
        var time = Date.now(),
          isInvoking = shouldInvoke(time);

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
        if (timerId === undefined)
          timerId = setTimeout(timerExpired, wait);
        return result;
      }

      debounced.cancel = function () {
        if (timerId !== undefined)
          clearTimeout(timerId);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      };

      debounced.flush = function () {
        return timerId === undefined ? result : trailingEdge(Date.now());
      };

      return debounced;
    }

    /**@spliter*/

    /**
     * [fn.noConflict] 释放fn变量占用权
     */
    function noConflict() {
      if (root._ === this)
        root._ = originalFn;
      return this;
    }

    var _fn = {};

    function funclib(data) {
      _fn.data = data;
      return _fn;
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
    funclib.timestamp = timestamp;
    funclib.fmtDate = fmtDate;

    funclib.match = match;
    funclib.pretty = pretty;
    funclib.escape = escape;
    funclib.unescape = unescape;
    funclib.capitalize = capitalize;
    funclib.fmtCurrency = fmtCurrency;
    funclib.cutString = cutString;
    funclib.parseQueryStr = parseQueryStr;
    funclib.stringifyQueryStr = stringifyQueryStr;

    funclib.getPattern = getPattern;
    funclib.matchPattern = matchPattern;
    funclib.throttle = throttle;
    funclib.debounce = debounce;

    /**@spliter*/

    keys(funclib).forEach(function (mtd) {
      _fn[mtd] = function () {
        var args = arguments;
        args = keys(args).map(function (key) { return args[key]; });
        return _fn.data !== undefined ? fn[mtd].apply(void 0, [_fn.data].concat(args)) : fn[mtd].apply(void 0, args);
      };
    });

    /**@spliter*/

    funclib.VERSION = VERSION;
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