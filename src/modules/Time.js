import { FnType } from './_Type';
import { FnObject } from './_Object';

const intervalTimers: any = {};
const timeoutTimers: any = {};

export class FnTime {
  /**
   * [fn.interval] 循环定时器
   * @param timerId
   * @param duration
   * @param callback
   */
  public static interval(timerId?: string, duration?: any, callback?: any) {
  
    const isIdStr = FnType.typeVal(timerId, 'str');
  
    if (isIdStr && duration === undefined) return intervalTimers[timerId];
    if (isIdStr && [null, false, 'clear'].indexOf(duration) > -1) {
      clearInterval(intervalTimers[timerId]);
      return intervalTimers[timerId] = null;
    }
  
    if (isIdStr && FnType.typeOf(duration, 'fun'))  [callback, duration] = [duration, 0];
    if (FnType.typeOf(timerId, 'fun')) [callback, timerId, duration] = [timerId, undefined, 0];

    if (FnType.typeOf(callback, 'fun')) {
      if (FnType.typeOf(duration, 'num') && duration >= 0) {
        if (isIdStr) {
          clearInterval(intervalTimers[timerId]);
          return intervalTimers[timerId] = setInterval(callback, duration);
        }
        if (timerId === undefined) {
          return setInterval(callback, duration);
        }
      }
    }
  
  }

  /**
   * [fn.timeout] 延时定时器
   * @param timerId
   * @param duration
   * @param callback
   */
  public static timeout(timerId?: string, duration?: any, callback?: any): any {
  
    const isIdStr = FnType.typeVal(timerId, 'str');
  
    if (isIdStr && duration === undefined) {
      return FnObject.get(timeoutTimers[timerId], '_called') === false ? timeoutTimers[timerId] : null;
    }
    if (isIdStr && [null, false, 'clear'].indexOf(duration) > -1) {
      clearTimeout(timeoutTimers[timerId]);
      return timeoutTimers[timerId] = null;
    }

    if (isIdStr && FnType.typeOf(duration, 'fun')) [callback, duration] = [duration, 0];
    if (FnType.typeOf(timerId, 'fun')) [callback, timerId, duration] = [timerId, undefined, 0];

    if (FnType.typeOf(callback, 'fun')) {
      if (FnType.typeOf(duration, 'num') && duration >= 0) {
        if (isIdStr) {
          clearTimeout(timeoutTimers[timerId]);
          return timeoutTimers[timerId] = setTimeout(callback, duration);
        }
        if (timerId === undefined) {
          return setTimeout(callback, duration);
        }
      }
    }

  }

  /**
   * [fn.defer] 延迟执行函数
   * @param func 
   */
  public static defer(func: Function) {
    return setTimeout(func);
  }

  /**
   * [fn.time] 返回一个当前时间戳
   * @param time 
   */
  public static time(time?: Date | string | number): number {
    if (time instanceof Date) {
      return time.getTime();
    } else {
      return (new Date(String(time)).getTime() || (new Date()).getTime());
    }
  }

  /**
   * [fn.fmtDate] 获取格式化的时间字符串
   * @param fmtStr 
   * @param time 
   */
  public static fmtDate(fmtStr: string, time?: Date | string | number): string {
    const _date = new Date(String(time));
    const date = _date.getTime() ? _date : new Date();
    const obj = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    };
    if (/(y+)/.test(fmtStr)) {
      fmtStr = fmtStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        if (new RegExp(`(${k})`).test(fmtStr)) {
          fmtStr = fmtStr.replace(RegExp.$1, RegExp.$1.length === 1
            ? obj[k] : `00${obj[k]}`.substr((obj[k] + '').length));
        }
      }
    }
    return fmtStr;
  }
}
