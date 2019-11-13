/**@function*/

/**
 * [fn.isFullScreen] 检测是否全屏状态
 */
function isFullScreen() {
  return !!(document.fullscreenElement || document.msFullscreenElement ||
    document.mozFullScreenElement || document.webkitFullscreenElement);
}

/**@function*/
module.exports = isFullScreen;