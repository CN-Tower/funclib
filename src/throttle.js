import isFun from './isFun';
import isObj from './isObj';
import has from './has';
import debounce from './debounce';
import throwErr from './_throwErr';


/**
 * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
 * @param  func : function
 * @param  wait    : number
 * @param  options : object [?]
 * leading: boolean = true
 * trailing: boolean = true
 */
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (!isFun(func)) throwErr('fun');
  if (isObj(options)) {
    leading = has(options, 'leading') ? !!options.leading : leading;
    trailing = has(options, 'trailing') ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

export default throttle;