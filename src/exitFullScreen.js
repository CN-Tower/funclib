import isFun from './isFun';
import defer from './defer';
import interval from './interval';
import isFullScreen from './isFullScreen';
import sendF11 from './_sendF11';


/**
 * [fn.exitFullScreen] 退出全屏显示
 * @param didExit : function [?]
 */
function exitFullScreen(didExit) {
  var cancelFullScreen = document.cancelFullScreen
    || document.webkitCancelFullScreen
    || document.mozCancelFullScreen || document.exitFullScreen;
  cancelFullScreen ? cancelFullScreen.call(document) : sendF11();
  if (isFun(didExit)) {
    var timer = interval(100, function () {
      if (!isFullScreen()) {
        clearInterval(timer);
        defer(didExit);
      }
    });
  }
}

export default exitFullScreen;