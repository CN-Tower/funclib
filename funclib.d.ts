/**==============================================================
 * 通用型逻辑函数封装 funclib (V1.0.5)
 * Github: http://github.com/CN-Tower/funclib.js
 * Gitlab: http://gitlab.zte.com.cn/CN-Tower/funclib.js.git
 ----------------------------------------------------------------
 * fn.version                返回当前函数库版本
 Array      _____________________________________________________
 * fn.array                  返回指定长度和默认值的数组
 * fn.toArray                值数组化
 * fn.sortByField            对象数组根据字段排序
 Object     _____________________________________________________
 * fn.len                    获取对象自有属性的个数
 * fn.isEmpty                判断对象是否为空对象或数组
 * fn.overlay                给对象赋值，可指定字段
 * fn.deepCopy               深拷贝数组或对象
 Mathematic _____________________________________________________
 * fn.randomId               返回指定长度(最小6位)的随机ID
 * fn.randomNum              返回指定范围的随机数
 * fn.randomColor            返回一个随机色值
 Time       _____________________________________________________
 * fn.interval               循环定时器
 * fn.timeout                延时定时器
 * fn.timeStamp              返回一个当前时间戳
 * fn.fmtDate                获取格式化的时间字符串
 String     _____________________________________________________
 * fn.encodeHtml             编码HTML字符串
 * fn.decodeHtml             解码HTML字符串
 * fn.currency               格式化显示货币
 * fn.cutString              裁切字符串到指定长度
 RegExp     _____________________________________________________
 * fn.getPattern             获取一个通用的正则表达式
 * fn.matchPattern           与一个或几个通用正则匹配
 Events     _____________________________________________________
 * fn.getKeyCodeByName       根据键名获取键码
 * fn.getKeyNameByCode       根据键码获取键名
 Dom        _____________________________________________________
 * fn.fullScreen             全屏显示一个HTML元素
 * fn.exitFullScreen         退出全屏显示
 * fn.checkIsFullScreen      检测是否处理全屏状态
 Cookie     _____________________________________________________
 * fn.setCookie              设置Cookie
 * fn.getCookie              根据name读取cookie
 * fn.removeCookie           根据name删除cookie
 Loger      _____________________________________________________
 * fn.log                    控制打印格式化值
 Tools      _____________________________________________________
 * fn.initTools              初始化一个NodeJs工具包对象
 * fn.writeFile              NodeJs写文件
 * fn.deleteDirectory        NodeJs删除文件夹和文件
 * fn.copyFile               NodeJs复制文件
 * fn.copyDirectory          NodeJs复制文件夹和文件
 Tools      _____________________________________________________
 * fn.initProgress           初始化进度条对象
 * fn.progress.start         开启进度条，并传入参数
 * fn.progress.stop          停止进度条，结束后触发回调
 Tools      _____________________________________________________
 * $.pollingElement          jQuery获取异步出现的元素
 * $.noAutoComplete          jQuery禁止input密码自动填充
 * $.copyText                jQuery复制文本到粘贴板
 * $ele.findCousin           jQuery获取元素表亲
 ================================================================*/
declare var fn: fn.Funclib;
export = fn;
export as namespace fn;

interface Tools {
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
     * [fn.mkdir] 复制文件夹和文件
     * @param dist
     */
    mkdir(dist: string): void;
}

interface Progress {
    /**
     * [fn.progress.start] 开启进度条，并传入参数
     * @param options {title: string, width: number (base: 40)}
     */
    start(options: any): void;
    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param options 
     */
    stop(onStopped: Function): void;
}

declare module fn {
    interface Funclib {
        /**
         * [fn.version] 返回当前库的版本信息
         */
        version: string;
        initViewTools(viewToolsCtrl: any): void;
        /**
         * [fn.initBootstrapTable] 初始化一个BootstrapTable对象
         * @param translate [Object]
         */
        initBootstrapTable(translate?: Object): void;
        /**
         * [fn.pxid] 返回一个指定长度(最小6位，默认12位)的随机ID。
         * @param len [number]
         */
        gnid(len?: number): string;
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
         * [fn.random] 返回一个指定范围的随机数或随机色值
         * @param sta [number]
         * @param end [number]
         * @returns {number|string}
         */
        random(sta: number, end?: number): number;
        /**
         * [fn.length] 获取对象自有属性的个数
         * @arg obj [object]
         */
        length(obj: any): number;
        /**
         * [fn.isEmpty] 判断对象是否为空对象或数组
         * @param obj 
         */
        isEmpty(obj: Object|any[]): boolean;
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
         * [fn.sortData] 对象数组根据字段排序
         * @param tableData
         * @param field
         * @param isDesc
         */
        sortData(tableData: any, field: string, isDesc?: boolean): any;
        /**
         * [fn.interval] 循环定时器
         * @param timerId
         * @param duration
         * @param func
         */
        interval(timerId: string, duration: number | boolean, func?: Function): void;
        /**
         * [fn.timeout] 延时定时器
         * @param timerId
         * @param duration
         * @param func
         */
        timeout(timerId: string, duration: number | boolean, func?: Function): void;
        /**
         * [fn.currency] 格式化显示货币
         * @param number
         * @param digit
         * @returns {string}
         */
        currency(number: number, digit?: number): any;
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
         * [fn.fmtDate] 获取格式化的时间字符串
         * @param fmtStr 
         * @param time 
         */
        fmtDate(fmtStr: string, time?: any): string;
        /**
         * [fn.timeStamp] 返回一个当前时间戳
         */
        timeStamp(date?: Date|string): number;
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
         * [fn.getKeyCodeByName] 根据键名获取键码
         * @param keyName 
         */
        getKeyCodeByName(keyName: string): number;
        /**
         * [fn.getKeyCodeByName] 根据键码获取键名
         * @param keyName 
         */
        getKeyNameByCode(keyCode: number): string;
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
         * [fn.checkIsFullScreen] 检测是否全屏状态
         * @returns {boolean}
         */
        checkIsFullScreen(): boolean;
        /**
         * [fn.setCookie] 设置Cookie
         * @param name 
         * @param value 
         * @param days 
         */
        setCookie(name: string, value: string, days: number): void;
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
         * [fn.log] 控制台打印
         * @param value 
         * @param configs {
         * title: string,
         * lineLen: number [20-100]
         * part: 'pre'|'end' (opt.)
         * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
         */
        log(value: any, configs: Object): void;

        /**
         * [fn.initTools] 初始化一个NodeJs工具包对象
         * @param options [Object]
         */
        initTools(options: Object): void;
        /**
         * [fn.initProgress] 初始化进度条对象
         * @param ProgressBar [class]
         */
        initProgress(ProgressBar: any): void;
        /**
         * [fn.initViewTools] 初始化提示和Loader
         * @param initViewTools [class]
         */
    }
}
