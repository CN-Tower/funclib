/**==============================================================
 * funclib.js
 * Document: http://funclib.net 
 * Github: http://github.com/CN-Tower/funclib.js
 ----------------------------------------------------------------
 ## Type
 * fn.typeOf                 检查值的类型，返回布尔值
 * fn.typeVal                检查值的类型，是则返回该值，否则返回false
 ## Array      
 * fn.array                  返回指定长度和默认值的数组
 * fn.toArray                值数组化
 * fn.find                   根据条件寻找值
 * fn.filter                 根据条件取过滤值
 * fn.reject                 根据条件过滤值
 * fn.contains               判断数组是否包含符合条件的值
 * fn.drop                   去掉Boolean()后为false和空数组或对象的值
 * fn.flatten                把有结构的数组打散，减少层数
 * fn.pluck                  把结构中的字段取出合并到一个数组中
 * fn.uniq                   去重或根据字段去重
 * fn.indexOf                寻找值在数组中的索引
 * fn.forEach                遍历数组或类数组
 * fn.sortBy                 返回对象数组根据字段排序后的副本
 ## Object     
 * fn.len                    获取对象自有属性的个数
 * fn.has                    判断对象是否存在某自有属性
 * fn.forIn                  遍历对象的可数自有属性
 * fn.isEmpty                判断对象是否为空对象或数组
 * fn.overlay                给对象赋值，可指定字段
 * fn.deepCopy               深拷贝数组或对象
 * fn.isDeepEqual            判断数组或对象是否相等
 * fn.get                    返回对象或子孙对象的属性，可判断类型
 ## Math
 * fn.random                 返回指定范围的随机数
 * fn.rdid                   返回指定长度的随机ID
 * fn.rdcolor                返回一个随机色值
 ## Time       
 * fn.interval               循环定时器
 * fn.timeout                延时定时器
 * fn.defer                  延迟执行函数
 * fn.time                   返回一个当前时间戳
 * fn.fmtDate                获取格式化的时间字符串
 ## String     
 * fn.encodeHtml             编码HTML字符串
 * fn.decodeHtml             解码HTML字符串
 * fn.capitalize             字符串首字母大写
 * fn.fmtCurrency            格式化显示货币
 * fn.cutString              裁切字符串到指定长度
 ## RegExp     
 * fn.getPattern             获取一个通用的正则表达式
 * fn.matchPattern           与一个或几个通用正则匹配
 ## Function
 * fn.throttle               节流函数
 * fn.debounce               防抖函数
 ## Url
 * fn.parseQueryString       解析Url参数成对象
 * fn.stringifyQueryString   把对象编译成Url参数
 ## Loger
 * fn.chalk                  返回带颜色的字符串
 * fn.log                    控制打印格式化值
 ## Element        
 * fn.fullScreen             全屏显示一个HTML元素
 * fn.exitFullScreen         退出全屏显示
 * fn.checkIsFullScreen      检测是否处理全屏状态
 * fn.fullScreenChange       检测是否全屏状态
 * fn.pollingEl              轮询获取异步出现的HTML元素
 * fn.noAutoComplete         防止input密码自动填充
 ## Cookie
 * fn.setCookie              设置Cookie
 * fn.getCookie              根据name读取cookie
 * fn.removeCookie           根据name删除cookie
 ## Tricks
 * fn.copyText               复制文本到粘贴板
 ## Tools      
 * fn.rd                     NodeJs读文件
 * fn.wt                     NodeJs写文件
 * fn.cp                     NodeJs复制文件夹和文件
 * fn.mv                     NodeJs移动文件夹和文件
 * fn.rm                     NodeJs删除文件夹和文件
 * fn.mk                     NodeJs创建文件夹
 ## Progress      
 * fn.progress.start         开启进度，并传入参数
 * fn.progress.stop          停止进度，结束后触发回调
 ## Version
 * fn.version                返回当前函数库版本
 ================================================================*/
declare var fn: Funclib;
export = fn;
export as namespace fn;

interface Progress {
    /**
     * [fn.progress.start] 开启进度，并传入参数
     * @param title
     * @param options {title?: string, width?: number = 40, type?: 'bar'|'spi' = 'bar'}
     */
    start(title: string, options?: any): void;
    /**
     * [fn.progress.stop] 结束进度，结束后触发回调
     * @param onStopped 
     */
    stop(onStopped?: Function): void;
}

