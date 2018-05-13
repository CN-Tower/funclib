(function () {
    var root = this;
    var $ = root.$ || root.jquery;
    var previousfn = root.fn;
    var BootstrapTableHelper = /** @class */ (function () {
        function BootstrapTableHelper(translate) {
            this.loadingTimers = { singleTableTimer: null };
            this.translate = translate;
        }
        BootstrapTableHelper.prototype.tableInitHandler = function ($table, tableConf, options) {
            var _this = this;
            setTimeout(function () {
                if ($table.parent().hasClass('fixed-table-body')) {
                    var tableScope = options.hasOwnProperty('tableScope') && options.tableScope &&
                        typeof options.tableScope === 'string' ? options.tableScope : '';
                    var $refreshBtn = $(tableScope + " .bootstrap-table .fixed-table-toolbar button[name=\"refresh\"]");
                    if (options.hasOwnProperty('onRendered') && options.onRendered instanceof Function) {
                        options.onRendered();
                    }
                    if (options.hasOwnProperty('onRefreshing') && options.onRefreshing instanceof Function) {
                        $refreshBtn.on('click', function () {
                            options['showLoading'] = true;
                            _this.tableRefreshHandler($table, tableConf, options);
                            options.onRefreshing();
                        });
                    }
                    $refreshBtn.addClass('btn-sm').css('marginLeft', '10px')
                        .mouseleave(function () { $(this).blur(); });
                    $('.bootstrap-table .search input')
                        .attr('placeholder', _this.translate.instant('WordForFilter'))
                        .parent().append("<span></span>");
                }
            });
        };
        BootstrapTableHelper.prototype.tableRefreshHandler = function ($table, tableConf, options) {
            var isShowLoading = options['showLoading'] === true;
            if (tableConf.hasOwnProperty('url') || tableConf.hasOwnProperty('ajax')) {
                if (isShowLoading) {
                    $table.bootstrapTable('showLoading');
                    this.setLoadingTimer($table, options);
                }
                else {
                    $table.bootstrapTable('refresh', { silent: true }).one('post-body.bs.table', function () {
                        $table.bootstrapTable('hideLoading');
                    });
                }
            }
            else {
                if (isShowLoading) {
                    $table.bootstrapTable('load', []).bootstrapTable('showLoading');
                    this.setLoadingTimer($table, options);
                }
                else {
                    var data = tableConf.hasOwnProperty('data') && tableConf.data || [];
                    $table.bootstrapTable('load', data).bootstrapTable('hideLoading');
                }
            }
        };
        BootstrapTableHelper.prototype.setAndClearLoadingTimers = function (options) {
            var loadingTimers = options.hasOwnProperty('tableLabel') && options.tableLabel
                ? this.loadingTimers[options.tableLabel]
                : this.loadingTimers.singleTableTimer;
            clearTimeout(loadingTimers);
        };
        BootstrapTableHelper.prototype.setLoadingTimer = function ($table, options) {
            options.hasOwnProperty('tableLabel') && options.tableLabel
                ? this.loadingTimers[options.tableLabel] = setTimeout(function () { return $table.bootstrapTable('hideLoading'); }, 20000)
                : this.loadingTimers.singleTableTimer = setTimeout(function () { return $table.bootstrapTable('hideLoading'); }, 20000);
        };
        return BootstrapTableHelper;
    }());
    var GridOptions = /** @class */ (function () {
        function GridOptions() {
            this.pageSize = 10;
            this.pageList = [10, 25, 50, 100];
            this.search = true;
            this.strictSearch = false;
            this.searchText = '';
            this.pagination = true;
            this.paginationHAlign = 'left';
            this.paginationDetailHAlign = 'left';
            this.clickToSelect = false;
            this.showRefresh = true;
        }
        return GridOptions;
    }());
    var Patterns = /** @class */ (function () {
        function Patterns() {
            /* tslint:disable */
            // 匹配汉字
            this.cnCharPattern = /[\u4e00-\u9fa5]+/;
            // 匹配双字节字符
            this.dblBitCharPattern = /[^x00-xff]/;
            // 匹配手机号码，以13/14/15/18开头
            this.mobPhonePattern = /1[3|4|5|8][0-9]\d{4,8}/;
            // 匹配大陆电话号码，格式为“XXXX-XXXXXXX”，“XXXX-XXXXXXXX”，“XXX-XXXXXXX”，“XXX-XXXXXXXX”，“XXXXXXX”，“XXXXXXXX”
            this.telPhonePattern = /((d{3,4})|d{3,4}-)?d{7,8}/;
            // 匹配Email
            this.emailPattern = /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/;
            // 匹配Base64编码格式
            this.base64CodePattern = /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/;
            // 匹配Mac地址
            this.macPattern = /[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}/;
            // 匹配域名
            this.domainPattern = /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/;
            // 匹配端口号
            this.portPattern = /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/;
            // 匹配IPv4地址
            this.ipv4Pattern = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/;
            // 匹配IPv6地址
            this.ipv6Pattern = new RegExp('' +
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
            this.ipPattern = new RegExp("(" + this.ipv4Pattern.source + "|" + this.ipv6Pattern.source + ")");
            // 匹配IPv4 cidr
            this.ipv4CidrPattern = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]|1[0-9]|2[0-9]|3[0-2]))/;
            // 匹配IPV6 cidr
            this.ipv6CidrPattern = new RegExp('s*(' +
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
            this.ipv4IpRangePattern = new RegExp("((" + this.ipv4Pattern.source + ")-(" + this.ipv4Pattern.source + ");)*(" + this.ipv4Pattern.source + ")-(" + this.ipv4Pattern.source + ")");
            // 匹配IPv6范围
            this.ipv6IpRangePattern = new RegExp("((" + this.ipv6Pattern.source + ")-(" + this.ipv6Pattern.source + ");)*(" + this.ipv6Pattern.source + ")-(" + this.ipv6Pattern.source + ")");
            // 匹配IPv4 Url
            this.ipv4UrlPattern = new RegExp("http(s)?://" + this.ipv4Pattern.source + "(:" + this.portPattern.source + ")?");
            // 匹配IPv6 Url
            this.ipv6UrlPattern = new RegExp("http(s)?://\\[(" + this.ipv6Pattern.source + ")\\](:" + this.portPattern.source + ")?");
            // 匹配Domain Url
            this.domainUrlPattern = new RegExp("http(s)?://" + this.domainPattern.source + "(:" + this.portPattern.source + ")?");
            // 匹配Url
            this.urlPattern = new RegExp("http(s)?://(" + this.ipv4Pattern.source + "|\\[" + this.ipv6Pattern.source + "\\]|" + this.domainPattern.source + ")(:" + this.portPattern.source + ")?");
            // 匹配必需带端口的IPv4 Url
            this.ipWithPortUrlPattern = new RegExp("http(s)?://" + this.ipv4Pattern.source + ":" + this.portPattern.source);
            // 匹配必需带端口的IPv6 Url
            this.ipv6WithPortUrlPattern = new RegExp("http(s)?://\\[(" + this.ipv6Pattern.source + ")\\]:" + this.portPattern.source);
            // 匹配必需带端口的Domain Url
            this.domainWithPortUrlPattern = new RegExp("http(s)?://" + this.domainPattern.source + ":" + this.portPattern.source);
            // 匹配必需带端口的Url
            this.withPortUrlPattern = new RegExp("http(s)?://(" + this.ipv4Pattern.source + "|\\[" + this.ipv6Pattern.source + "\\]|" + this.domainPattern.source + "):" + this.portPattern.source);
            /* tslint:enable */
        }
        return Patterns;
    }());
    var ViewToolsHelper = /** @class */ (function () {
        function ViewToolsHelper(translate, viewToolsCtrl) {
            this.translate = translate;
            this.viewToolsCtrl = viewToolsCtrl;
        }
        ViewToolsHelper.prototype.viewToolsHandler = function (options) {
            var _this = this;
            if (options.type === 'timer') {
                if (options.hasOwnProperty('fn') && options.fn instanceof Function) {
                    setTimeout(function () { return options.fn(); }, options.delay || 2000);
                }
            }
            else {
                if (options.hasOwnProperty('delay')) {
                    setTimeout(function () {
                        if (options.hasOwnProperty('fn') && options.fn instanceof Function) {
                            options.fn();
                        }
                        _this.viewToolsCtrl.next(_this._optionsHandler(options));
                    }, options.delay);
                }
                else {
                    this.viewToolsCtrl.next(this._optionsHandler(options));
                }
            }
        };
        ViewToolsHelper.prototype._optionsHandler = function (option) {
            if (!option.hasOwnProperty('isShow')) {
                option.isShow = true;
            }
            if (option.isShow && option.type === 'success' && !option.hasOwnProperty('msg')) {
                option.msg = this.translate.instant('vm.opOkMsg');
            }
            if (option.isShow && !option.hasOwnProperty('interval')) {
                option.interval = option.type === 'loader' ? 20000 : 2000;
            }
            return option;
        };
        return ViewToolsHelper;
    }());
    var PxFunc = /** @class */ (function () {
        function PxFunc() {
            this.patterns = new Patterns();
            this.gridOptions = new GridOptions();
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
            this._viewsHelper = new ViewToolsHelper(this.translate, this.viewToolsCtrl);
            this._tableHelper = new BootstrapTableHelper(this.translate);
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
    var fn = new PxFunc();
    fn['version'] = '1.0.1';
    fn['noConflict'] = function () {
        root.fn = previousfn;
        return this;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = fn;
        }
        exports.fn = fn;
    }
    else {
        root.fn = fn;
    }
    if (typeof define === 'function' && define.amd) {
        define('pxfunc', [], function () {
            return fn;
        });
    }
}.call(this));
