import { FnType } from './modules/_Type';
import { FnArray } from './modules/_Array';
import { FnObject } from './modules/_Object';
import { FnString } from './modules/_String';
import { FnTime } from './modules/_Time';
import { FnRegExp } from './modules/_RegExp';
import { FnMath } from './modules/_Math';
import { FnFunction } from './modules/_Function';
import { FnEvent } from './modules/_Event';
import { FnCookie } from './modules/_Cookie';
import { FnDom } from './modules/_Dom';
import { FnLoger } from './modules/_Loger';
import { FnFileSys } from './modules/_FileSys';
import { FnProgress } from './modules/_Progress';
import { FnTrick } from './modules/_Trick';
import { FnUrl } from './modules/_Url';
import { FN_CONF } from './configs/fnConf'

let root, isClient;

export class FuncLib {

  public version: string = 'v2.1.9'
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
    ['deleteProp', 'initTricks', 'initFileSystem', 'initProgress'].forEach(priMethod => {
      delete this[priMethod];
    });
  }

  /**
   * [fn.typeOf] 检查值的类型，返回布尔值
   * @param value 
   * @param type ['arr'|'obj'|'fun'|string|string[]]
   */
  typeOf(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): boolean {
    return FnType.typeOf.call(this, value, type);
  }

  /**
   * [fn.typeValue] 检查值的类型，true则返回该值，否则返回false
   * @param value 
   * @param type ['arr'|'obj'|'fun'|string|string[]]
   */
  typeValue(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): any {
    return FnType.typeValue.call(this, value, type);
  }

  /**
   * [fn.array] 返回一个指定长度和默认值的数组
   * @param length [number]
   * @param value  [any, function]
   */
  array(length: number, value?: any): any[] {
    return FnArray.array(length, value);
  }

  /**
   * [fn.toArray] 值数组化
   * @param src 
   */
  toArray(src: any): any[] {
    return FnArray.toArray(src);
  }

  /**
   * [fn.find] 根据条件寻找值
   * @param src 
   * @param predicate 
   */
  find(src: any[], predicate: any): any {
    return FnArray.find.call(this, src, predicate);
  }

  /**
   * [fn.filter] 根据条件取过滤值
   * @param src 
   * @param predicate 
   */
  filter(src: any[], predicate: any): any[] {
    return FnArray.filter.call(this, src, predicate);
  }

  /**
   * [fn.reject] 根据条件过滤值
   * @param src 
   * @param predicate 
   */
  reject(src: any[], predicate: any): any[] {
    return FnArray.reject.call(this, src, predicate);
  }

  /**
   * [fn.contains] 判断数组是否包含符合条件的值
   * @param src 
   * @param predicate 
   */
  contains(src: any[], predicate: any): boolean {
    return FnArray.contains.call(this, src, predicate);
  }

  /**
  * [fn.findIndex] 寻找值在数组中的索引
  * @param src 
  * @param predicate 
  */
  findIndex(src: any[], predicate: any): number {
    return FnArray.findIndex.call(this, src, predicate);
  }

  /**
   * [fn.sortBy] 对象数组根据字段排序
   * @param data
   * @param field
   * @param isDesc
   */
  sortBy(data: any, field: string, isDesc?: boolean): any {
    return FnArray.sortBy.call(this, data, field, isDesc);
  }

  /**
   * [fn.len] 获取对象自有属性的个数
   * @arg obj
   */
  len(obj: any): number {
    return FnObject.len(obj);
  }

  /**
   * [fn.forIn] 遍历对象的可数自有属性
   * @arg obj
   * @arg callback
   */
  forIn(obj: Object, callback: any): void {
    return FnObject.forIn(obj, callback);
  }

  /**
   * [fn.isEmpty] 判断对象是否为空对象或数组
   * @param obj 
   */
  isEmpty(obj: Object | Function | string | any[]): boolean {
    return FnObject.isEmpty(obj);
  }

  /**
   * [fn.overlay] 给对象赋值
   * @param target 
   * @param source 
   * @param propList 
   */
  overlay(target: Object, source: Object, propList?: string[]): any {
    return FnObject.overlay(target, source, propList);
  }

  /**
   * [fn.deepCopy] 深拷贝对象或数组
   * @param data
   */
  deepCopy(data: any) {
    return FnObject.deepCopy(data);
  }

  /**
   * [fn.get] 返回对象或子孙对象的属性，可判断类型
   * @param obj [Object]
   * @param layers [string]
   * @param type ['arr'|'obj'|'fun'|string|string[]]
   */
  get(obj: Object, layers: string, type?: 'arr' | 'obj' | 'fun' | string | string[]): any {
    return FnObject.get.call(this, obj, layers, type);
  }

  /**
   * [fn.random] 返回一个指定范围内的随机数
   * @param sta 
   * @param end 
   */
  random(sta: number, end?: number): number {
    return FnMath.random(sta, end);
  }

  /**
   * [fn.rdid] 返回一个指定长度（最小4位）的随机ID
   * @param len 
   */
  rdid(len: number = 12): string {
    return FnMath.rdid.call(this, len);
  }

  /**
   * [fn.rdcolor] 返回一个随机颜色色值
   */
  rdcolor() {
    return FnMath.rdcolor();
  }

  /**
   * [fn.interval] 循环定时器
   * @param timerId
   * @param duration
   * @param callback
   */
  interval(timerId: any, duration: any, callback?: Function) {
    return FnTime.interval(timerId, duration, callback);
  }

  /**
   * [fn.timeout] 延时定时器
   * @param timerId 
   * @param duration 
   * @param callback 
   */
  timeout(timerId: any, duration?: any, callback?: Function) {
    return FnTime.timeout(timerId, duration, callback);
  }

  /**
   * [fn.defer] 延迟执行函数
   * @param func 
   */
  defer(func: Function): void {
    return FnTime.defer(func);
  }

  /**
   * [fn.time] 返回一个当前时间戳
   * @param time 
   */
  time(time?: Date | string | number): number {
    return FnTime.time(time);
  }

  /**
   * [fn.fmtDate] 获取格式化的时间字符串
   * @param fmtStr 
   * @param time 
   */
  fmtDate(fmtStr: string, time?: Date | string | number): string {
    return FnTime.fmtDate(fmtStr, time);
  }

  /**
   * [fn.encodeHtml] 编码HTML字符串
   * @param html 
   */
  encodeHtml(html: string): string {
    return FnString.encodeHtml(html);
  }

  /**
   * [fn.decodeHtml] 解码HTML字符串
   * @param html 
   */
  decodeHtml(html: string): string {
    return FnString.decodeHtml(html);
  }

  /**
   * [fn.fmtCurrency] 格式化显示货币
   * @param number
   * @param digit
   * @returns {string}
   */
  fmtCurrency(number: number, digit: number = 2): string {
    return FnString.fmtCurrency(number, digit);
  }

  /**
   * [fn.cutString] 裁切字符串到指定长度
   * @param str
   * @param len
   * @returns {string}
   */
  cutString(str: string, len: number): string {
    return FnString.cutString.call(this, str, len);
  }

  /**
   * [fn.getPattern] 与一个或几个通用正则匹配
   * @param type
   * @param isNoLimit
   * @returns {pattern|undefined}
   */
  getPattern(type: string, isNoLimit: boolean = false): any {
    return FnRegExp.getPattern(type, isNoLimit);
  }

  /**
   * [fn.matchPattern] 获取一个通用的正则表达式
   * @param src
   * @param type
   * @param isNoLimit
   * @returns {boolean}
   */
  matchPattern(src: string, type: string | string[], isNoLimit: boolean = false): boolean {
    return FnRegExp.matchPattern(src, type, isNoLimit);
  }

  /**
   * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
   * @param  func
   * @param  wait
   * @param  options
   */
  throttle(func: Function, wait: number, options: { leading?: boolean, trailing?: boolean }) {
    return FnFunction.throttle.bind(this, func, wait, options);
  }

  /**
   * [fn.debounce] 防抖函数, 适用于获取用户输入
   * @param func
   * @param wait
   * @param immediate
   */
  debounce(func: Function, wait: number, immediate: boolean = false) {
    return FnFunction.debounce(func, wait, immediate);
  }

  /**
   * [fn.getKeyCodeByName] 根据键名获取键码
   * @param keyName 
   */
  getKeyCodeByName(keyName: string): number {
    return FnEvent.getKeyCodeByName(keyName);
  }

  /**
   * [fn.getKeyNameByCode] 根据键码获取键名
   * @param keyName 
   */
  getKeyNameByCode(keyCode: number): string {
    return FnEvent.getKeyNameByCode(keyCode);
  }

  /**
   * [fn.parseQueryString] 解析Url参数成对象
   * @param url [string]  default: window.location.href
   */
  parseQueryString(url?: string): Object {
    return FnUrl.parseQueryString(url);
  }

  /**
   * [fn.stringfyQueryString] 把对象编译成Url参数
   * @param obj [string]  default: window.location.href
   */
  stringfyQueryString(obj: Object): string {
    return FnUrl.stringfyQueryString.call(this, obj);
  }

  /**
   * [fn.fullScreen] 全屏显示HTML元素
   * @param el
   * @returns {any}
   */
  fullScreen(el: any): any {
    return FnDom.fullScreen(el);
  }

  /**
   * [fn.exitFullScreen] 退出全屏显示
   * @returns {any}
   */
  exitFullScreen(): any {
    return FnDom.exitFullScreen();
  }

  /**
   * [fn.isFullScreen] 检测是否全屏状态
   * @returns {boolean}
   */
  isFullScreen(): boolean {
    return FnDom.isFullScreen();
  }

  /**
   * [fn.fullScreenChange] 检测是否全屏状态
   * @param callback
   */
  fullScreenChange(callback?: boolean | any): void {
    return FnDom.fullScreenChange(callback);
  }

  /**
   * [fn.pollingEl] 轮询获取异步出现的HTML元素
   * @param selector 选择器
   * @param timeout 超时时间
   * @param options {duration: number = 250; isSelectAll: boolean = false}
   * @param callback
   */
  pollingEl(selector: string | string[], timeout: number | boolean, options?: Object, callback?: Function): void {
    return FnDom.pollingEl.call(this, selector, timeout, options, callback);
  }

  /**
   * [fn.noAutoComplete] 防止input密码自动填充
   * @param input [HTMLInputElement]
   * @param type ['username'|'password']
   */
  noAutoComplete(input: any, type: 'username' | 'password'): void {
    return FnDom.noAutoComplete(input, type);
  }

  /**
   * [fn.copyText] 复制文本到粘贴板
   * @param text [string]
   */
  copyText(text: string): void {
    return FnDom.copyText(text);
  }

  /**
   * [fn.setCookie] 设置Cookie
   * @param name 
   * @param value 
   * @param days 
   */
  setCookie(name: string, value: string, days: number = 0) {
    return FnCookie.setCookie(name, value, days);
  }

  /**
   * [fn.getCookie] 根据name读取cookie
   * @param  name 
   * @return {String}
   */
  getCookie(name: string): string {
    return FnCookie.getCookie(name);
  }

  /**
   * [fn.removeCookie] 根据name删除cookie
   * @param name 
   */
  removeCookie(name: string) {
    return FnCookie.removeCookie(name);
  }

  /**
   * [fn.chalk] 在控制台打印有颜色的字符串
   * @param value 
   * @param color 
   */
  chalk(value: string, color?: 'grey' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'yellow') {
    return FnLoger.chalk(value, color);
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
    return FnLoger.log.call(this, value, configs, isClient);
  }

  /**
   * 初始化NodeJs工具
   */
  private initFileSystem() {
    const tools = new FnFileSys();
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
      return FnProgress.start.call(this, options);
    }

    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param onStopped 
     */
    this['progress']['stop'] = (onStopped: Function) => {
      return FnProgress.stop(onStopped);
    }
  }

  private initTricks() {
    if (isClient) {
      if (!FnTrick.extendJquery()) {
        this['extendJquery'] = jquery => FnTrick.extendJquery(jquery);
      }
    }
  }
}
