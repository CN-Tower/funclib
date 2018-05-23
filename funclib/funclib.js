(function () {
    var root = this;
    var $ = root.$ || root.jquery;
    var previousfn = root.fn;
    var BootstrapTable = /** @class */ (function () {
        function BootstrapTable(translate) {
            this.loadingTimers = { singleTableTimer: null };
            this.gridOptions = {
                pageSize: 10,
                pageList: [10, 25, 50, 100],
                search: true,
                strictSearch: false,
                searchText: '',
                pagination: true,
                paginationHAlign: 'left',
                paginationDetailHAlign: 'left',
                clickToSelect: false,
                showRefresh: true
            };
            this.translate = translate;
        }
        /**
         * [fn.bootstrapTable.rendered] 渲染Bootstrap表格的通用方式
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
        BootstrapTable.prototype.rendered = function ($table, options) {
            var tableConf = $.extend(options.gridOptions || this.gridOptions, options.tableConfig || {});
            var isAfterInit = $table.parent().hasClass('fixed-table-body');
            this.setAndClearLoadingTimers(options);
            if (!isAfterInit) {
                $table.bootstrapTable(tableConf).bootstrapTable('showLoading');
                this.tableInitHandler($table, tableConf, options);
            }
            this.tableRefreshHandler($table, tableConf, options);
        };
        BootstrapTable.prototype.tableInitHandler = function ($table, tableConf, options) {
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
                    // $('.bootstrap-table .search input')
                    //   .attr('placeholder', this.translate.instant('WordForFilter'))
                    //   .parent().append(`<span></span>`);
                }
            });
        };
        BootstrapTable.prototype.tableRefreshHandler = function ($table, tableConf, options) {
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
        BootstrapTable.prototype.setAndClearLoadingTimers = function (options) {
            var loadingTimers = options.hasOwnProperty('tableLabel') && options.tableLabel
                ? this.loadingTimers[options.tableLabel]
                : this.loadingTimers.singleTableTimer;
            clearTimeout(loadingTimers);
        };
        BootstrapTable.prototype.setLoadingTimer = function ($table, options) {
            options.hasOwnProperty('tableLabel') && options.tableLabel
                ? this.loadingTimers[options.tableLabel] = setTimeout(function () { return $table.bootstrapTable('hideLoading'); }, 20000)
                : this.loadingTimers.singleTableTimer = setTimeout(function () { return $table.bootstrapTable('hideLoading'); }, 20000);
        };
        return BootstrapTable;
    }());
    function extendJquery($, interval) {
        var intervalTimers = {};
        var timeoutTimers = {};
        $.extend({
            /**
             * [$.pollingElement] 轮询获取异步出现的jQuery元素
             * @param timerId
             * @param selector
             * @param interval
             * @param func [opt.]
             */
            pollingElement: function (timerId, selector, interval, func) {
                var _this = this;
                if ((typeof selector === 'string' || selector instanceof Array) && typeof func === 'function') {
                    var count_1 = 0;
                    var duration_1 = 250;
                    this.interval(timerId, duration_1, function (eles) {
                        parseInt(String(interval / duration_1), 10) <= count_1 ? _this.interval(timerId, false) : count_1++;
                        var tmpArr = [];
                        var slts = typeof selector === 'string' ? [selector] : selector;
                        slts.forEach(function (slt) {
                            var $ele = $(slt);
                            if ($ele.length > 0) {
                                tmpArr.push($ele);
                            }
                        });
                        if (tmpArr.length === slts.length) {
                            _this.interval(timerId, false);
                            func(tmpArr);
                        }
                    });
                }
                else {
                    this.interval(timerId, false);
                }
            },
            /**
             * [$.noAutoComplete] 防止input密码自动填充
             * @param options [{type: 'username'|'password', $input: $(input)} | [{}]]
             */
            noAutoComplete: function (options) {
                var noAutoCplt = function (opt) {
                    if (opt['type'] && opt['$input']) {
                        if (['user', 'username'].indexOf(opt.type) > -1) {
                            opt.$input
                                .attr('autocomplete', 'off')
                                .before('<input type="password" style="display: none"/>');
                        }
                        else if (['pwd', 'pass', 'password'].indexOf(opt.type) > -1) {
                            opt.$input
                                .attr({ autocomplete: 'new-password', type: 'text' })
                                .on('input propertychange', function () {
                                $(this).val() ? $(this).attr('type', 'password') : $(this).attr('type', 'text');
                            });
                        }
                    }
                };
                options instanceof Array
                    ? options.forEach(function (opt) { return noAutoCplt(opt); })
                    : noAutoCplt(options);
            }
        });
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
    var Progress = /** @class */ (function () {
        function Progress(Bar) {
            this.Bar = Bar;
        }
        /**
         * [fn.progress.start] 开启进度条，并传入参数
         * @param options
         */
        Progress.prototype.start = function (options) {
            var prog = (options && options.title || 'Progress Bar') + " [:bar] :percent";
            this.progress = new this.Bar(prog, {
                complete: '=', incomplete: ' ',
                width: options && options['width'] || 40,
                total: options && options['total'] || 20
            });
            clearTimeout(this.timer);
            this.duration = 250;
            this.tickFun('+');
        };
        /**
         * [fn.progress.stop] 结束进度条，结束后触发回调
         * @param options
         */
        Progress.prototype.stop = function (onStopped) {
            clearTimeout(this.timer);
            this.duration = 600;
            this.tickFun('-', onStopped);
        };
        Progress.prototype.tickFun = function (type, onStopped) {
            var _this = this;
            this.timer = setTimeout(function () {
                _this.progress.tick();
                switch (type) {
                    case '+':
                        _this.duration += 300;
                        break;
                    case '-':
                        _this.duration -= _this.duration * 0.2;
                        break;
                }
                _this.progress.complete && status === 'stop' ? onStopped() : _this.tickFun(type);
            }, this.duration);
        };
        return Progress;
    }());
    var Tools = /** @class */ (function () {
        function Tools(fs, path) {
            var _this = this;
            if (fs) {
                /**
                 * [fn.tools.writeFile] 写文件
                 * @param dir
                 * @param dist
                 */
                this.writeFile = function (file, text, onEnd) {
                    fs.open(file, 'w', function (err, fd) {
                        if (err) {
                            throw err;
                        }
                        else {
                            var buffer = new Buffer(text);
                            fs.write(fd, buffer, 0, buffer.length, 0, function (err, bytesWritten, buffer) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    fs.close(fd);
                                    if (typeof onEnd === 'function') {
                                        onEnd();
                                    }
                                }
                            });
                        }
                    });
                };
                /**
                 * [fn.tools.copyFile] 复制文件
                 * @param dir
                 * @param dist
                 */
                this.copyFile = function (filePath, distPath) {
                    fs.createReadStream(filePath).pipe(fs.createWriteStream(distPath));
                };
            }
            if (fs && path) {
                /**
                 * [fn.tools.deleteDirectory] 删除文件夹和文件
                 * @param dir
                 * @param dist
                 */
                this.deleteDirectory = function (dir) {
                    if (fs.existsSync(dir)) {
                        var files = fs.readdirSync(dir);
                        files.forEach(function (file) {
                            var subFile = path.join(dir, file);
                            if (fs.statSync(subFile).isDirectory()) {
                                _this.deleteDirectory(subFile);
                            }
                            else {
                                fs.unlinkSync(subFile);
                            }
                        });
                        fs.rmdirSync(dir);
                    }
                };
                /**
                 * [fn.tools.copyDirectory] 复制文件夹和文件
                 * @param dir
                 * @param dist
                 */
                this.copyDirectory = function (dir, dist) {
                    if (fs.existsSync(dir)) {
                        var distDir_1 = path.join(dist, path.basename(dir));
                        fs.mkdirSync(distDir_1);
                        var files = fs.readdirSync(dir);
                        files.forEach(function (file) {
                            var subFile = path.join(dir, file);
                            var subDist = path.join(distDir_1, file);
                            if (fs.statSync(subFile).isDirectory()) {
                                _this.copyDirectory(subFile, subDist);
                            }
                            else {
                                _this.copyFile(subFile, subDist);
                            }
                        });
                    }
                };
            }
        }
        return Tools;
    }());
    var Funclib = /** @class */ (function () {
        function Funclib(options) {
            this.version = 'V1.0.2';
            this.patterns = new Patterns();
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
                extendJquery($, this.interval);
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
                this.progress = new Progress(ProgressBar);
            }
        };
        /**
         * [fn.initBootstrapTable] 初始化一个BootstrapTable对象
         * @param translate [Object]
         */
        Funclib.prototype.initBootstrapTable = function (translate) {
            this.bootstrapTable = new BootstrapTable(translate);
        };
        /**
         * [fn.initTools] 初始化一个NodeJs工具包对象
         * @param options [Object]
         */
        Funclib.prototype.initTools = function (options) {
            if (options) {
                this.tools = new Tools(options['fs'], options['path']);
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
         * [fn.objLen] 获取对象自有属性的个数
         * @arg obj [object]
         * */
        Funclib.prototype.objLen = function (obj) {
            var objLength = 0;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    objLength++;
                }
            }
            return objLength;
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
         * @param configs {title: string, color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
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
            if (typeof value === 'object') {
                value = JSON.stringify(value, null, 2);
            }
            else {
                value = String(value);
            }
            var title = configs && configs['title'] || "funclib " + this.version;
            var color = configs && configs['color'] in colors && configs['color'] || 'grey';
            var llen = 68;
            var tlen = 16, sp = '';
            if (title.length <= tlen) {
                tlen = title.length;
            }
            else {
                title = this.cutString(title, tlen - 2);
            }
            this.array((llen - tlen) / 2, ' ').forEach(function (x) { return sp += x; });
            var tt = sp + title;
            var s = '-', d = '=';
            var sL = '', dL = '';
            this.array(llen).forEach(function (x) {
                sL += s;
                dL += d;
            });
            console.log('\n' + dL);
            console.log(colors['green'], tt);
            console.log(sL);
            console.log(colors[color], value);
            console.log(dL + '\n');
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
    var fn = new Funclib({ jquery: $, window: root, document: root.document });
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
        define('funclib', [], function () {
            return fn;
        });
    }
}.call(this));
