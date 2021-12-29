import forEach from './forEach';
import config from './_config';

var deCodes = config.deCodes
  , enCodes = config.enCodes;


/**
 * [fn.unescape] 解码HTML字符串
 * @param srcStr : string
 */
function unescape(srcStr) {
  forEach(enCodes, function (str, idx) {
    srcStr = srcStr.replace(new RegExp(str, 'g'), deCodes[idx]);
  });
  return srcStr;
}

export default unescape;