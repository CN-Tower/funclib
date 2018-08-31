const intervalTimers: any = {};
const timeoutTimers: any = {};

export class FnTime {
  /**
   * [fn.interval] 循环定时器
   * @param timerId
   * @param duration
   * @param callback
   */
  public static interval(timerId: any, duration?: any, callback?: Function) {
    if (duration === false) {
      clearInterval(intervalTimers[timerId]);
    }
    else if (typeof duration === 'number' && typeof callback === 'function') {
      clearInterval(intervalTimers[timerId]);
      intervalTimers[timerId] = setInterval(() => callback(), duration);
      return intervalTimers[timerId];
    }
    else if (typeof timerId === 'number' && typeof duration === 'function') {
      callback = duration;
      duration = timerId;
      return setInterval(() => callback(), duration);
    }
  }

  /**
   * [fn.timeout] 延时定时器
   * @param timerId 
   * @param duration 
   * @param callback 
   */
  public static timeout(timerId: any, duration?: any, callback?: Function) {
    if (duration === false) {
      clearTimeout(timeoutTimers[timerId]);
    }
    else if (typeof duration === 'number' && typeof callback === 'function') {
      clearTimeout(timeoutTimers[timerId]);
      timeoutTimers[timerId] = setTimeout(() => callback(), duration);
      return timeoutTimers[timerId];
    }
    else if (typeof timerId === 'number' && typeof duration === 'function') {
      callback = duration;
      duration = timerId;
      return setTimeout(() => callback(), duration);
    }
    else if (typeof timerId === 'function') {
      callback = timerId;
      return setTimeout(() => callback());
    }
  }

  /**
   * [fn.defer] 延迟执行函数
   * @param func 
   */
  public static defer(func: Function) {
    FnTime.timeout(func);
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
