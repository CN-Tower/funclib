var isFun = require('./isFun');
var defer = require('./defer');
var interval = require('./interval');
var isFullScreen = require('./isFullScreen');
var sendF11 = require('./_sendF11');

/**@function*/

/**
 * [fn.fullScreen] 全屏显示HTML元素
 * @param el      : HTMLElement
 * @param didFull : function [?]
 */
function fullScreen(el, didFull) {
  if (typeof el === 'string') el = document.querySelector(el);
  if (el && el.tagName) {
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen
      || el.mozRequestFullScreen || el.msRequestFullScreen;
    rfs ? rfs.call(el) : sendF11();
    if (isFun(didFull)) {
      var timer = interval(100, function () {
        if (isFullScreen()) clearInterval(timer), defer(didFull);
      });
    }
  }
}

/**@function*/
module.exports = fullScreen;