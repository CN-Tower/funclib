import { Type } from './modules/type';
import { Array_ } from './modules/array';
import { Object_ } from './modules/object';
import { String_ } from './modules/string';
import { Time } from './modules/time';
import { Pattern } from './modules/pattern';
import { Mathematic } from './modules/math';
import { Function_ } from './modules/function';
import { Event_ } from './modules/event';
import { Cookie } from './modules/cookie';
import { Element_ } from './modules/element';
import { Loger } from './modules/loger';
import { FileSystem } from './modules/fs';
import { Progress } from './modules/progress';
import { Tricks } from './modules/tricks';
import { FN_CONF } from './configs/fnConf'
import { Url } from './modules/url';

let root, isClient;

export class Funclib {

  public version: string = 'V2.1.0'
  
  private deleteProp = prop => {
    delete this[prop];
    if (this['__proto__']) {
      delete this['__proto__'][prop];
    }
  }

  constructor() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      isClient = true;
      root = window;
      FN_CONF.serverMethods.forEach(prop => this.deleteProp(prop));
    } else if (typeof global !== 'undefined') {
      isClient = false;
      root = global;
      this.initFileSystem();
      this.initProgress();
      FN_CONF.clientMethods.forEach(prop => this.deleteProp(prop));
    }
    this.initTricks();
  }



  /**
   * [fn.isTypeOf] 检查值的类型，返回布尔值
   * @param value 
   * @param type ['arr'|'obj'|'fun'|string|string[]]
   */
  isTypeOf(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): boolean {
    return Type.isTypeOf.call(this, value, type);
  }

  /**
   * [fn.typeValue] 检查值的类型，true则返回该值，否则返回false
   * @param value 
   * @param type ['arr'|'obj'|'fun'|string|string[]]
   */
  typeValue(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): any {
    return Type.typeValue.call(this, value, type);
  }

  /**
   * [fn.array] 返回一个指定长度和默认值的数组
   * @param length [number]
   * @param value  [any, function]
   */
  array(length: number, value?: any): any[] {
    return Array_.array(length, value);
  }

  /**
   * [fn.toArray] 值数组化
   * @param src 
   */
  toArray(src: any): any[] {
    return Array_.toArray(src);
  }

  /**
   * [fn.sortByField] 对象数组根据字段排序
   * @param data
   * @param field
   * @param isDesc
   */
  sortByField(data: any, field: string, isDesc?: boolean): any {
    return Array_.sortByField(data, field, isDesc);
  }

  /**
   * [fn.len] 获取对象自有属性的个数
   * @arg obj [object]
   */
  len(obj: any): number {
    return Object_.len(obj);
  }

  /**
   * [fn.isEmpty] 判断对象是否为空对象或数组
   * @param obj 
   */
  isEmpty(obj: Object | any[]): boolean {
    return Object_.isEmpty(obj);
  }

  /**
   * [fn.overlay] 给对象赋值
   * @param target 
   * @param source 
   * @param propList 
   */
  overlay(target: Object, source: Object, propList?: string[]): void {
    return Object_.overlay(target, source, propList);
  }

  /**
   * [fn.deepCopy] 深拷贝对象或数组
   * @param data
   */
  deepCopy(data: any) {
    return Object_.deepCopy(data);
  }

  /**
   * [fn.pickProperty] 返回对象或子孙对象的属性，可判断类型
   * @param obj [Object]
   * @param layers [string]
   * @param type ['arr'|'obj'|'fun'|string|string[]]
   */
  pickProperty(obj: Object, layers: string, type?: 'arr'|'obj'|'fun'|string|string[]): any {
    return Object_.pickProperty.call(this, obj, layers, type);
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
   * [fn.rdid] 返回一个指定长度（最小4位）的随机ID
   * @param len 
   */
  rdid(len: number = 12): string {
    return Mathematic.rdid.call(this, len);
  }

  /**
   * [fn.rdcolor] 返回一个随机颜色色值
   */
  rdcolor() {
    return Mathematic.rdcolor();
  }

  /**
   * [fn.interval] 循环定时器
   * @param timerId
   * @param duration
   * @param callback
   */
  interval(timerId: string, duration: number | boolean, callback?: Function) {
    return Time.interval(timerId, duration, callback);
  }

  /**
   * [fn.timeout] 延时定时器
   * @param timerId 
   * @param duration 
   * @param callback 
   */
  timeout(timerId: string, duration?: number | boolean, callback?: Function) {
    return Time.timeout(timerId, duration, callback);
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
    return String_.encodeHtml(html);
  }

  /**
   * [fn.decodeHtml] 解码HTML字符串
   * @param html 
   */
  decodeHtml(html: string): string {
    return String_.decodeHtml(html);
  }

  /**
   * [fn.currency] 格式化显示货币
   * @param number
   * @param digit
   * @returns {string}
   */
  currency(number: number, digit: number = 2): string {
    return String_.currency(number, digit);
  }

  /**
   * [fn.cutString] 裁切字符串到指定长度
   * @param str
   * @param len
   * @returns {string}
   */
  cutString(str: string, len: number): string {
    return String_.cutString.call(this, str, len);
  }

  /**
   * [fn.getPattern] 与一个或几个通用正则匹配
   * @param type
   * @param isNoLimit
   * @returns {pattern|undefined}
   */
  getPattern(type: string, isNoLimit: boolean = false): any {
    return Pattern.getPattern(type, isNoLimit);
  }

  /**
   * [fn.matchPattern] 获取一个通用的正则表达式
   * @param src
   * @param type
   * @param isNoLimit
   * @returns {boolean}
   */
  matchPattern(src: string, type: string | string[], isNoLimit: boolean = false): boolean {
    return Pattern.matchPattern(src, type, isNoLimit);
  }

  /**
   * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
   * @param  delay        对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的
   * @param  noTrailing   默认为false，为true相当于debunce
   * @param  callback     延迟执行的回调，`this`上下文和所有参数都是按原样传递的
   * @param  debounceMode 如果`debounceMode`为true，`clear`在`delay`ms后执行，如果debounceMode是false，`callback`在`delay`ms之后执行
   */
  throttle(delay: number, noTrailing: any, callback?: any, debounceMode?: any): Function {
    return Function_.throttle(delay, noTrailing, callback, debounceMode);
  }

  /**
   * [fn.debounce] 防抖函数, 适用于获取用户输入
   * @param delay    对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的
   * @param atBegin  是否不需要延迟调用
   * @param callback 延迟执行的回调，`this`上下文和所有参数都是按原样传递的
   */
  debounce(delay: number, atBegin: boolean, callback?: Function): Function {
    return Function_.debounce(delay, atBegin, callback);
  }

  /**
   * [fn.getKeyCodeByName] 根据键名获取键码
   * @param keyName 
   */
  getKeyCodeByName(keyName: string): number {
    return Event_.getKeyCodeByName(keyName);
  }

  /**
   * [fn.getKeyNameByCode] 根据键码获取键名
   * @param keyName 
   */
  getKeyNameByCode(keyCode: number): string {
    return Event_.getKeyNameByCode(keyCode);
  }

  /**
   * [fn.parseQueryString] 解析Url参数成对象
   * @param url [string]  default: window.location.href
   */
  parseQueryString(url?: string): Object {
    return Url.parseQueryString(url);
  }

  /**
   * [fn.stringfyQueryString] 把对象编译成Url参数
   * @param obj [string]  default: window.location.href
   */
  stringfyQueryString(obj: Object): string {
    return Url.stringfyQueryString.call(this, obj);
  }

  /**
   * [fn.fullScreen] 全屏显示HTML元素
   * @param el
   * @returns {any}
   */
  fullScreen(el: any): any {
    return Element_.fullScreen(el);
  }

  /**
   * [fn.exitFullScreen] 退出全屏显示
   * @returns {any}
   */
  exitFullScreen(): any {
    return Element_.exitFullScreen();
  }

  /**
   * [fn.isFullScreen] 检测是否全屏状态
   * @returns {boolean}
   */
  isFullScreen(): boolean {
    return Element_.isFullScreen();
  }

  /**
   * [fn.pollingEl] 轮询获取异步出现的HTML元素
   * @param selector 选择器
   * @param timeout 超时时间
   * @param options {duration: number = 250; isSelectAll: boolean = false}
   * @param callback
   */
  pollingEl(selector: string|string[], timeout: number|boolean, options?: Object, callback?: Function): void {
    return Element_.pollingEl.call(this, selector, timeout, options, callback);
  }

  /**
   * [fn.noAutoComplete] 防止input密码自动填充
   * @param input [HTMLInputElement]
   * @param type ['username'|'password']
   */
  noAutoComplete(input: any, type: 'username'|'password'): void {
    return Element_.noAutoComplete(input, type);
  }

  /**
   * [fn.copyText] 复制文本到粘贴板
   * @param text [string]
   */
  copyText(text: string): void {
    return Element_.copyText(text);
  }

  /**
   * [fn.setCookie] 设置Cookie
   * @param name 
   * @param value 
   * @param days 
   */
  setCookie(name: string, value: string, days: number = 0) {
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
   * [fn.chalk] 在控制台打印有颜色的字符串
   * @param value 
   * @param color 
   */
  chalk(value: string, color?: 'grey' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'yellow') {
    return Loger.chalk(value, color);
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
   * 初始化NodeJs工具
   */
  private initFileSystem() {
    const tools = new FileSystem();
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
    this['wt'] = (file: string, text: string, flag: 'w' | 'a' = 'w') => tools.wt(file, text, flag);

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
    this['progress'] = {};
    /**
     * [fn.progress.start] 开启进度条，并传入参数
     * @param options {title: string, width: number (base: 40)}
     */
    this['progress']['start'] = (options: Object) => {
      return Progress.start.call(this, options);
    }

    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param onStopped 
     */
    this['progress']['stop'] = (onStopped: Function) => {
      return Progress.stop(onStopped);
    }
  }

  private initTricks() {
    if (isClient) {
      if (!Tricks.extendJquery()) {
        this['extendJquery'] = jquery => Tricks.extendJquery(jquery);
      }
    }
  }
}
