"use strict";
exports.__esModule = true;
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
exports.Progress = Progress;
