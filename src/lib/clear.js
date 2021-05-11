var execSync = require('child_process').execSync;

/**@function*/

/**
 * [fn.clear] 命令行清屏
 * @param isForce : boolean
 */
function clear(isForce) {
  if (isForce) {
    process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
  } else {
    process.platform === 'win32' ? execSync('cls') : execSync('clear');
  }
}

/**@function*/
module.exports = clear;