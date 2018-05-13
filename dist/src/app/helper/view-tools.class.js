"use strict";
exports.__esModule = true;
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
exports.ViewToolsHelper = ViewToolsHelper;
