var isUdf = require('./isUdf');
var isFun = require('./isFun');
var isNum = require('./isNum');
var contains = require('./contains');
var typeVal = require('./typeVal');
var config = require('./_config');

var intervalTimers = config.intervalTimers
  , timeoutTimers  = config.timeoutTimers;

/**@function*/

/**
 * Basic methods of timers.
 */
function timerBase(timerId, duration, callback, type_) {
  var timer, setTimer, clearTimer;
  if (type_ === 'interval') {
    timer = intervalTimers, setTimer = setInterval, clearTimer = clearInterval;
  } else if (type_ === 'timeout') {
    timer = timeoutTimers, setTimer = setTimeout, clearTimer = clearTimeout;
  }
  var isTimerIdStr = typeVal(timerId, 'str');
  function invokeClear() { return clearTimer(timer[timerId]); };
  if (isTimerIdStr) {
    if (isUdf(duration)) {
      return { 'id': timer[timerId], 'stop': invokeClear, 'clear': invokeClear };
    }
    if (contains([null, false], duration)) {
      invokeClear();
      return timer[timerId] = null;
    }
    if (isFun(duration)) {
      callback = duration, duration = 0;
    }
  }
  if (isNum(timerId) && isFun(duration)) {
    callback = duration, duration = timerId, timerId = UDF;
  }
  if (isFun(timerId)) {
    callback = timerId, duration = 0, timerId = UDF;
  }
  if (isFun(callback) && isNum(duration) && duration >= 0) {
    if (isUdf(timerId)) return setTimer(callback, duration);
    if (isTimerIdStr) {
      invokeClear();
      return timer[timerId] = setTimer(callback, duration);
    }
  }
}

/**@function*/
module.exports = timerBase;