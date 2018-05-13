"use strict";
exports.__esModule = true;
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
exports.BootstrapTableHelper = BootstrapTableHelper;
