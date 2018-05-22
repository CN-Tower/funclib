/**=======================================================================
                      通用型逻辑函数封装 PxFunc (V1.0.2)
--------------------------------------------------------------------------
        fn.time                   返回一个当前时间字符串
        fn.pxid                   返回一个指定长度(最小6位)的随机ID
        fn.array                  返回一个指定长度和默认值的数组
        fn.random                 返回一个指定范围的随机数
        fn.objLen                 获取对象自有属性的个数
        fn.deepCopy               深拷贝数组或对象
        fn.interval               循环定时器
        fn.timeout                延时定时器
        fn.sortData               对象数组根据字段排序
        fn.currency               格式化显示货币
        fn.cutString              裁切字符串到指定长度
        fn.findCousin             用jQuery寻找元素的表亲
        fn.matchPattern           与一个或几个通用正则匹配
        fn.getPattern             获取一个通用的正则表达式
        fn.pollingElement         用jQuery定时寻找一个异步渲染的元素
        fn.noAutoComplete         防止input密码自动填充
        fn.bootstrapTable         渲染Bootstrap表格的通用方式
=========================================================================*/
import {BootstrapTableHelper} from './helper/bootstrap-table.class';
import {Patterns} from './helper/patterns.class';
import {GridOptions} from './helper/grid-options.class';
import * as $ from 'jquery';
import { setTimeout } from 'timers';

