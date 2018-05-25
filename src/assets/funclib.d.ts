/**==============================================================
  通用型逻辑函数封装 funclib (V1.0.3)
  Github: http://github.com/CN-Tower/funclib.js
  ---------------------------------------------------------------
  fn.version                返回当前函数库版本
  fn.time                   返回当前时间戳
  fn.gnid                   返回指定长度(最小6位)的随机ID
  fn.array                  返回指定长度和默认值的数组
  fn.random                 返回指定范围的随机数
  fn.len                    获取对象自有属性的个数
  fn.deepCopy               深拷贝数组或对象
  fn.interval               循环定时器
  fn.timeout                延时定时器
  fn.sortData               对象数组根据字段排序
  fn.currency               格式化显示货币
  fn.cutString              裁切字符串到指定长度
  fn.overlay                给对象赋值，可指定字段
  fn.getPattern             获取一个通用的正则表达式
  fn.matchPattern           与一个或几个通用正则匹配
  fn.fullScreen             全屏显示一个HTML元素
  fn.log                    控制打印格式化值
  fn.exitFullScreen         退出全屏显示
  fn.checkIsFullScreen      检测是否处理全屏状态
  fn.setErrors              手动设定表单错误
  fn.tools.writeFile        NodeJs写文件
  fn.tools.deleteDirectory  NodeJs删除文件夹和文件
  fn.tools.copyFile         NodeJs复制文件
  fn.tools.copyDirectory    NodeJs复制文件夹和文件
  fn.progress.start         开启进度条，并传入参数
  fn.progress.stop          停止进度条，结束后触发回调
  fn.viewTools.show         提示信息和Loader工具
  fn.bootstrapTable.render  渲染Bootstrap表格
  $.pollingElement          jQuery获取异步出现的元素
  $.noAutoComplete          jQuery禁止input密码自动填充
  $.copyText                jQuery复制文本到粘贴板
  $ele.findCousin           jQuery获取元素表亲
  ===============================================================*/
declare var fn: fn.Funclib;
export = fn;
export as namespace fn;

interface Tools {
    /**
     * [fn.tools.writeFile] 写文件
     * @param dir
     * @param dist
     * @param flag ['w'|'a'] default: 'w'
     */
    writeFile(file: string, text: string, flag?: 'w' | 'a'): void;
    /**
     * [fn.tools.deleteDirectory] 删除文件夹和文件
     * @param dir
     * @param dist
     */
    deleteDirectory(dir: string): void;
    /**
     * [fn.tools.copyFile] 复制文件
     * @param dir
     * @param dist
     */
    copyFile(filePath: string, distPath: string): void;
    /**
     * [fn.tools.copyDirectory] 复制文件夹和文件
     * @param dir
     * @param dist
     */
    copyDirectory(dir: string, dist: string): void;
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

interface ViewTools {
    /**
     * [fn.viewTools.show]
     * @param options 
        * type {success|error|loader|timer},
        * isShow
        * msg
        * interval
        * delay
     */
    show(options: any): void;
}

interface BootstrapTable {
    /**
     * [fn.table.render] 渲染Bootstrap表格的通用方式
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
    render($table: any, options: any): void;
}

declare module fn {
    interface Funclib {
        /**
         * [fn.version] 返回当前库的版本信息
         */
        version: string;
        /**
         * [fn.tools] NodeJs工具包
         */
        tools: Tools;
        /**
         * [fn.progress] 进度条工具
         */
        progress: Progress;
        /**
         * [fn.viewTools] 返回小视图观察者对象
         */
        viewTools: ViewTools;
        /**
         * [fn.table] Bootstrap渲染工具
         */
        table: BootstrapTable;
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
        initViewTools(viewToolsCtrl: any): void;
        /**
         * [fn.initBootstrapTable] 初始化一个BootstrapTable对象
         * @param translate [Object]
         */
        initBootstrapTable(translate?: Object): void;
        /**
         * [fn.time] 返回一个当前时间字符串。
         */
        time(): Function;
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
         * [fn.random] 返回一个指定范围的随机数
         * @param sta [number]
         * @param end [number]
         */
        random(sta: number, end?: number): number;
        /**
         * [fn.len] 获取对象自有属性的个数
         * @arg obj [object]
         * */
        len(obj: any): number;
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
         * [fn.sortData] 对象数组根据字段排序
         * @param tableData
         * @param field
         * @param isDesc
         */
        sortData(tableData: any, field: string, isDesc?: boolean): any;
        /**
         * [fn.deepCopy] 深拷贝对象或数组
         * @param data
         */
        deepCopy(data: any): any;
        /**
         * [fn.currency] 格式化显示货币
         * @param number
         * @param digit
         * @returns {string}
         */
        currency(number: number, digit?: number): any;
        /**
         * [fn.cutString] Format string width length
         * @param str
         * @param len
         * @returns {string}
         */
        cutString(str: number, len: number): string;
        /**
         * [fn.overlay] 给对象赋值
         * @param target 
         * @param source 
         * @param propList 
         */
        overlay(target: Object, source: Object, propList?: string[]): void;
        /**
         * [fn.matchPattern] 与一个或几个通用正则匹配
         * @param src
         * @param type
         * @param isNoLimit
         * @returns {boolean}
         */
        matchPattern(src: string, type: string | string[], isNoLimit?: boolean): boolean;
        /**
         * [fn.getPattern] 获取一个通用的正则表达式
         * @param type
         * @param isNoLimit
         * @returns {pattern|undefined}
         */
        getPattern(type: string, isNoLimit?: boolean): any;
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
         * [fn.setErrors] 手动设定表单错误
         * @param model 
         * @param errorMsg 
         * @param isForce 
         */
        setErrors(model: any, errorMsg: string, isForce?: boolean)
    }
}
