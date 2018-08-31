import { FnTime } from './_Time';

export class FnFunction {
  /**
   * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
   * @param  func
   * @param  wait
   * @param  options
   */
  public static throttle(func: Function, wait: number, options: { leading?: boolean, trailing?: boolean }) {
    let timeout, context, args, result;
    let previous = 0;
    if (!options) options = {};
    const throttled: any = function () {
      const now = FnTime.time();
      if (!previous && options.leading === false) previous = now;
      const remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
      else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(function () {
          previous = options.leading === false ? 0 : FnTime.time();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }, remaining);
      }
      return result;
    };

    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };
    return throttled;
  }

  /**
   * [fn.debounce] 防抖函数, 适用于获取用户输入
   * @param func
   * @param wait
   * @param immediate
   */
  public static debounce(func: Function, wait: number, immediate: boolean = false) {
    let timeout, result;
    const later = function (context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };
    const delay = function (func, wait, ...args) {
      return setTimeout(function () {
        return func.apply(null, args);
      }, wait);
    }
    const debounced: any = function (...args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = delay(later, wait, this, args);
      }
      return result;
    };

    debounced.cancel = function () {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  }
}