interface Funclib {
    /**
     * [fn.typeOf] 检查值的类型，返回布尔值
     * @param value 
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    typeOf(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): boolean;
    /**
     * [fn.typeVal] 检查值的类型，true则返回该值，否则返回false
     * @param value 
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    typeVal(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): any;
    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param length [number]
     * @param value  [any, function]
     */
    array(length: number, value?: any): any[];
    /**
     * [fn.toArray] 值数组化
     * @param src 
     */
    toArray(src: any): any[];
    /**
     * [fn.find] 根据条件寻找值
     * @param src 
     * @param predicate 
     */
    find(src: any[], predicate: any): any;
    /**
     * [fn.filter] 根据条件取过滤值
     * @param src 
     * @param predicate 
     */
    filter(src: any[], predicate: any): any[];
    /**
     * [fn.reject] 根据条件过滤值
     * @param src 
     * @param predicate 
     */
    reject(src: any[], predicate: any): any[];
    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param src 
     * @param predicate 
     */
    contains(src: any[], predicate: any): boolean;
    /**
     * [fn.drop] 去掉Boolean()后为false和空数组或对象的值
     * @param srcArr 
     * @param isDrop0 
     */
    drop(srcArr: any[], isDrop0?: boolean): any[];
    /**
     * [fn.flatten] 把有结构的数组打散，减少层数
     * @param srcArr 
     * @param isDeep 
     */
    flatten(srcArr: any[], isDeep?: boolean): any[];
    /**
     * [fn.pluck] 把结构中的字段取出合并到一个数组中
     * @param obj 
     * @param path 
     * @param isUniq 
     */
    pluck(srcArr: any, path: string): any[];
    /**
     * [fn.uniq] 去重或根据字段去重
     * @param srcArr : any[]
     * @param path?  : string
     * @param isDeep : boolean = true
     */
    uniq(srcArr: any[], path?: string, isDeep?: boolean): any[];
    /**
    * [fn.indexOf] 寻找值在数组中的索引
    * @param src 
    * @param predicate 
    */
    indexOf(src: any[], predicate: any): number;
    /**
     * [fn.forEach] 遍历数组或类数组
     * @param obj
     * @param iteratee
     */
    forEach(obj: any, iteratee: any): any;
    /**
     * [fn.sortBy] 对象数组根据字段排序
     * @param tableData
     * @param field
     * @param isDesc
     */
    sortBy(tableData: any, field: string, isDesc?: boolean): any;
    /**
     * [fn.len] 获取对象自有属性的个数
     * @param obj [object]
     */
    len(obj: any): number;
    /**
     * [fn.has] 判断对象是否存在某自有属性
     * @param obj 
     * @param property 
     */
    has(obj: any, property: string): boolean;
    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @param obj
     * @param iteratee
     */
    forIn(obj: any, iteratee: any): void;
    /**
     * [fn.overlay] 给对象赋值
     * @param target 
     * @param source 
     * @param propList 
     */
    overlay(target: Object, source: Object, propList?: string[]): void;
    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param data
     */
    deepCopy(data: any): any;
    /**
     * [fn.isDeepEqual] 判断数组或对象是否相等
     * @param obj1 
     * @param obj2 
     */
    isDeepEqual(obj1: any, obj2: any): boolean;
    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param obj [Object]
     * @param chain [string]
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    get(obj: Object, chain: string, type?: 'arr' | 'obj' | 'fun' | string | string[]): any;
    /**
     * [fn.random] 返回一个指定范围的随机数
     * @param sta [number]
     * @param end [number]
     */
    random(sta: number, end?: number): number;
    /**
     * [fn.rdid] 返回一个指定长度(最小4位，默认12位)的随机ID。
     * @param len [number]
     */
    rdid(len?: number): string;
    /**
     * [fn.rdcolor] 返回一个随机色值
     */
    rdcolor(): string;
    /**
     * [fn.interval] 循环定时器
     * @param timerId
     * @param duration
     * @param callback
     */
    interval(timerId: any, duration: any, callback?: Function): any;
    /**
     * [fn.timeout] 延时定时器
     * @param timerId
     * @param duration
     * @param callback
     */
    timeout(timerId: any, duration?: any, callback?: Function): any;
    /**
     * [fn.defer] 延迟执行函数
     * @param func 
     */
    defer(func: Function): void;
    /**
     * [fn.time] 返回一个当前时间戳
     */
    time(time?: Date | string | number): number;
    /**
     * [fn.fmtDate] 获取格式化的时间字符串
     * @param fmtStr 
     * @param time 
     */
    fmtDate(fmtStr: string, time?: Date | string | number): string;
    /**
     * [fn.encodeHtml] 编码HTML字符串
     * @param html 
     */
    encodeHtml(html: string): string;
    /**
     * [fn.decodeHtml] 解码HTML字符串
     * @param html 
     */
    decodeHtml(html: string): string;
    /**
     * [fn.capitalize] 字符串首字母大写
     * @param str 
     */
    capitalize(str: string): string;
    /**
     * [fn.fmtCurrency] 格式化显示货币
     * @param number
     * @param digit
     * @returns {string}
     */
    fmtCurrency(number: number, digit?: number): any;
    /**
     * [fn.cutString] 裁切字符串到指定长度
     * @param str
     * @param len
     * @returns {string}
     */
    cutString(str: number, len: number): string;
    /**
     * [fn.getPattern] 获取一个通用的正则表达式
     * @param type
     * @param isNoLimit
     * @returns {pattern|undefined}
     */
    getPattern(type: string, isNoLimit?: boolean): any;
    /**
     * [fn.matchPattern] 与一个或几个通用正则匹配
     * @param src
     * @param type
     * @param isNoLimit
     * @returns {boolean}
     */
    matchPattern(src: string, type: string | string[], isNoLimit?: boolean): boolean;
    /**
     * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
     * @param  func
     * @param  wait
     * @param  options
     */
    throttle(func: Function, wait: number, options?: { leading?: boolean, trailing?: boolean }): Funclib;
    /**
     * [fn.debounce] 防抖函数, 适用于获取用户输入
     * @param func
     * @param wait
     * @param immediate
     */
    debounce(func: Function, wait: number, immediate?: boolean): Function;
    /**
     * [fn.parseQueryString] 解析Url参数成对象
     * @param url [string]  default: window.location.href
     */
    parseQueryString(url?: string): Object;
    /**
     * [fn.stringifyQueryString] 把对象编译成Url参数
     * @param obj [string]  default: window.location.href
     */
    stringifyQueryString(obj: Object): string;
    /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el
     * @returns {any}
     */
    fullScreen(el: any): void;
    /**
     * [fn.exitFullScreen] 退出全屏显示
     * @returns {any}
     */
    exitFullScreen(): void;
    /**
     * [fn.isFullScreen] 检测是否全屏状态
     * @returns {boolean}
     */
    isFullScreen(): boolean;
    /**
     * [fn.fullScreenChange] 检测是否全屏状态
     * @param callback
     */
    fullScreenChange(callback?: boolean | any): void;
    /**
     * [fn.pollingEl] 轮询获取异步出现的HTML元素
     * @param selector 选择器
     * @param timeout 超时时间
     * @param options {duration: number = 250; isSelectAll: boolean = false}
     * @param callback
     */
    pollingEl(selector: string | string[], timeout: number | boolean, options?: Object, callback?: Function): void;
    /**
     * [fn.noAutoComplete] 防止input密码自动填充
     * @param input [HTMLInputElement]
     * @param type ['username'|'password']
     */
    noAutoComplete(input: any, type: 'username' | 'password'): void;
    /**
     * [fn.setCookie] 设置Cookie
     * @param name 
     * @param value 
     * @param days 
     */
    setCookie(name: string, value: string, days?: number): void;
    /**
     * [fn.getCookie] 根据name读取cookie
     * @param  name 
     * @return {String}
     */
    getCookie(name: string): string;
    /**
     * [fn.removeCookie] 根据name删除cookie
     * @param name 
     */
    removeCookie(name: string): void;
    /**
     * [fn.copyText] 复制文本到粘贴板
     * @param text [string]
     */
    copyText(text: string): void;
    /**
      * [fn.chalk] 返回带颜色的字符串
      * @param value 
      * @param color 
      */
    chalk(value: string, color?: 'grey' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'yellow'): string;
    /**
     * [fn.log] 控制台格式化打印值
     * @param value 
     * @param configs 
     * {title: string, width: number [20-100], isFmt: boolean
     * pre: boolean = false, end: boolean = false
     * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
     * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
     * @param isFmt 
     */
    log(value: any, configs?: Object | string, isFmt?: boolean): void;
    /**
     * [fn.rd] 读文件
     * @param file
     */
    rd(file: string): string;
    /**
     * [fn.wt] 写文件
     * @param file
     * @param text
     * @param flag ['w'|'a'] default: 'w'
     */
    wt(file: string, text: string, flag?: 'w' | 'a'): void;
    /**
     * [fn.cp] 复制文件或文件夹
     * @param src
     * @param dist
     */
    cp(src: string, dist: string): void;
    /**
     * [fn.mv] 移动文件或文件夹
     * @param src
     * @param dist
     */
    mv(src: string, dist: string): void;
    /**
     * [fn.rm] 删除文件或文件夹
     * @param src
     */
    rm(src: string): void;
    /**
     * [fn.mk] 创建文件夹
     * @param dist
     */
    mk(dist: string): void;
    /**
     * [fn.progress] 进度工具
     */
    progress: Progress;
}
