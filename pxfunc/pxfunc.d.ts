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
        fn.currency               裁切字符串到指定长度
        fn.findCousin             用jQuery寻找元素的表亲
        fn.matchPattern           与一个或几个通用正则匹配
        fn.getPattern             获取一个通用的正则表达式
        fn.pollingEl              用jQuery定时寻找一个异步渲染的元素
=========================================================================*/
declare var fn: fn.PxFunc;
export = fn;
export as namespace fn;

declare module fn {
    interface PxFunc {
        translate: any;
        viewToolsCtrl: any;
        patterns: any;
        gridOptions: any;
        /**
         * [fn.init] Init PxFunc
         * @param translate
         * @param viewToolsCtrl
         */
        init(translate: any, viewToolsCtrl: any): any;

        /**
         * fn.time: 返回一个当前时间字符串。
         */
        time(): Function;

        /**
         * fn.uuid: 返回一个指定长度(最小6位，默认12位)的随机ID。
         * @param len [number]
         */
        uuid(len?: number): string;

        /**
         * fn.array: 返回一个指定长度和默认值的数组
         * @param length [number]
         * @param value  [any, function, default='']
         */
        array(length: number, value?: any): any[];

        /**
         * fn.random: 返回一个指定范围的随机数
         * @param sta [number]
         * @param end [number]
         */
        random(sta: number, end?: number): number;

        /**
         * fn.objLen: 获取对象自有属性的个数
         * @arg obj [object]
         * */
        objLen(obj: any): number;

        /**
         * [fn.polling] Polling process service
         * @param name
         * @param interval
         * @param fn
         */
        polling(name: string, interval: number | boolean, fn?: Function): void;

        /**
         * [fn.errors] Set form control's error
         * @param model
         * @param errorMsg
         * @param isForce
         */
        setErrors(model: any, errorMsg: string, isForce?: boolean): void;

        /**
         * [fn.viewTools] Toggle to show some global View Tools, i.e.: infoMsg, errMsg and loader.
         * @param options
            * type {success|error|loader|timer},
            * isShow
            * msg
            * interval
            * delay
         */
        viewTools(options: any): void;

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
        bootstrapTable($table: any, options: any): void;

        /**
         * [fn.sortData] Sort table data by field
         * @param tableData
         * @param field
         * @param isDesc
         */
        sortData(tableData: any, field: string, isDesc?: boolean): any;

        /**
         * [fn.copy] Deep clone an Array or an Object
         * @param data
         */
        copy(data: any): any;

        /**
         * [fn.currency] Format Currency
         * @param number
         * @param digit
         * @returns {string}
         */
        fmtCurrency(number: number, digit?: number): any;

        /**
         * [fn.currency] Format string width length
         * @param str
         * @param len
         * @returns {string}
         */
        currency(str: string, len: number): string;

        /**
         * [fn.findCousin] Find the cousin(s) of jQuery element
         * @param $ele
         * @param selector
         * @param level
         * @returns {any}
         */
        findCousin($ele: any, selector: string, level?: number): any;

        /**
         * [fn.matchPattern] Match common RegExp patterns
         * @param src
         * @param type
         * @param isNoLimit
         * @returns {boolean}
         */
        matchPattern(src: string, type: string | string[], isNoLimit?: boolean): boolean;

        /**
         * [fn.getPattern] Get a common RegExp pattern
         * @param type
         * @param isNoLimit
         * @returns {pattern|undefined}
         */
        getPattern(type: string, isNoLimit?: boolean): any;

        /**
         * [fn.pollingEl] Polling until got jQuery element
         * @param poId
         * @param selector
         * @param interval
         * @param fn {opt.}
         */
        pollingEl(poId: string, selector: string | any[] | boolean, interval: number, fn?: Function): void;
    }
}
