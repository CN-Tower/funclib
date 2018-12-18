import { FnType } from './_Type';

const intervalTimers: any = {};
const timeoutTimers: any = {};

export class FnTime {
  /**
   * [fn.interval] 循环定时器
   * @param callback
   * @param duration
   * @param timerId
   */
  public static interval(callback: any, duration?: any, timerId?: string) {
    if (FnType.typeOf(callback, 'udf')) {
      return { stop: timerId => clearInterval(intervalTimers[timerId]) };
    }
    else if (FnType.typeVal(callback, 'str')) {
      timerId = callback;
      if (duration === false) {
        return clearInterval(intervalTimers[timerId]);
      } else {
        return { stop: () => clearInterval(intervalTimers[timerId]) };
      }
    }
    else if (FnType.typeOf(callback, 'fun')) {
      const initTimer = () => {
        clearInterval(intervalTimers[timerId]);
        intervalTimers[timerId] = setInterval(() => callback(), duration);
        return intervalTimers[timerId];
      }
      if (FnType.typeOf(duration, 'num') && FnType.typeVal(timerId, 'str')) {
        return initTimer();
      }
      else if (FnType.typeVal(duration, 'str') && FnType.typeOf(timerId, 'num')) {
        [duration, timerId] = [timerId, duration];
        return initTimer();
      }
      else if (FnType.typeVal(duration, 'str')) {
        timerId = duration;
        duration = 0;
        return initTimer();
      }
      else if (FnType.typeOf(duration, 'num')) {
        return setInterval(() => callback(), duration);
      }
      else {
        return setInterval(() => callback());
      }
    }
  }

  /**
   * [fn.timeout] 延时定时器
   * @param callback
   * @param duration
   * @param timerId
   */
  public static timeout(callback: any, duration?: any, timerId?: string) {
    if (FnType.typeOf(callback, 'udf')) {
      return { stop: timerId => clearTimeout(timeoutTimers[timerId]) };
    }
    else if (FnType.typeVal(callback, 'str')) {
      timerId = callback;
      if (duration === false) {
        return clearTimeout(timeoutTimers[timerId]);
      } else {
        return { stop: () => clearTimeout(timeoutTimers[timerId]) };
      }
    }
    else if (FnType.typeOf(callback, 'fun')) {
      const initTimer = () => {
        clearTimeout(timeoutTimers[timerId]);
        timeoutTimers[timerId] = setTimeout(() => callback(), duration);
        return timeoutTimers[timerId];
      }
      if (FnType.typeOf(duration, 'num') && FnType.typeVal(timerId, 'str')) {
        return initTimer();
      }
      else if (FnType.typeVal(duration, 'str') && FnType.typeOf(timerId, 'num')) {
        [duration, timerId] = [timerId, duration];
        return initTimer();
      }
      else if (FnType.typeVal(duration, 'str')) {
        timerId = duration;
        duration = 0;
        return initTimer();
      }
      else if (FnType.typeOf(duration, 'num')) {
        return setTimeout(() => callback(), duration);
      }
      else {
        return setTimeout(() => callback());
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
