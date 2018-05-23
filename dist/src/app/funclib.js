"use strict";
exports.__esModule = true;
var tools_class_1 = require("./modules/tools.class");
var patterns_class_1 = require("./modules/patterns.class");
var progress_class_1 = require("./modules/progress.class");
var extendJquery_func_1 = require("./modules/extendJquery.func");
var bootstrapTable_class_1 = require("./modules/bootstrapTable.class");
var $ = require("jquery");
var Funclib = /** @class */ (function () {
    function Funclib(options) {
        this.version = 'V1.0.2';
        this.patterns = new patterns_class_1.Patterns();
        this.intervalTimers = {};
        this.timeoutTimers = {};
        /**
         * [fn.time] 返回一个当前时间字符串。
         */
        this.time = function () { return (new Date()).getTime(); };
        this.overlay(this, options, ['jquery', 'window', 'document']);
        if (!this.window || !this.document) {
            delete this.window;
            delete this.document;
            delete this.fullScreen;
            delete this.exitFullScreen;
            delete this.checkIsFullScreen;
        }
        if (this.jquery) {
            extendJquery_func_1.extendJquery($, this.interval);
        }
        else {
            delete this.jquery;
        }
    }
    /**
     * [fn.initProgress] 初始化进度条对象
     * @param ProgressBar [class]
     */
    Funclib.prototype.initProgress = function (ProgressBar) {
        if (ProgressBar) {
            this.progress = new progress_class_1.Progress(ProgressBar);
        }
    };
    /**
     * [fn.initBootstrapTable] 初始化一个BootstrapTable对象
     * @param translate [Object]
     */
    Funclib.prototype.initBootstrapTable = function (translate) {
        this.bootstrapTable = new bootstrapTable_class_1.BootstrapTable(translate);
    };
    /**
     * [fn.initTools] 初始化一个NodeJs工具包对象
     * @param options [Object]
     */
    Funclib.prototype.initTools = function (options) {
        if (options) {
            this.tools = new tools_class_1.Tools(options['fs'], options['path']);
        }
    };
    /**
     * [fn.gnid] 返回一个指定长度(最小6位)的随机ID。
     * @param len [number]
     */
    Funclib.prototype.gnid = function (len) {
        var _this = this;
        if (len === void 0) { len = 12; }
        var charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var eleId = '';
        if (len < 6) {
            len = 6;
        }
        ;
        this.array(len).forEach(function (x) { return eleId += charSet[_this.random(charSet.length)]; });
        return eleId;
    };
    ;
    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param length [number]
     * @param value  [any, function]
     */
    Funclib.prototype.array = function (length, value) {
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
     * [fn.random] 返回一个指定范围的随机数
     * @param sta [number]
     * @param end [number]
     */
    Funclib.prototype.random = function (sta, end) {
        if (end === undefined || sta === end) {
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
     * [fn.len] 获取对象自有属性的个数
     * @arg obj [object]
     * */
    Funclib.prototype.len = function (obj) {
        return Object.keys(obj).length;
    };
    /**
     * [fn.interval] 循环定时器
     * @param timerId
     * @param duration
     * @param func
     */
    Funclib.prototype.interval = function (timerId, duration, func) {
        if (typeof duration === 'number' && typeof func === 'function') {
            clearInterval(this.intervalTimers[timerId]);
            this.intervalTimers[timerId] = setInterval(function () { return func(); }, duration);
        }
        else if (typeof duration === 'boolean' && !duration) {
            clearInterval(this.intervalTimers[timerId]);
        }
    };
    /**
     * [fn.timeout] 延时定时器
     * @param timerId
     * @param duration
     * @param func
     */
    Funclib.prototype.timeout = function (timerId, duration, func) {
        if (typeof duration === 'number' && typeof func === 'function') {
            clearTimeout(this.timeoutTimers[timerId]);
            this.timeoutTimers[timerId] = setTimeout(function () { return func(); }, duration);
        }
        else if (typeof duration === 'boolean' && !duration) {
            clearTimeout(this.timeoutTimers[timerId]);
        }
    };
    /**
     * [fn.sortData] 对象数组根据字段排序
     * @param tableData
     * @param field
     * @param isDesc
     */
    Funclib.prototype.sortData = function (tableData, field, isDesc) {
        return tableData.sort(function (row1, row2) {
            return row1.hasOwnProperty(field) && row2.hasOwnProperty(field)
                ? row1[field] === row2[field]
                    ? 0
                    : isDesc
                        ? row1[field] > row2[field] ? -1 : 1
                        : row1[field] > row2[field] ? 1 : -1
                : 0;
        });
    };
    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param data
     */
    Funclib.prototype.deepCopy = function (data) {
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
     * [fn.currency] 格式化显示货币
     * @param number
     * @param digit
     * @returns {string}
     */
    Funclib.prototype.currency = function (number, digit) {
        if (digit === void 0) { digit = 2; }
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
     * [fn.cutString] Format string width length
     * @param str
     * @param len
     * @returns {string}
     */
    Funclib.prototype.cutString = function (str, len) {
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
    /**
     * [fn.overlay] 给对象赋值
     * @param target
     * @param source
     * @param propList
     */
    Funclib.prototype.overlay = function (target, source, propList) {
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
    };
    /**
     * [fn.getPattern] 与一个或几个通用正则匹配
     * @param type
     * @param isNoLimit
     * @returns {pattern|undefined}
     */
    Funclib.prototype.getPattern = function (type, isNoLimit) {
        if (isNoLimit === void 0) { isNoLimit = false; }
        if (!type) {
            return;
        }
        var patternsObj = {
            cnChar: this.patterns.cnCharPattern,
            dblBitChar: this.patterns.dblBitCharPattern,
            mobPhone: this.patterns.mobPhonePattern,
            telPhone: this.patterns.telPhonePattern,
            email: this.patterns.emailPattern,
            base64Code: this.patterns.base64CodePattern,
            mac: this.patterns.macPattern,
            domain: this.patterns.domainPattern,
            port: this.patterns.portPattern,
            ip: this.patterns.ipPattern,
            ipv4: this.patterns.ipv4Pattern,
            ipv6: this.patterns.ipv6Pattern,
            ipv4IpRange: this.patterns.ipv4IpRangePattern,
            ipv6IpRange: this.patterns.ipv6IpRangePattern,
            ipv4Cidr: this.patterns.ipv4CidrPattern,
            ipv6Cidr: this.patterns.ipv6CidrPattern,
            ipv4Url: this.patterns.ipv4UrlPattern,
            ipv6Url: this.patterns.ipv6UrlPattern,
            domainUrl: this.patterns.domainUrlPattern,
            url: this.patterns.urlPattern,
            ipWithPortUrl: this.patterns.ipWithPortUrlPattern,
            ipv6WithPortUrl: this.patterns.ipv6WithPortUrlPattern,
            domainWithPortUrl: this.patterns.domainWithPortUrlPattern,
            withPortUrl: this.patterns.withPortUrlPattern
        };
        patternsObj['patternList'] = Object.keys(patternsObj);
        return patternsObj.hasOwnProperty(type) && patternsObj[type]
            ? type === 'patternList'
                ? patternsObj[type]
                : isNoLimit
                    ? new RegExp(patternsObj[type].source)
                    : new RegExp("^(" + patternsObj[type].source + ")$")
            : undefined;
    };
    /**
     * [fn.matchPattern] 获取一个通用的正则表达式
     * @param src
     * @param type
     * @param isNoLimit
     * @returns {boolean}
     */
    Funclib.prototype.matchPattern = function (src, type, isNoLimit) {
        var _this = this;
        if (!src || !type) {
            return false;
        }
        if (type instanceof Array) {
            var matchResult_1 = false;
            type.forEach(function (item) {
                var pattern = _this.getPattern(item, isNoLimit);
                if (pattern && pattern.test(src)) {
                    matchResult_1 = true;
                }
            });
            return matchResult_1;
        }
        else if (typeof type === 'string') {
            var pattern = this.getPattern(type, isNoLimit);
            return pattern && pattern.test(src);
        }
    };
    /**
     * [fn.log] 控制台打印
     * @param value
     * @param configs {
     * title: string,
     * lineLen: number [20-100]
     * part: 'pre'|'end' (opt.)
     * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
     */
    Funclib.prototype.log = function (value, configs) {
        var colors = {
            'grey': '\x1B[90m%s\x1B[0m',
            'blue': '\x1B[34m%s\x1B[0m',
            'cyan': '\x1B[36m%s\x1B[0m',
            'green': '\x1B[32m%s\x1B[0m',
            'magenta': '\x1B[35m%s\x1B[0m',
            'red': '\x1B[31m%s\x1B[0m',
            'yellow': '\x1B[33m%s\x1B[0m'
        };
        if (value === undefined) {
            value = "Welecome come to use funclib: " + this.version + " !";
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value, null, 2);
        }
        else {
            value = String(value);
        }
        var title = configs && configs['title'] || "funclib " + this.version;
        var color = configs && configs['color'] in colors && configs['color'] || 'grey';
        var lineLen = configs && configs['lineLen'];
        if (!lineLen || lineLen < 20 || lineLen > 100) {
            lineLen = 66;
        }
        var titlelen = 16, sp = '';
        if (title.length <= titlelen) {
            titlelen = title.length;
        }
        else {
            title = this.cutString(title, titlelen - 2);
        }
        this.array((lineLen - titlelen) / 2, ' ').forEach(function (x) { return sp += x; });
        var tt = sp + title;
        var s = '-', d = '=';
        var sL = '', dL = '';
        this.array(lineLen).forEach(function (x) {
            sL += s;
            dL += d;
        });
        if (configs && ['pre', 'end'].indexOf(configs['part']) > -1) {
            if (configs['part'] === 'pre') {
                console.log('\n' + dL);
                console.log(colors['green'], tt);
                console.log(sL);
            }
            else {
                console.log(dL + '\n');
            }
        }
        else {
            console.log('\n' + dL);
            console.log(colors['green'], tt);
            console.log(sL);
            console.log(colors[color], value);
            console.log(dL + '\n');
        }
    };
    /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el
     * @returns {any}
     */
    Funclib.prototype.fullScreen = function (el) {
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen
            || el.mozRequestFullScreen || el.msRequestFullScreen;
        if (typeof rfs != "undefined" && rfs) {
            return rfs.call(el);
        }
        if (typeof this.window.ActiveXObject != "undefined") {
            var ws = new this.window.ActiveXObject("WScript.Shell");
            if (ws) {
                ws.SendKeys("{F11}");
            }
        }
    };
    /**
     * [fn.exitFullScreen] 退出全屏显示
     * @returns {any}
     */
    Funclib.prototype.exitFullScreen = function () {
        var el = this.document;
        var cfs = el.cancelFullScreen || el.webkitCancelFullScreen
            || el.mozCancelFullScreen || el.exitFullScreen;
        if (typeof cfs != "undefined" && cfs) {
            return cfs.call(el);
        }
        if (typeof this.window.ActiveXObject != "undefined") {
            var ws = new this.window.ActiveXObject("WScript.Shell");
            if (ws != null) {
                ws.SendKeys("{F11}");
            }
        }
    };
    /**
     * [fn.checkIsFullScreen] 检测是否全屏状态
     * @returns {boolean}
     */
    Funclib.prototype.checkIsFullScreen = function () {
        var el = this.document;
        var isFull = el.fullscreenEnabled || el.fullScreen
            || el.webkitIsFullScreen || el.msFullscreenEnabled;
        return !!isFull;
    };
    return Funclib;
}());
exports.Funclib = Funclib;
