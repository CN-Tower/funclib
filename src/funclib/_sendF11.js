/**@function*/

/**
 * Send F11 command to browser.
 */
function sendF11() {
  if (window.ActiveXObject) {
    var ws = new window.ActiveXObject('WScript.Shell');
    if (ws) ws.SendKeys('{F11}');
  }
}

/**@function*/
module.exports = sendF11;