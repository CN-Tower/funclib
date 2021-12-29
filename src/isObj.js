import isArr from './isArr';
import isFun from './isFun';
import isErr from './isErr';
import isDat from './isDat';
import isReg from './isReg';
import config from './config';

var _global = config._global
  , _self = config._self;


/**
 * [fn.isObj] 判断是否为：正常Object
 * @param value : any
 */
function isObj(value) {
  return !!value && typeof value == 'object'
    && [_global, _self].indexOf(value) == -1
    && [isArr, isFun, isErr, isDat, isReg].every(function(func) { return !func(value); });
}

export default isObj;