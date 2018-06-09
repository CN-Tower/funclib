export class Function_ {
    /**
     * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
     * @param  delay        对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的
     * @param  noTrailing   默认为false，为true相当于debunce
     * @param  callback     延迟执行的回调，`this`上下文和所有参数都是按原样传递的
     * @param  debounceMode 如果`debounceMode`为true，`clear`在`delay`ms后执行，如果debounceMode是false，`callback`在`delay`ms之后执行
     */
    public static throttle(delay: number, noTrailing: any, callback?: any, debounceMode?: any) {
        let timeoutID;
        let lastExec = 0;
        if (typeof noTrailing !== 'boolean') {
            debounceMode = callback;
            callback = noTrailing;
            noTrailing = undefined;
        }
        return function () {
            const that = this;
            const elapsed = Number(new Date()) - lastExec;
            const args = arguments;
            const exec =() => {
                lastExec = Number(new Date());
                callback.apply(that, args);
            }
            const clear = () => {
                timeoutID = undefined;
            }
            if (debounceMode && !timeoutID) {
                exec();
            }
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
            if (debounceMode === undefined && elapsed > delay) {
                exec();
            } else if (noTrailing !== true) {
                timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
            }
        };
    }

    /**
     * [fn.debounce] 防抖函数, 适用于获取用户输入
     * @param delay    对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的
     * @param atBegin  是否不需要延迟调用
     * @param callback 延迟执行的回调，`this`上下文和所有参数都是按原样传递的
     */
    public static debounce(delay: number, atBegin: boolean, callback?: Function) {
        if (typeof atBegin !== 'boolean') {
            callback = atBegin;
            atBegin = undefined;
            return this.throttle(delay, callback, false);
        } else {
            return this.throttle(delay, callback, atBegin !== false);
        }
    }
}