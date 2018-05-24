"use strict";
exports.__esModule = true;
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
        },
        /**
          * [$.copyText] 复制文本到粘贴板
          * @param text [string]
          */
        copyText: function (text) {
            var $tmpIpt = $('<textarea></textarea>').css({ position: 'fixed', left: '200%' });
            $('body').append($tmpIpt);
            $tmpIpt.val(text).select();
            document.execCommand('Copy');
            $tmpIpt.remove();
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
exports.extendJquery = extendJquery;