export /*pxfunc*/class PxFunc {
  version: string = 'V1.0.2'
  translate: any;
  window: any;
  document: any;
  patterns: Patterns = new Patterns();
  gridOptions: GridOptions = new GridOptions();
  private _tableHelper: BootstrapTableHelper;
  private _intervalTimers: any = {};
  private _timeoutTimers: any = {};

  constructor(window: any, document: any) {
    this.window = window;
    this.document = document;
  }

  /**
   * [fn.init] Init PxFunc
   * @param translate
   */
  init(translate: any) {
    this.translate = translate;
    this._tableHelper = new BootstrapTableHelper(this.translate);
  }

  /**
   * fn.time: 返回一个当前时间字符串。
   */
  time: Function = () => (new Date()).getTime();

  /**
   * fn.pxid: 返回一个指定长度(最小6位)的随机ID。
   * @param len [number]
   */
  pxid(len: number = 12): string {
    const charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
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
  array(length: number, value?: any): any[] {
    const tmpArr = [];
    const isUndefied = value === undefined;
    const isFunction = typeof value === 'function';
    let tmpVal = 0;
    for (let i = 0; i < length; i ++) {
      if (isUndefied) {
        tmpArr.push(tmpVal);
        tmpVal ++;
      } else if (isFunction) {
        tmpArr.push(value());
      } else {
        tmpArr.push(value);
      }
    }
    return tmpArr;
  }

  /**
   * fn.random: 返回一个指定范围的随机数
   * @param sta [number]
   * @param end [number]
   */
  random(sta: number, end?: number): number {
    if (end === undefined || sta === end) {
      return Math.floor(Math.random() * sta);
    } else {
      if (sta > end) {
        const tmpSta = sta;
        sta = end;
        end = tmpSta;
      }
      return Math.floor(Math.random() * (end - sta) + sta)
    }
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
   * [fn.interval] 循环定时器
   * @param timerId
   * @param duration
   * @param func
   */
  interval(timerId: string, duration: number|boolean, func?: Function) {
    if (typeof duration === 'number' && typeof func === 'function') {
      clearInterval(this._intervalTimers[timerId]);
      this._intervalTimers[timerId] = setInterval(() => func(), duration);
    } else if (typeof duration === 'boolean' && !duration){
      clearInterval(this._intervalTimers[timerId]);
    }
  }

  /**
   * [fn.timeout] 延时定时器
   * @param timerId 
   * @param duration 
   * @param func 
   */
  timeout(timerId: string, duration: number|boolean, func?: Function) {
    if (typeof duration === 'number' && typeof func === 'function') {
      clearTimeout(this._timeoutTimers[timerId]);
      this._timeoutTimers[timerId] = setTimeout(() => func(), duration);
    } else if (typeof duration === 'boolean' && !duration){
      clearTimeout(this._timeoutTimers[timerId]);
    }
  }

  /**
   * [fn.sortData] 对象数组根据字段排序
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
   * [fn.deepCopy] 深拷贝对象或数组
   * @param data
   */
  deepCopy(data: any) {
    if (typeof data !== 'object') { return data; }
    let tmpData;
    if (data instanceof Array) {
      tmpData = [];
      for (let i = 0; i < data.length; i++) {
        tmpData.push(this.deepCopy(data[i]));
      }
    } else {
      tmpData = {};
      for (const key in data){
        if (data.hasOwnProperty(key)) {
          tmpData[key] = this.deepCopy(data[key]);
        }
      }
    }
    return tmpData;
  }

  /**
   * [fn.currency] 格式化显示货币
   * @param number
   * @param digit
   * @returns {string}
   */
  currency(number: number, digit: number = 2) {
    let nbArr = String(number.toFixed(digit)).split('.');
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
    let tmpStr = '';
    let count  = 0;
    let tmpChar;
    for (let i = 0; i < str.length; i++) {
      if (count < len)  {
        tmpChar = str.substr(i, 1);
        tmpStr += tmpChar;
        count += this.matchPattern(tmpChar, 'cnChar') ? 2 : 1;
      } else {
        break;
      }
    }
    return tmpStr + '...';
  }

  /**
   * [fn.findCousin] Find the cousin(s) of jQuery element
   * @param $ele
   * @param selector
   * @param level
   * @returns {any}
   */
  findCousin($ele: any, selector: string, level: number = 0) {
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
   * [fn.getPattern] 与一个或几个通用正则匹配
   * @param type
   * @param isNoLimit
   * @returns {pattern|undefined}
   */
  getPattern(type: string, isNoLimit: boolean = false) {
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
   * [fn.matchPattern] 获取一个通用的正则表达式
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
   * [fn.pollingElement] 轮询获取异步出现的jQuery元素
   * @param timerId
   * @param selector
   * @param interval
   * @param func [opt.]
   */
  pollingElement(timerId: string, selector: boolean|string|any[], interval: number, func?: Function) {
    if ((typeof selector === 'string' || selector instanceof Array) && typeof func === 'function') {
      let count = 0;
      const duration = 250;
      this.interval(timerId, duration, eles => {
        parseInt(String(interval / duration), 10) <= count ? this.interval(timerId, false) : count ++;
        const tmpArr = [];
        const slts: any = typeof selector === 'string' ? [selector] : selector;
        slts.forEach(slt => {
          const $ele = $(slt);
          if ($ele.length > 0) {
            tmpArr.push($ele);
          }
        });
        if (tmpArr.length === slts.length) {
          this.interval(timerId, false);
          func(tmpArr);
        }
      });
    } else {
      this.interval(timerId, false);
    }
  }

  /**
   * [fn.noAutoComplete] 防止input密码自动填充
   * @param options [{type: 'username'|'password', $input: $(input)} | [{}]]
   */
  noAutoComplete(options: Object|Object[]) {
    const noAutoCplt: Function = opt => {
      if (opt['type'] && opt['$input']) {
        if (['user', 'username'].indexOf(opt.type) > -1) {
          opt.$input
          .attr('autocomplete', 'off')
          .before('<input type="password" style="display: none"/>');
        } else if (['pwd', 'pass', 'password'].indexOf(opt.type) > -1) {
          opt.$input
          .attr({autocomplete: 'new-password', type: 'text'})
          .on('input propertychange', function() {
            $(this).val() ? $(this).attr('type', 'password') : $(this).attr('type', 'text');
          });
        }
      }
    }
    options instanceof Array
      ? options.forEach(opt => noAutoCplt(opt))
      : noAutoCplt(options);
  }

  /**
   * [fn.bootstrapTable] 渲染Bootstrap表格的通用方式
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
   * Make some html element a full screen show
   * @param el
   * @returns {any}
   */
  fullScreen(el: any) {
    const rfs = el.requestFullScreen || el.webkitRequestFullScreen
      || el.mozRequestFullScreen || el.msRequestFullScreen;
    if(typeof rfs != "undefined" && rfs) {
      return rfs.call(el);
    }
    if(typeof this.window.ActiveXObject != "undefined") {
      const ws = new this.window.ActiveXObject("WScript.Shell");
      if(ws) {ws.SendKeys("{F11}"); }
    }
  }

  /**
   * Exit full screen show
   * @returns {any}
   */
  exitFullScreen() {
    const el= this.document;
    const cfs = el.cancelFullScreen || el.webkitCancelFullScreen
      || el.mozCancelFullScreen || el.exitFullScreen;
    if (typeof cfs != "undefined" && cfs) {
      return cfs.call(el);
    }
    if (typeof this.window.ActiveXObject != "undefined") {
      const ws = new this.window.ActiveXObject("WScript.Shell");
      if (ws != null) {ws.SendKeys("{F11}"); }
    }
  }

  /**
   * Check full screen
   * @returns {boolean}
   */
  checkIsFullScreen() {
    const el = this.document;
    const isFull = el.fullscreenEnabled || el.fullScreen
      || el.webkitIsFullScreen || el.msFullscreenEnabled;
    return !!isFull;
  }

  pxlog() {
    
  }
}
