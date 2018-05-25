import { Tools } from './modules/tools.class';
import { Patterns } from './modules/patterns.class';
import { Progress } from './modules/progress.class';
import { extendJquery } from './modules/extendJquery.func';
import { ViewTools } from './modules/viewTools.class';
import { BootstrapTable } from './modules/bootstrapTable.class';
import * as $ from 'jquery';

export /*funclib*/ class Funclib {

  version: string = 'V1.0.4'
  tools: any;
  progress: any;
  viewTools: any;
  table: any;

  private jquery: any;
  private window: any;
  private document: any;
  private patterns: Patterns = new Patterns();
  private intervalTimers: any = {};
  private timeoutTimers: any = {};

  constructor(options: Object) {
    this.overlay(this, options, ['jquery', 'window', 'document'])
    if (!this.window || !this.document) {
      delete this.window;
      delete this.document;
      delete this.fullScreen;
      delete this.exitFullScreen;
      delete this.checkIsFullScreen;
    }
    if (this.jquery) {
      extendJquery(this.jquery, this.interval);
    } else {
      delete this.jquery;
    }
  }
  
  /**
   * [fn.initTools] 初始化一个NodeJs工具包对象
   * @param options [Object]
   */
  initTools(options: Object) {
    if (options) {
      this.tools = new Tools(options['fs'], options['path']);
    }
  }

  /**
   * [fn.initProgress] 初始化进度条对象
   * @param ProgressBar [class]
   */
  initProgress(ProgressBar: any) {
    if (ProgressBar) {
      this.progress = new Progress(ProgressBar);
    }
  }

  /**
   * [fn.initViewTools] 初始化提示和Loader
   * @param initViewTools [class]
   */
  initViewTools(viewToolsCtrl: any) {
    if (viewToolsCtrl) {
      this.viewTools = new ViewTools(viewToolsCtrl);
    }
  }

  /**
   * [fn.initBootstrapTable] 初始化一个BootstrapTable对象
   * @param translate [Object]
   */
  initBootstrapTable(translate?: Object) {
    this.table = new BootstrapTable(translate)
  }

  /**
   * [fn.time] 返回一个当前时间字符串。
   */
  time: Function = () => (new Date()).getTime();

  /**
   * [fn.gnid] 返回一个指定长度(最小6位)的随机ID。
   * @param len [number]
   */
  gnid(len: number = 12): string {
    const charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let eleId = '';
    if (len < 6) {
      len = 6;
    };
    this.array(len).forEach(x => eleId += charSet[this.random(charSet.length)]);
    return eleId;
  };

  /**
   * [fn.array] 返回一个指定长度和默认值的数组
   * @param length [number]
   * @param value  [any, function]
   */
  array(length: number, value?: any): any[] {
    const tmpArr = [];
    const isUndefied = value === undefined;
    const isFunction = typeof value === 'function';
    let tmpVal = 0;
    for (let i = 0; i < length; i++) {
      if (isUndefied) {
        tmpArr.push(tmpVal);
        tmpVal++;
      } else if (isFunction) {
        tmpArr.push(value());
      } else {
        tmpArr.push(value);
      }
    }
    return tmpArr;
  }

  /**
   * [fn.random] 返回一个指定范围的随机数
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
   * [fn.len] 获取对象自有属性的个数
   * @arg obj [object]
   * */
  len(obj: any): number {
    return Object.keys(obj).length;
  }

  /**
   * [fn.interval] 循环定时器
   * @param timerId
   * @param duration
   * @param func
   */
  interval(timerId: string, duration: number | boolean, func?: Function) {
    if (typeof duration === 'number' && typeof func === 'function') {
      clearInterval(this.intervalTimers[timerId]);
      this.intervalTimers[timerId] = setInterval(() => func(), duration);
    } else if (typeof duration === 'boolean' && !duration) {
      clearInterval(this.intervalTimers[timerId]);
    }
  }

  /**
   * [fn.timeout] 延时定时器
   * @param timerId 
   * @param duration 
   * @param func 
   */
  timeout(timerId: string, duration: number | boolean, func?: Function) {
    if (typeof duration === 'number' && typeof func === 'function') {
      clearTimeout(this.timeoutTimers[timerId]);
      this.timeoutTimers[timerId] = setTimeout(() => func(), duration);
    } else if (typeof duration === 'boolean' && !duration) {
      clearTimeout(this.timeoutTimers[timerId]);
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
      for (const key in data) {
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
  currency(number: number, digit: number = 2): string {
    let nbArr = String(number.toFixed(digit)).split('.');
    const integer = nbArr[0];
    const decimal = nbArr.length > 1 ? nbArr[1] : '';
    let integerStr, spn, sti, i;
    spn = Math.floor(integer.length / 3);
    sti = integer.length % 3;
    integerStr = integer.substr(0, sti);
    for (i = 0; i < spn; i++) {
      integerStr += (i === 0 && !integerStr) ? integer.substr(sti, 3) : ',' + integer.substr(sti, 3);
      sti += 3;
    }
    return decimal ? integerStr + '.' + decimal : integerStr;
  }

  /**
   * [fn.cutString] 裁切字符串到指定长度
   * @param str
   * @param len
   * @returns {string}
   */
  cutString(str, len): string {
    let tmpStr = '';
    let count = 0;
    let tmpChar;
    for (let i = 0; i < str.length; i++) {
      if (count < len) {
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
   * [fn.overlay] 给对象赋值
   * @param target 
   * @param source 
   * @param propList 
   */
  overlay(target: Object, source: Object, propList?: string[]) {
    if (source) {
      if (propList && propList.length > 0) {
        propList.forEach(prop => {
          if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
          }
        });
      } else {
        Object.keys(source).forEach(key => {
          target[key] = source[key];
        });
      }
    }
  }

  /**
   * [fn.getPattern] 与一个或几个通用正则匹配
   * @param type
   * @param isNoLimit
   * @returns {pattern|undefined}
   */
  getPattern(type: string, isNoLimit: boolean = false): any {
    if (!type) { return; }
    const patternsObj = {
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
  matchPattern(src: string, type: string | string[], isNoLimit?: boolean): boolean {
    if (!src || !type) { return false; }
    if (type instanceof Array) {
      let matchResult = false;
      type.forEach(item => {
        const pattern: RegExp = this.getPattern(item, isNoLimit);
        if (pattern && pattern.test(src)) { matchResult = true; }
      });
      return matchResult;
    } else if (typeof type === 'string') {
      const pattern: RegExp = this.getPattern(type, isNoLimit);
      return pattern && pattern.test(src);
    }
  }

  /**
   * [fn.log] 控制台打印
   * @param value 
   * @param configs {
   * title: string,
   * lineLen: number [20-100]
   * part: 'pre'|'end' (opt.)
   * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
   */
  log(value?: any, configs?: Object) {
    const colors = {
      'grey': '\x1B[90m%s\x1B[0m',
      'blue': '\x1B[34m%s\x1B[0m',
      'cyan': '\x1B[36m%s\x1B[0m',
      'green': '\x1B[32m%s\x1B[0m',
      'magenta': '\x1B[35m%s\x1B[0m',
      'red': '\x1B[31m%s\x1B[0m',
      'yellow': '\x1B[33m%s\x1B[0m'
    }
    if (value === undefined) {
      value = `Welecome come to use funclib: ${this.version} !`;
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value, null, 2);
    } else {
      value = String(value);
    }
    let title = configs && configs['title'] || `funclib ${this.version}`;
    const color = configs && configs['color'] in colors && configs['color'] || 'grey';
    let lineLen = configs && configs['lineLen'];
    if (!lineLen || lineLen < 20 || lineLen > 100 ) {
      lineLen = 66;
    }
    let titlelen, sp = '';
    if (title.length <= lineLen - 10) {
      titlelen = title.length;
    } else {
      titlelen = lineLen - 10;
      title = this.cutString(title, titlelen - 2);
    }
    this.array((lineLen - titlelen) / 2, ' ').forEach(x => sp += x);
    const tt = sp + title;
    const s = '-', d = '=';
    let sL = '', dL = '';
    this.array(lineLen).forEach(x => {
      sL += s;
      dL += d;
    });

    if (configs && ['pre', 'end'].indexOf(configs['part']) > -1) {
      if (configs['part'] === 'pre') {
        console.log('\n' + dL);
        console.log(colors['green'], tt);
        console.log(sL);
      } else {
        console.log(dL + '\n');
      }
    } else {
      console.log('\n' + dL);
      console.log(colors['green'], tt);
      console.log(sL);
      console.log(colors[color], value);
      console.log(dL + '\n');
    }
  }

  /**
   * [fn.fullScreen] 全屏显示HTML元素
   * @param el
   * @returns {any}
   */
  fullScreen(el: any): any {
    const rfs = el.requestFullScreen || el.webkitRequestFullScreen
      || el.mozRequestFullScreen || el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) {
      return rfs.call(el);
    }
    if (typeof this.window.ActiveXObject != "undefined") {
      const ws = new this.window.ActiveXObject("WScript.Shell");
      if (ws) { ws.SendKeys("{F11}"); }
    }
  }

  /**
   * [fn.exitFullScreen] 退出全屏显示
   * @returns {any}
   */
  exitFullScreen(): any {
    const el = this.document;
    const cfs = el.cancelFullScreen || el.webkitCancelFullScreen
      || el.mozCancelFullScreen || el.exitFullScreen;
    if (typeof cfs != "undefined" && cfs) {
      return cfs.call(el);
    }
    if (typeof this.window.ActiveXObject != "undefined") {
      const ws = new this.window.ActiveXObject("WScript.Shell");
      if (ws != null) { ws.SendKeys("{F11}"); }
    }
  }

  /**
   * [fn.checkIsFullScreen] 检测是否全屏状态
   * @returns {boolean}
   */
  checkIsFullScreen(): boolean {
    const el = this.document;
    const isFull = el.fullscreenEnabled || el.fullScreen
      || el.webkitIsFullScreen || el.msFullscreenEnabled;
    return !!isFull;
  }

  /**
   * [fn.setErrors] 手动设定表单错误
   * @param model 
   * @param errorMsg 
   * @param isForce 
   */
  setErrors(model: any, errorMsg: string, isForce: boolean = false) {
    if (model && model['control'] && (isForce || !model.control.pristine)) {
      errorMsg
        ? model.control.setErrors({validator: errorMsg})
        : model.control.setErrors(null);
    }
  }
}
