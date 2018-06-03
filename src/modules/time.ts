export class Time {
    private static intervalTimers: any = {};
    private static timeoutTimers: any = {};

    /**
     * [fn.interval] 循环定时器
     * @param timerId
     * @param duration
     * @param func
     */
    public static interval(timerId: string, duration: number | boolean, func: Function) {
        if (typeof duration === 'number' && typeof func === 'function') {
            clearInterval(Time.intervalTimers[timerId]);
            Time.intervalTimers[timerId] = setInterval(() => func(), duration);
        } else if (typeof duration === 'boolean' && !duration) {
            clearInterval(Time.intervalTimers[timerId]);
        }
    }

    /**
     * [fn.timeout] 延时定时器
     * @param timerId 
     * @param duration 
     * @param func 
     */
    public static timeout(timerId: string, duration: number | boolean, func: Function) {
        if (typeof duration === 'number' && typeof func === 'function') {
            clearTimeout(Time.timeoutTimers[timerId]);
            Time.timeoutTimers[timerId] = setTimeout(() => func(), duration);
        } else if (typeof duration === 'boolean' && !duration) {
            clearTimeout(Time.timeoutTimers[timerId]);
        }
    }

    /**
     * [fn.timeStamp] 返回一个当前时间戳
     */
    public static timeStamp(date: Date | string): number {
        if (date instanceof Date) {
            return date.getTime();
        } else {
            return (new Date(date)).getTime() || (new Date()).getTime();
        }
    }

    /**
     * [fn.fmtDate] 获取格式化的时间字符串
     * @param fmtStr 
     * @param time 
     */
    public static fmtDate(fmtStr: string, time: any): string {
        const _date = new Date(time);
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
                    fmtStr = fmtStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (('00' + obj[k]).substr(('' + obj[k]).length)));
                }
            }
        }
        return fmtStr;
    }
}