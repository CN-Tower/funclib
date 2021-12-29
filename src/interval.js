import timerBase from './_timerBase';


/**
 * [fn.interval] 循环定时器
 * @param timerId  : string [?]
 * @param duration : number|false|null [?]
 * @param callback : function
 * @param leading  : boolean [?]
 */
function interval(timerId, duration, callback, leading) {
  return timerBase(timerId, duration, callback, leading, 'interval');
}

export default interval;