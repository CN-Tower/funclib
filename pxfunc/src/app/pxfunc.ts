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
import {ViewToolsHelper} from './helper/view-tools.class';
import {BootstrapTableHelper} from './helper/bootstrap-table.class';
import {Patterns} from './helper/patterns.class';
import {GridOptions} from './helper/grid-options.class';
import * as $ from 'jquery';

export /*pxfunc*/class PxFunc {
  translate: any;
  viewToolsCtrl: any;
  patterns: Patterns = new Patterns();
  gridOptions: GridOptions = new GridOptions();
  private _viewsHelper: ViewToolsHelper;
  private _tableHelper: BootstrapTableHelper;
  private _pollingTimers: any = {};
  private _pollingElTimers: any = {};
  private _lintFix: any;
  constructor() {}

  /**
   * [fn.init] Init PxFunc
   * @param translate
   * @param viewToolsCtrl
   */
  init(translate: any, viewToolsCtrl: any) {
    this.translate = translate;
    this.viewToolsCtrl = viewToolsCtrl;
    this._viewsHelper = new ViewToolsHelper(this.translate, this.viewToolsCtrl);
    this._tableHelper = new BootstrapTableHelper(this.translate);
  }

  /**
   * fn.time: 返回一个当前时间字符串。
   */
  time: Function = () => (new Date()).getTime();

  /**
   * fn.uuid: 返回一个指定长度(最小6位)的随机ID。
   * @param len [number]
   */
  uuid(len: number = 12): string {
    const charSet = '0123456789abcdefghijklmnopqrstuvwxyz'
    let eleId = '';
    if (len < 6) {
        len = 6;
    };
    this.array(len).forEach(x => eleId += charSet[this.random(charSet.length)]);
    return eleId;
  };

  /**
   * fn.array: 返回一个指定长度和默认值的数组
   * @param length [number]
   * @param value  [any, function]
   */
  array(length: number, value: any = ''): any[] {
    const tmpArr = [];
    for (let i = 0; i < length; i ++) {
        const val = typeof value === 'function' ? value() : value;
        tmpArr.push(val);
    }
    return tmpArr;
  }

  /**
   * fn.random: 返回一个指定范围的随机数
   * @param sta [number]
   * @param end [number]
   */
  random(sta: number, end?: number): number {
    return end && end > sta
        ? Math.floor(Math.random() * (end - sta) + sta)
        : Math.floor(Math.random() * sta);
  }

  /**
   * fn.objLen: 获取对象自有属性的个数
   * @arg obj [object]
   * */
  objLen(obj: any): number {
    let objLength = 0;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            objLength ++;
        }
    }
    return objLength;
  }

  /**
   * [fn.polling] Polling process service
   * @param name
   * @param interval
   * @param fn
   */
  polling(name: string, interval: number|boolean, fn?: Function) {
    if (typeof interval === 'number' && !!fn) {
      clearInterval(this._pollingTimers[name]);
      this._pollingTimers[name] = setInterval(() => fn(), interval);
    } else if (typeof interval === 'boolean' && !interval){
      clearInterval(this._pollingTimers[name]);
    }
  }

  /**
   * [fn.errors] Set form control's error
   * @param model
   * @param errorMsg
   * @param isForce
   */
  errors(model: any, errorMsg: string, isForce: boolean = false) {
    this._lintFix = true;
    if (model && model['control'] && (isForce || !model.control.pristine)) {
      errorMsg
        ? model.control.errors({validator: errorMsg})
        : model.control.errors(null);
    }
  }

  /**
   * [fn.viewTools] Toggle to show some global View Tools, i.e.: infoMsg, errMsg and loader.
   * @param options
      * type {success|error|loader|timer},
      * isShow
      * msg
      * interval
      * delay
   */
  viewTools(options: any) {
    if (options instanceof Array) {
      options.forEach(item => this._viewsHelper.viewToolsHandler(item));
    } else if (typeof options === 'object') {
      this._viewsHelper.viewToolsHandler(options);
    }
  }

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
  bootstrapTable($table: any, options: any) {
    if (options.hasOwnProperty('showLoading') && !options.showLoading) {
      this.viewTools({type: 'loader', isShow: false});
    }
    const tableConf = $.extend(options.gridOptions || this.gridOptions, options.tableConfig || {});
    const isAfterInit = $table.parent().hasClass('fixed-table-body');
    this._tableHelper.setAndClearLoadingTimers(options);
    if (!isAfterInit) {
      $table.bootstrapTable(tableConf).bootstrapTable('showLoading');
      this._tableHelper.tableInitHandler($table, tableConf, options);
    }
    this._tableHelper.tableRefreshHandler($table, tableConf, options);
  }

  /**
   * [fn.sortData] Sort table data by field
   * @param tableData
   * @param field
   * @param isDesc
   */
  sortData(tableData: any, field: string, isDesc?: boolean) {
    return tableData.sort((row1, row2) => {
      return row1.hasOwnProperty(field) && row2.hasOwnProperty(field)
        ? row1[field] === row2[field]
          ? 0
          : isDesc
            ? row1[field] > row2[field] ? -1 : 1
            : row1[field] > row2[field] ? 1 : -1
        : 0;
    });
  }

  /**
   * [fn.copy] Deep clone an Array or an Object
   * @param data
   */
  copy(data: any) {
    if (typeof data !== 'object') { return data; }
    let tmpData;
    if (data instanceof Array) {
      tmpData = [];
      for (let i = 0; i < data.length; i++) {
        tmpData.push(this.copy(data[i]));
      }
    } else {
      tmpData = {};
      for (const key in data){
        if (data.hasOwnProperty(key)) {
          tmpData[key] = this.copy(data[key]);
        }
      }
    }
    return tmpData;
  }

  /**
   * [fn.currency] Format Currency
   * @param number
   * @param digit
   * @returns {string}
   */
  currency(number: number, digit: number = 2) {
    this._lintFix = true;
    const nbArr = parseFloat(String(number)).toFixed(digit).split('.');
    const integer = nbArr[0];
    const decimal = nbArr.length > 1 ? nbArr[1] : '';
    let integerStr, spn, sti, i;
    spn = Math.floor(integer.length / 3);
    sti = integer.length % 3;
    integerStr = integer.substr(0, sti);
    for (i = 0; i < spn; i ++) {
      integerStr += (i === 0 && !integerStr) ? integer.substr(sti, 3) : ',' + integer.substr(sti, 3);
      sti += 3;
    }
    return decimal ? integerStr + '.' + decimal : integerStr;
  }

  /**
   * [fn.cutString] Format string width length
   * @param str
   * @param len
   * @returns {string}
   */
  cutString(str, len) {
    this._lintFix = true;
    const patrn = /[\x00-\xff]/;
    let
      strre = '',
      count = 0,
      tempStr;
    for (let i = 0; i < str.length; i++) {
      if (count >= len - 1)  { break; }
      tempStr = str.substr(i, 1);
      strre += tempStr;
      count += patrn.test(tempStr) ? 2 : 1;
    }
    return strre + '...';
  }

  /**
   * [fn.findCousin] Find the cousin(s) of jQuery element
   * @param $ele
   * @param selector
   * @param level
   * @returns {any}
   */
  findCousin($ele: any, selector: string, level: number = 0) {
    this._lintFix = true;
    if (!level) {
      return selector ? $ele.parents().find(selector) : $ele.parents();
    } else {
      let $parent = $ele;
      for (let i = 0; i < level; i ++) {
        $parent = $parent.parent();
      }
      return selector ? $parent.find(selector) : $parent;
    }
  }

  /**
   * [fn.matchPattern] Match common RegExp patterns
   * @param src
   * @param type
   * @param isNoLimit
   * @returns {boolean}
   */
  matchPattern(src: string, type: string|string[], isNoLimit?: boolean) {
    if (!src || !type) {return false; }
    if (type instanceof Array) {
      let matchResult = false;
      type.forEach(item => {
        const pattern: RegExp = this.getPattern(item, isNoLimit);
        if (pattern && pattern.test(src)) {matchResult = true; }
      });
      return matchResult;
    } else if (typeof type === 'string') {
      const pattern: RegExp = this.getPattern(type, isNoLimit);
      return pattern && pattern.test(src);
    }
  }

  /**
   * [fn.getPattern] Get a common RegExp pattern
   * @param type
   * @param isNoLimit
   * @returns {pattern|undefined}
   */
  getPattern(type: string, isNoLimit?: boolean) {
    if (!type) {return; }
    const patternsObj = {
      cnChar:      this.patterns.cnCharPattern,
      dblBitChar:  this.patterns.dblBitCharPattern,
      mobPhone:    this.patterns.mobPhonePattern,
      telPhone:    this.patterns.telPhonePattern,
      email:       this.patterns.emailPattern,
      base64Code:  this.patterns.base64CodePattern,
      mac:         this.patterns.macPattern,
      domain:      this.patterns.domainPattern,
      port:        this.patterns.portPattern,
      ip:          this.patterns.ipPattern,
      ipv4:        this.patterns.ipv4Pattern,
      ipv6:        this.patterns.ipv6Pattern,
      ipv4IpRange: this.patterns.ipv4IpRangePattern,
      ipv6IpRange: this.patterns.ipv6IpRangePattern,
      ipv4Cidr:    this.patterns.ipv4CidrPattern,
      ipv6Cidr:    this.patterns.ipv6CidrPattern,
      ipv4Url:     this.patterns.ipv4UrlPattern,
      ipv6Url:     this.patterns.ipv6UrlPattern,
      domainUrl:   this.patterns.domainUrlPattern,
      url:         this.patterns.urlPattern,
      ipWithPortUrl:      this.patterns.ipWithPortUrlPattern,
      ipv6WithPortUrl:    this.patterns.ipv6WithPortUrlPattern,
      domainWithPortUrl:  this.patterns.domainWithPortUrlPattern,
      withPortUrl:        this.patterns.withPortUrlPattern
    };
    patternsObj['patternList'] = Object.keys(patternsObj);
    return patternsObj.hasOwnProperty(type) && patternsObj[type]
      ? type === 'patternList'
        ? patternsObj[type]
        : isNoLimit
          ? new RegExp(patternsObj[type].source)
          : new RegExp(`^(${patternsObj[type].source})$`)
      : undefined;
  }

  /**
   * [fn.pollingEl] Polling until got jQuery element
   * @param poId
   * @param selector
   * @param interval
   * @param fn {opt.}
   */
  pollingEl(poId: string, selector: string|any[]|boolean, interval: number, fn?: Function) {
    if ((typeof selector === 'string' || selector instanceof Array) && !!fn) {
      clearInterval(this._pollingElTimers[poId]);
      let count = 0;
      const int = 250;
      this._pollingElTimers[poId] = setInterval(() => {
        count >= parseInt(String(interval / int), 10) ? clearInterval(this._pollingElTimers[poId]) : count ++;
        const tmpArr = [];
        const selectors: any = typeof selector === 'string' ? [selector] : selector;
        selectors.forEach(slt => {
          const $ele = $(slt);
          if ($ele.length > 0) {
            tmpArr.push($ele);
          }
        });
        if (tmpArr.length === selectors.length) {
          clearInterval(this._pollingElTimers[poId]);
          fn(tmpArr);
        }
      }, int);
    } else if (typeof selector === 'boolean' && !interval) {
      clearInterval(this._pollingElTimers[poId]);
    }
  }
}
