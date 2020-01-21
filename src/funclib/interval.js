var timerBase = require('./_timerBase');

/**@function*/

/**
 * [fn.interval] 循环定时器
 * @param timerId  : string [?]
 * @param duration : number|false|null [?]
 * @param callback : function
 */
function interval(timerId, duration, callback) {
  return timerBase(timerId, duration, callback, 'interval');
}

/**@function*/
module.exports = interval;