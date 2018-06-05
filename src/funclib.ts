
import { Str } from './modules/string';
import { Arr } from './modules/array';
import { Obj } from './modules/object';
import { Time } from './modules/time';
import { Patterns } from './modules/patterns';
import { Events } from './modules/events';
import { Mathematic } from './modules/math';
import { Loger } from './modules/loger';
import { Dom } from './modules/dom';
import { Cookie } from './modules/cookie';
import { Tools } from './modules/tools';
import { Table } from './modules/table';
import { ViewTools } from './modules/views';
import { Progress } from './modules/progress';
import { extendJquery } from './modules/$.extends';
import { FN_CONF } from './configs/FnConf'

let jquery, isClient;

export class Funclib {
  public version: string = 'V2.0.5'

  constructor(root: any) {
    const deleteProp = prop => {
      delete this[prop];
      if (this['__proto__']) {
        delete this['__proto__'][prop];
      }
    }
    if (root && root.window && root.document) {
      isClient = true;
      FN_CONF.serverMethods.forEach(prop => deleteProp(prop));
      jquery = root.$ || root.jquery;
      if (jquery) {
        extendJquery(jquery, this.interval);
      }
    } else {
      isClient = false;
      this.initTools();
      this.initProgress();
      FN_CONF.clientMethods.forEach(prop =>  deleteProp(prop));
    }
  }

  /**
   * [fn.array] 返回一个指定长度和默认值的数组
   * @param length [number]
   * @param value  [any, function]
   */
  array(length: number, value?: any): any[] {
    return Arr.array(length, value);
  }

  /**
   * [fn.toArr] 值数组化
   * @param src 
   */
  toArr(src: any): any[] {
    return Arr.toArr(src);
  }

  /**
   * [fn.sortByField] 对象数组根据字段排序
   * @param data
   * @param field
   * @param isDesc
   */
  sortByField(data: any, field: string, isDesc?: boolean) {
    return Arr.sortByField(data, field, isDesc);
  }

  /**
   * [fn.len] 获取对象自有属性的个数
   * @arg obj [object]
   */
  len(obj: any): number {
    return Obj.len(obj);
  }

  /**
   * [fn.isEmpty] 判断对象是否为空对象或数组
   * @param obj 
   */
  isEmpty(obj: Object | any[]): boolean {
    return Obj.isEmpty(obj);
  }

  /**
   * [fn.overlay] 给对象赋值
   * @param target 
   * @param source 
   * @param propList 
   */
  overlay(target: Object, source: Object, propList?: string[]) {
    return Obj.overlay(target, source, propList);
  }

  /**
   * [fn.deepCopy] 深拷贝对象或数组
   * @param data
   */
  deepCopy(data: any) {
    return Obj.deepCopy(data);
  }

  /**
   * [fn.random] 返回一个指定范围内的随机数
   * @param sta 
   * @param end 
   */
  random(sta: number, end?: number): number {
    return Mathematic.random(sta, end);
  }

  /**
   * [fn.rdId] 返回一个指定长度（最小4位）的随机ID
   * @param len 
   */
  rdId(len: number = 12): string {
    return Mathematic.rdId.call(this, len);
  }

  /**
   * [fn.rdColor] 返回一个随机颜色色值
   */
  rdColor() {
    return Mathematic.rdColor();
  }

  /**
   * [fn.interval] 循环定时器
   * @param timerId
   * @param duration
   * @param func
   */
  interval(timerId: string, duration: number | boolean, func?: Function) {
    return Time.interval(timerId, duration, func);
  }

  /**
   * [fn.timeout] 延时定时器
   * @param timerId 
   * @param duration 
   * @param func 
   */
  timeout(timerId: string, duration: number | boolean, func?: Function) {
    return Time.timeout(timerId, duration, func);
  }

  /**
   * [fn.timeStamp] 返回一个当前时间戳
   */
  timeStamp(date?: Date | string): number {
    return Time.timeStamp(date);
  }

  /**
   * [fn.fmtDate] 获取格式化的时间字符串
   * @param fmtStr 
   * @param time 
   */
  fmtDate(fmtStr: string, time?: any): string {
    return Time.fmtDate(fmtStr, time);
  }

  /**
   * [fn.encodeHtml] 编码HTML字符串
   * @param html 
   */
  encodeHtml(html: string): string {
    return Str.encodeHtml(html);
  }

  /**
   * [fn.decodeHtml] 解码HTML字符串
   * @param html 
   */
  decodeHtml(html: string): string {
    return Str.decodeHtml(html);
  }

  /**
   * [fn.currency] 格式化显示货币
   * @param number
   * @param digit
   * @returns {string}
   */
  currency(number: number, digit: number = 2): string {
    return Str.currency(number, digit);
  }

  /**
   * [fn.cutString] 裁切字符串到指定长度
   * @param str
   * @param len
   * @returns {string}
   */
  cutString(str: string, len: number): string {
    return Str.cutString.call(this, str, len);
  }

