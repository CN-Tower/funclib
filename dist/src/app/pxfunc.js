"use strict";
exports.__esModule = true;
/**=======================================================================
                      通用型逻辑函数封装 PxFunc (V2.0.1)
--------------------------------------------------------------------------
        fn.time                   返回一个当前时间字符串
        fn.uuid                   返回一个指定长度(最小6位)的随机ID
        fn.array                  返回一个指定长度和默认值的数组
        fn.random                 返回一个指定范围的随机数
        fn.objLen                 获取对象自有属性的个数
        fn.copy                   深拷贝数组或对象
        fn.polling                用于轮询控制
        fn.errors                 表单控件的错误提示控制
        fn.viewTools              通知和Loading的控制
        fn.bootstrapTable         渲染Bootstrap表格的通用方式
        fn.sortData               表格数据根据字段排序
        fn.currency               格式化显示货币
        fn.cutString              裁切字符串到指定长度
        fn.findCousin             用jQuery寻找元素的表亲
        fn.matchPattern           与一个或几个通用正则匹配
        fn.getPattern             获取一个通用的正则表达式
        fn.pollingEl              用jQuery定时寻找一个异步渲染的元素
=========================================================================*/
var view_tools_class_1 = require("./helper/view-tools.class");
var bootstrap_table_class_1 = require("./helper/bootstrap-table.class");
var patterns_class_1 = require("./helper/patterns.class");
var grid_options_class_1 = require("./helper/grid-options.class");
var $ = require("jquery");
var PxFunc = /** @class */ (function () {
    function PxFunc() {
        this.patterns = new patterns_class_1.Patterns();
        this.gridOptions = new grid_options_class_1.GridOptions();
        this._pollingTimers = {};
        this._pollingElTimers = {};
        /**
         * fn.time: 返回一个当前时间字符串。
         */
        this.time = function () { return (new Date()).getTime(); };
    }
    /**
     * [fn.init] Init PxFunc
     * @param translate
     * @param viewToolsCtrl
     */
    PxFunc.prototype.init = function (translate, viewToolsCtrl) {
        this.translate = translate;
        this.viewToolsCtrl = viewToolsCtrl;
        this._viewsHelper = new view_tools_class_1.ViewToolsHelper(this.translate, this.viewToolsCtrl);
        this._tableHelper = new bootstrap_table_class_1.BootstrapTableHelper(this.translate);
    };
    /**
     * fn.uuid: 返回一个指定长度(最小6位)的随机ID。
     * @param len [number]
     */
    PxFunc.prototype.uuid = function (len) {
        var _this = this;
        if (len === void 0) { len = 12; }
        var charSet = '0123456789abcdefghijklmnopqrstuvwxyz';
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
     * fn.array: 返回一个指定长度和默认值的数组
     * @param length [number]
     * @param value  [any, function]
     */
    PxFunc.prototype.array = function (length, value) {
        if (value === void 0) { value = ''; }
        var tmpArr = [];
        for (var i = 0; i < length; i++) {
            var val = typeof value === 'function' ? value() : value;
            tmpArr.push(val);
        }
        return tmpArr;
    };
    /**
     * fn.random: 返回一个指定范围的随机数
     * @param sta [number]
     * @param end [number]
     */
    PxFunc.prototype.random = function (sta, end) {
        return end && end > sta
            ? Math.floor(Math.random() * (end - sta) + sta)
            : Math.floor(Math.random() * sta);
    };
    /**
     * fn.objLen: 获取对象自有属性的个数
     * @arg obj [object]
     * */
    PxFunc.prototype.objLen = function (obj) {
        var objLength = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                objLength++;
            }
        }
        return objLength;
    };
    /**
     * [fn.polling] Polling process service
     * @param name
     * @param interval
     * @param fn
     */
    PxFunc.prototype.polling = function (name, interval, fn) {
        if (typeof interval === 'number' && !!fn) {
            clearInterval(this._pollingTimers[name]);
            this._pollingTimers[name] = setInterval(function () { return fn(); }, interval);
        }
        else if (typeof interval === 'boolean' && !interval) {
            clearInterval(this._pollingTimers[name]);
        }
    };
    /**
     * [fn.errors] Set form control's error
     * @param model
     * @param errorMsg
     * @param isForce
     */
    PxFunc.prototype.errors = function (model, errorMsg, isForce) {
        if (isForce === void 0) { isForce = false; }
        this._lintFix = true;
        if (model && model['control'] && (isForce || !model.control.pristine)) {
            errorMsg
                ? model.control.errors({ validator: errorMsg })
                : model.control.errors(null);
        }
    };
    /**
     * [fn.viewTools] Toggle to show some global View Tools, i.e.: infoMsg, errMsg and loader.
     * @param options
        * type {success|error|loader|timer},
        * isShow
        * msg
        * interval
        * delay
     */
    PxFunc.prototype.viewTools = function (options) {
        var _this = this;
        if (options instanceof Array) {
            options.forEach(function (item) { return _this._viewsHelper.viewToolsHandler(item); });
        }
        else if (typeof options === 'object') {
            this._viewsHelper.viewToolsHandler(options);
        }
    };
    /**
     * [fn.bootstrapTable] Init a bootstrap table by a special way.
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
    PxFunc.prototype.bootstrapTable = function ($table, options) {
        if (options.hasOwnProperty('showLoading') && !options.showLoading) {
            this.viewTools({ type: 'loader', isShow: false });
        }
        var tableConf = $.extend(options.gridOptions || this.gridOptions, options.tableConfig || {});
        var isAfterInit = $table.parent().hasClass('fixed-table-body');
        this._tableHelper.setAndClearLoadingTimers(options);
        if (!isAfterInit) {
            $table.bootstrapTable(tableConf).bootstrapTable('showLoading');
            this._tableHelper.tableInitHandler($table, tableConf, options);
        }
        this._tableHelper.tableRefreshHandler($table, tableConf, options);
    };
    /**
     * [fn.sortData] Sort table data by field
     * @param tableData
     * @param field
     * @param isDesc
     */
    PxFunc.prototype.sortData = function (tableData, field, isDesc) {
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
     * [fn.copy] Deep clone an Array or an Object
     * @param data
     */
    PxFunc.prototype.copy = function (data) {
        if (typeof data !== 'object') {
            return data;
        }
        var tmpData;
        if (data instanceof Array) {
            tmpData = [];
            for (var i = 0; i < data.length; i++) {
                tmpData.push(this.copy(data[i]));
            }
        }
        else {
            tmpData = {};
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    tmpData[key] = this.copy(data[key]);
                }
            }
        }
        return tmpData;
    };
    /**
     * [fn.currency] Format Currency
     * @param number
     * @param digit
     * @returns {string}
     */
    PxFunc.prototype.currency = function (number, digit) {
        if (digit === void 0) { digit = 2; }
        this._lintFix = true;
        var nbArr = parseFloat(String(number)).toFixed(digit).split('.');
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
    PxFunc.prototype.cutString = function (str, len) {
        this._lintFix = true;
        var patrn = /[\x00-\xff]/;
        var strre = '', count = 0, tempStr;
        for (var i = 0; i < str.length; i++) {
            if (count >= len - 1) {
                break;
            }
            tempStr = str.substr(i, 1);
            strre += tempStr;
            count += patrn.test(tempStr) ? 2 : 1;
        }
        return strre + '...';
    };
    /**
     * [fn.findCousin] Find the cousin(s) of jQuery element
     * @param $ele
     * @param selector
     * @param level
     * @returns {any}
     */
    PxFunc.prototype.findCousin = function ($ele, selector, level) {
        if (level === void 0) { level = 0; }
        this._lintFix = true;
        if (!level) {
            return selector ? $ele.parents().find(selector) : $ele.parents();
        }
        else {
            var $parent = $ele;
            for (var i = 0; i < level; i++) {
                $parent = $parent.parent();
            }
            return selector ? $parent.find(selector) : $parent;
        }
    };
    /**
     * [fn.matchPattern] Match common RegExp patterns
     * @param src
     * @param type
     * @param isNoLimit
     * @returns {boolean}
     */
    PxFunc.prototype.matchPattern = function (src, type, isNoLimit) {
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
     * [fn.getPattern] Get a common RegExp pattern
     * @param type
     * @param isNoLimit
     * @returns {pattern|undefined}
     */
    PxFunc.prototype.getPattern = function (type, isNoLimit) {
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
     * [fn.pollingEl] Polling until got jQuery element
     * @param poId
     * @param selector
     * @param interval
     * @param fn {opt.}
     */
    PxFunc.prototype.pollingEl = function (poId, selector, interval, fn) {
        var _this = this;
        if ((typeof selector === 'string' || selector instanceof Array) && !!fn) {
            clearInterval(this._pollingElTimers[poId]);
            var count_1 = 0;
            var int_1 = 250;
            this._pollingElTimers[poId] = setInterval(function () {
                count_1 >= parseInt(String(interval / int_1), 10) ? clearInterval(_this._pollingElTimers[poId]) : count_1++;
                var tmpArr = [];
                var selectors = typeof selector === 'string' ? [selector] : selector;
                selectors.forEach(function (slt) {
                    var $ele = $(slt);
                    if ($ele.length > 0) {
                        tmpArr.push($ele);
                    }
                });
                if (tmpArr.length === selectors.length) {
                    clearInterval(_this._pollingElTimers[poId]);
                    fn(tmpArr);
                }
            }, int_1);
        }
        else if (typeof selector === 'boolean' && !interval) {
            clearInterval(this._pollingElTimers[poId]);
        }
    };
    return PxFunc;
}());
exports.PxFunc = PxFunc;
