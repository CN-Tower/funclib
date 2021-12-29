import timerBase from './_timerBase';


/**
 * [fn.timeout] 延时定时器
 * @param timerId  : string [?]
 * @param duration : number|false|null [?]
 * @param callback : function
 * @param leading  : boolean [?]
 */
function timeout(timerId, duration, callback, leading) {
  return timerBase(timerId, duration, callback, leading, 'timeout');
}

export default timeout;