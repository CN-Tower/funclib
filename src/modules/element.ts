export class Element_ {
    private static isTypeOf: Function;
    private static typeValue: Function;
    private static pickProperty: Function;
    private static interval: Function;
    private static toArray: Function;
    /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el
     * @returns {any}
     */
    public static fullScreen(el: any): any {
        const rfs = el['requestFullScreen'] || el['webkitRequestFullScreen']
            || el['mozRequestFullScreen'] || el['msRequestFullScreen'];
        if (rfs) {
            return rfs.call(el);
        }
        if (window['ActiveXObject']) {
            const ws = new window['ActiveXObject']("WScript.Shell");
            if (ws) { ws.SendKeys("{F11}"); }
        }
    }

    /**
     * [fn.exitFullScreen] 退出全屏显示
     * @returns {any}
     */
    public static exitFullScreen(): any {
        const cfs = document['cancelFullScreen'] || document['webkitCancelFullScreen']
            || document['mozCancelFullScreen'] || document['exitFullScreen'];
        if (cfs) {
            return cfs.call(document);
        }
        if (window['ActiveXObject']) {
            const ws = new window['ActiveXObject']("WScript.Shell");
            if (ws != null) { ws.SendKeys("{F11}"); }
        }
    }

    /**
     * [fn.isFullScreen] 检测是否全屏状态
     * @returns {boolean}
     */
    public static isFullScreen(): boolean {
        return !!document['fullscreenEnabled'] || document['fullScreen']
            || document['webkitIsFullScreen'] || document['msFullscreenEnabled'] || false;
    }

    /**
     * [fn.pollingEl] 轮询获取异步出现的HTML元素
     * @param selector 选择器
     * @param timeout 超时时间
     * @param options {duration: number = 250; isSelectAll: boolean = false}
     * @param callback
     */
    public static pollingEl(selector: string|string[], timeout: number|boolean, options?: Object, callback?: Function): void {
        if ((this.isTypeOf(selector, ['str', 'arr'])) && typeof timeout === 'number') {
            const duration = this.pickProperty(options, 'duration', 'num') || 250;
            const isSelectAll = !!(options && options['isSelectAll']);
            callback = this.typeValue(callback, 'func') || this.typeValue(options, 'func');
            let count = 0;
            this.interval(selector, duration, eles => {
                parseInt(String(timeout / duration), 10) <= count ? this.interval(selector, false) : count++;
                const tmpArr = [];
                const selectors: any = this.toArray(selector);
                selectors.forEach(slt => {
                    const elements = isSelectAll ? document.querySelectorAll(slt) : document.querySelector(slt);
                    if (elements.length > 0) {
                        tmpArr.push(elements);
                    }
                });
                if (tmpArr.length === selectors.length) {
                    this.interval(selector, false);
                    if (callback) {
                        callback(tmpArr);
                    }
                }
            });
        } else {
            this.interval(selector, false);
        }
    }

    /**
     * [fn.noAutoComplete] 防止input密码自动填充
     * @param input [HTMLInputElement]
     * @param type ['username'|'password']
     */
    public static noAutoComplete(input: any, type: 'username'|'password'): void {
        switch (type) {
            case 'username':
                input.setAttribute('autocomplete', 'off');
                const ipt = document.createElement('input');
                ipt.setAttribute('type', 'password');
                ipt.style.display = 'none';
                input.parentNode.insertBefore(ipt, input);
                break;
            case 'password':
                input.setAttribute('autocomplete', 'new-password');
                input.setAttribute('type', 'text');
                input.oninput = function() {
                    this.value ? this.setAttribute('type', 'password') : this.setAttribute('type', 'text');
                }
                break;
        }
    }

    /**
     * [fn.copyText] 复制文本到粘贴板
     * @param text [string]
     */
    public static copyText(text: string = ''): void {
        let textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.left = '200%';
        document.body.appendChild(textarea)
        textarea.value = text;
        textarea.select();
        document.execCommand('Copy');
        document.body.removeChild(textarea);
    }
}