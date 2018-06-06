export class Dom {
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
     * [fn.checkIsFullScreen] 检测是否全屏状态
     * @returns {boolean}
     */
    public static checkIsFullScreen(): boolean {
        return !! document['fullscreenEnabled'] || document['fullScreen']
            || document['webkitIsFullScreen'] || document['msFullscreenEnabled'] || false;
    }
}