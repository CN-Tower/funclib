export /*funclib*/ class BootstrapTable {
  private translate: any;
  private loadingTimers: any = {singleTableTimer: null};

  gridOptions: any = {
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
  }

  constructor(translate: any) {
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
  render($table: any, options: any) {
    const tableConf = $.extend(options.gridOptions || this.gridOptions, options.tableConfig || {});
    const isAfterInit = $table.parent().hasClass('fixed-table-body');
    this.setAndClearLoadingTimers(options);
    if (!isAfterInit) {
      $table.bootstrapTable(tableConf).bootstrapTable('showLoading');
      this.tableInitHandler($table, tableConf, options);
    }
    this.tableRefreshHandler($table, tableConf, options);
  }

  private tableInitHandler($table: any, tableConf: any, options: any) {
    setTimeout(() => {
      if ($table.parent().hasClass('fixed-table-body')) {
        const tableScope = options.hasOwnProperty('tableScope') && options.tableScope &&
        typeof options.tableScope === 'string' ? options.tableScope : '';
        const $refreshBtn = $(`${tableScope} .bootstrap-table .fixed-table-toolbar button[name="refresh"]`);
        if (options.hasOwnProperty('onRendered') && options.onRendered instanceof Function) {
          options.onRendered();
        }
        if (options.hasOwnProperty('onRefreshing') && options.onRefreshing instanceof Function) {
          $refreshBtn.on('click', () => {
            options['showLoading'] = true;
            this.tableRefreshHandler($table, tableConf, options);
            options.onRefreshing();
          });
        }
        $refreshBtn.addClass('btn-sm').css('marginLeft', '10px')
          .mouseleave(function () { $(this).blur(); });
        $('.bootstrap-table .search input')
           .attr('placeholder', this.translate.instant('WordForFilter'))
           .parent().append(`<span></span>`);
      }
    });
  }

  private tableRefreshHandler($table: any, tableConf: any, options: any) {
    const isShowLoading = options['showLoading'] === true;
    if (tableConf.hasOwnProperty('url') || tableConf.hasOwnProperty('ajax')) {
      if (isShowLoading) {
        $table.bootstrapTable('showLoading');
        this.setLoadingTimer($table, options);
      } else {
        $table.bootstrapTable('refresh', {silent: true}).one('post-body.bs.table', function () {
          $table.bootstrapTable('hideLoading');
        });
      }
    } else {
      if (isShowLoading) {
        $table.bootstrapTable('load', []).bootstrapTable('showLoading');
        this.setLoadingTimer($table, options);
      } else {
        const data = tableConf.hasOwnProperty('data') && tableConf.data || [];
        $table.bootstrapTable('load', data).bootstrapTable('hideLoading');
      }
    }
  }

  private setAndClearLoadingTimers(options: any) {
    const loadingTimers = options.hasOwnProperty('tableLabel') && options.tableLabel
      ? this.loadingTimers[options.tableLabel]
      : this.loadingTimers.singleTableTimer;
    clearTimeout(loadingTimers);
  }

  private setLoadingTimer($table: any, options: any) {
    options.hasOwnProperty('tableLabel') && options.tableLabel
      ? this.loadingTimers[options.tableLabel] = setTimeout(() => $table.bootstrapTable('hideLoading'), 20000)
      : this.loadingTimers.singleTableTimer = setTimeout(() => $table.bootstrapTable('hideLoading'), 20000);
  }
}
