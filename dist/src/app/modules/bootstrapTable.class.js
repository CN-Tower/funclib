"use strict";
exports.__esModule = true;
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
     * [fn.bootstrapTable.render] 渲染Bootstrap表格的通用方式
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
    BootstrapTable.prototype.render = function ($table, options) {
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
                $('.bootstrap-table .search input')
                    .attr('placeholder', _this.translate.instant('WordForFilter'))
                    .parent().append("<span></span>");
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
exports.BootstrapTable = BootstrapTable;
