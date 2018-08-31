import { FnType } from './_Type';
import { FnObject } from './_Object';
import { FnArray } from './_Array';
import { FnTime } from './_Time';

export class FnDom {
  /**
   * [fn.fullScreen] 全屏显示HTML元素
   * @param el
   * @returns {any}
   */
  public static fullScreen(el: any): any {
    const rfs = el['requestFullScreen']
      || el['webkitRequestFullScreen']
      || el['mozRequestFullScreen']
      || el['msRequestFullScreen'];
    if (rfs) return rfs.call(el);
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
    const cfs = document['cancelFullScreen']
      || document['webkitCancelFullScreen']
      || document['mozCancelFullScreen']
      || document['exitFullScreen'];
    if (cfs) return cfs.call(document);
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
    return document['fullscreenEnabled']
      || window['fullScreen']
      || document['mozFullscreenEnabled']
      || document['webkitIsFullScreen']
      || document['msIsFullScreen']
      || false;
  }

  /**
   * [fn.fullScreenChange] 检测是否全屏状态
   * @param callback
   */
  public static fullScreenChange(callback?: boolean | any): void {
    const e = 'fullscreenchange';
    const events = [e, `webkit${e}`, `moz${e}`, `MS${e}`];
    const eventHandler = (event, isAdd) => {
      const fullFunc = window['fullScreenFunc'];
      isAdd ? document.addEventListener(event, fullFunc)
        : document.removeEventListener(event, fullFunc);
    }
    if (window.addEventListener) {
      if (typeof callback === 'function') {
        this.fullScreenChange(false);
        window['fullScreenFunc'] = callback;
        events.forEach(e => eventHandler(e, true));
      } else if (window['fullScreenFunc']) {
        events.forEach(e => eventHandler(e, false));
      }
    }
  }

  /**
   * [fn.pollingEl] 轮询获取异步出现的HTML元素
   * @param selector 选择器
   * @param timeout 超时时间
   * @param options {duration: number = 250; isSelectAll: boolean = false}
   * @param callback
   */
  public static pollingEl(selector: string | string[], timeout: number | boolean, options?: Object, callback?: Function): void {
    if ((FnType.typeOf(selector, ['str', 'arr'])) && typeof timeout === 'number') {
      const duration = FnObject.get(options, 'duration', 'num') || 250;
      const isSelectAll = !!(options && options['isSelectAll']);
      callback = FnType.typeVal(callback, 'func') || FnType.typeVal(options, 'func');
      let count = 0;
      FnTime.interval(selector, duration, eles => {
        parseInt(String(timeout / duration), 10) > count
          ? count++ : FnTime.interval(selector, false);
        const tmpArr = [];
        const selectors: any = FnArray.toArray(selector);
        selectors.forEach(slt => {
          const elements = isSelectAll
            ? document.querySelectorAll(slt)
            : document.querySelector(slt);
          if (elements.length > 0) tmpArr.push(elements);
        });
        if (tmpArr.length === selectors.length) {
          FnTime.interval(selector, false);
          if (callback) callback(tmpArr);
        }
      });
    } else {
      FnTime.interval(selector, false);
    }
  }

  /**
   * [fn.noAutoComplete] 防止input密码自动填充
   * @param input [HTMLInputElement]
   * @param type ['username'|'password']
   */
  public static noAutoComplete(input: any, type: 'username' | 'password'): void {
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
        break;
    }
  }
}