  /**
   * [fn.getPattern] 与一个或几个通用正则匹配
   * @param type
   * @param isNoLimit
   * @returns {pattern|undefined}
   */
  getPattern(type: string, isNoLimit: boolean = false): any {
    return Patterns.getPattern(type, isNoLimit);
  }

  /**
   * [fn.matchPattern] 获取一个通用的正则表达式
   * @param src
   * @param type
   * @param isNoLimit
   * @returns {boolean}
   */
  matchPattern(src: string, type: string | string[], isNoLimit: boolean = false): boolean {
    return Patterns.matchPattern(src, type, isNoLimit);
  }

  /**
   * [fn.getKeyCodeByName] 根据键名获取键码
   * @param keyName 
   */
  getKeyCodeByName(keyName: string): number {
    return Events.getKeyCodeByName(keyName);
  }

  /**
   * [fn.getKeyCodeByName] 根据键码获取键名
   * @param keyName 
   */
  getKeyNameByCode(keyCode: number): string {
    return Events.getKeyNameByCode(keyCode);
  }

  /**
   * [fn.fullScreen] 全屏显示HTML元素
   * @param el
   * @returns {any}
   */
  fullScreen(el: any): any {
    return Dom.fullScreen(el);
  }

  /**
   * [fn.exitFullScreen] 退出全屏显示
   * @returns {any}
   */
  exitFullScreen(): any {
    return Dom.exitFullScreen();
  }

  /**
   * [fn.checkIsFullScreen] 检测是否全屏状态
   * @returns {boolean}
   */
  checkIsFullScreen(): boolean {
    return Dom.checkIsFullScreen();
  }

  /**
   * [fn.setCookie] 设置Cookie
   * @param name 
   * @param value 
   * @param days 
   */
  setCookie(name: string, value: string, days: number) {
    return Cookie.setCookie(name, value, days);
  }

  /**
   * [fn.getCookie] 根据name读取cookie
   * @param  name 
   * @return {String}
   */
  getCookie(name: string): string {
    return Cookie.getCookie(name);
  }

  /**
   * [fn.removeCookie] 根据name删除cookie
   * @param name 
   */
  removeCookie(name: string) {
    return Cookie.removeCookie(name);
  }

  /**
   * [fn.log] 控制台格式化打印值
   * @param value 
   * @param configs {
   * title: string,
   * lineLen: number [20-100]
   * part: 'pre'|'end' [S]
   * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [S] }
   */
  log(value?: any, configs?: Object) {
    return Loger.log.call(this, value, configs, isClient);
  }

  /**
   * [fn.chalk] 在控制台打印有颜色的字符串
   * @param value 
   * @param color 
   */
  chalk(value: string, color?: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow') {
    return Loger.chalk(value, color);
  }

  /**
   * 初始化NodeJs工具
   */
  private initTools() {
    const tools = new Tools();
    /**
     * [fn.rd] 读文件
     * @param file
     */
    this['rd'] = (file: string) => tools.rd(file);

    /**
     * [fn.wt] 写文件
     * @param file
     * @param text
     * @param flag ['w'|'a'] default: 'w'
     */
    this['wt'] = (file: string, text: string, flag: 'w'|'a' = 'w') => tools.wt(file, text, flag);

    /**
     * [fn.cp] 复制文件或文件夹
     * @param src
     * @param dist
     */
    this['cp'] = (src: string, dist: string) => tools.cp(src, dist);

    /**
     * [fn.mv] 移动文件或文件夹
     * @param src
     * @param dist
     */
    this['mv'] = (src: string, dist: string) => tools.mv(src, dist);

    /**
     * [fn.rm] 删除文件或文件夹
     * @param src
     */
    this['rm'] = (src: string) => tools.rm(src);

    /**
     * [fn.mk] 创建文件夹
     * @param dist
     */
    this['mk'] = (dist: string) => tools.mk(dist);
  }

  /**
   * 初始化进度条工具
   */
  private initProgress() {
    const progress = new Progress();
    this['progress'] = {};
    /**
     * [fn.progress.start] 开启进度条，并传入参数
     * @param options {title: string, width: number (base: 40)}
     */
    this['progress']['start'] = (options: Object) => progress.start(options);
    
    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param onStopped 
     */
    this['progress']['stop'] = (onStopped: Function) => progress.stop(onStopped);
  }

  /**
   * [fn.initViewTools] 初始化提示和Loader
   * @param initViewTools [class]
   */
  initViewTools(viewToolsCtrl: any) {
    this['viewTools'] = new ViewTools(viewToolsCtrl);
  }

  /**
   * [fn.initBootstrapTable] 初始化一个BootstrapTable对象
   * @param translate [Object]
   */
  initBootstrapTable(translate?: Object) {
    if (jquery) {
      this['table'] = new Table(jquery, translate);
    } {
      throw new Error('jQuery not found!');
    }
  }
}
