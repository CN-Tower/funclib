"use strict";
exports.__esModule = true;
var ViewTools = /** @class */ (function () {
    function ViewTools(viewToolsCtrl) {
        this.viewToolsCtrl = viewToolsCtrl;
    }
    /**
     * [fn.viewTools.show]
     * @param options
        * type {success|error|loader|timer},
        * isShow
        * msg
        * interval
        * delay
     */
    ViewTools.prototype.show = function (options) {
        var _this = this;
        if (options instanceof Array) {
            options.forEach(function (item) { return _this.viewToolsHandler(item); });
        }
        else if (typeof options === 'object') {
            this.viewToolsHandler(options);
        }
    };
    ViewTools.prototype.viewToolsHandler = function (options) {
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
                    _this.viewToolsCtrl.next(_this.optionsHandler(options));
                }, options.delay);
            }
            else {
                this.viewToolsCtrl.next(this.optionsHandler(options));
            }
        }
    };
    ViewTools.prototype.optionsHandler = function (option) {
        if (!option.hasOwnProperty('isShow')) {
            option.isShow = true;
        }
        if (option.isShow && !option.hasOwnProperty('interval')) {
            option.interval = option.type === 'loader' ? 20000 : 2000;
        }
        return option;
    };
    return ViewTools;
}());
exports.ViewTools = ViewTools;
