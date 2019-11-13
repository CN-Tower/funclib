var isFun = require('./isFun');
var forEach = require('./forEach');
var config = require('./_config');
var fsChangeEvents = config.fsChangeEvents;
var fsEvents = config.fsEvents;

/**@function*/

/**
 * [fn.fullScreenChange] 全屏状态变化事件
 * @param callback function
 */
function fullScreenChange(callback) {
  if (isFun(callback)) {
    var eventId = Date.now();
    fsChangeEvents[eventId] = callback;
    forEach(fsEvents, function (e) {
      document.addEventListener(e, fsChangeEvents[eventId]);
    });
    return { 'remove': function() { rmFsChangeEvent(eventId); } };
  }
}

/**
 * [fn.fullScreenChange.removeAll] 清除所有全屏状态变化事件
 */
fullScreenChange.removeAll = function() {
  forIn(fsChangeEvents, function(eventId) { rmFsChangeEvent(eventId); });
}

function rmFsChangeEvent(eventId) {
  forEach(fsEvents, function (e) {
    document.removeEventListener(e, fsChangeEvents[eventId]);
  });
  delete fsChangeEvents[eventId];
}

/**@function*/
module.exports = fullScreenChange;