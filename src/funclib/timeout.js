var timerBase = require('./_timerBase');

/**@function*/

/**
 * [fn.timeout] 延时定时器
 * @param timerId  : string [?]
 * @param duration : number|false|null [?]
 * @param callback : function
 */
function timeout(timerId, duration, callback) {
  return timerBase(timerId, duration, callback, 'timeout');
}

/**@function*/
module.exports = timeout;