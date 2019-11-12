var rest = require('./lib/rest');
var rest = require('./lib/rest');
var throwErr = require('./_throwErr');

/**
 * @license
 * Funclib v3.5.10 <https://www.funclib.net>
 * GitHub Repository <https://github.com/CN-Tower/funclib.js>
 * Released under MIT license <https://github.com/CN-Tower/funclib.js/blob/master/LICENSE>
 */
; (function () {

  var fn = (function () {

    // var fs = eval('require("fs")'),
    //   path = eval('require("path")'),
    //   execSync = eval('require("child_process").execSync');





    /**
     * [fn().method] funclib链接调用
     * @param value: any
     */
    function funclib(value) { return chain(value); }

    funclib.typeOf = typeOf;
    funclib.typeVal = typeVal;
    funclib.isStr = isStr;
    funclib.isNum = isNum;
    funclib.isBol = isBol;
    funclib.isFun = isFun;
    funclib.isNul = isNul;
    funclib.isUdf = isUdf;
    funclib.isErr = isErr;
    funclib.isDat = isDat;
    funclib.isReg = isReg;
    funclib.isArr = isArr;
    funclib.isObj = isObj;

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
    funclib.set = set;
    funclib.keys = keys;
    funclib.pick = pick;
    funclib.omit = omit;
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
    funclib.maskString = maskString;
    funclib.cutString = cutString;
    funclib.parseQueryStr = parseQueryStr;
    funclib.stringifyQueryStr = stringifyQueryStr;

    funclib.setPattern = setPattern;
    funclib.getPattern = getPattern;
    funclib.testPattern = testPattern;
    funclib.matchPattern = matchPattern;

    funclib.rest = rest;
    funclib.throttle = throttle;
    funclib.debounce = debounce;

    var arrProto = Array.prototype , strProto = String.prototype , extMethods = [
      'pop', 'push', 'concat', 'join', 'reverse', 'shift', 'slice', 'split', 'sort', 'substr', 'substring', 'splice',
      'splice', 'unshift', 'every', 'some', 'map', 'reduce', 'trim', 'toLowerCase', 'toUpperCase', 'replace', 'search',
    ];
    forEach(extMethods, function(method) {
      funclib[method] = rest(function(args) {
        var proto, arg0 = args.shift();
        if (isArr(arg0) && has(arrProto, method)) proto = arrProto;
        if (isStr(arg0) && has(strProto, method)) proto = strProto;
        if (proto) return proto[method].apply(arg0, args);
        throwErr('arg');
      });
    });

    /**@spliter*/
    /**=================================================================== */

    funclib.chalk = chalk;
    funclib.print = print;
    funclib.log = log;
    funclib.rd = rd;
    funclib.wt = wt;
    funclib.cp = cp;
    funclib.mv = mv;
    funclib.rm = rm;
    funclib.mk = mk;
    funclib.size = size;
    funclib.clear = clear;
    progress.stop = new Function();
    progress.start = progress;
    funclib.progress = progress;

    /**=================================================================== */
    /**@spliter*/

    funclib.chain = chain;
    funclib.noConflict = noConflict;
    funclib.version = version;

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
