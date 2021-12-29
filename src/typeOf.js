import rest from './rest';
import toArr from './toArr';
import isStr from './isStr';
import isNum from './isNum';
import isBol from './isBol';
import isFun from './isFun';
import isNul from './isNul';
import isUdf from './isUdf';
import isErr from './isErr';
import isDat from './isDat';
import isReg from './isReg';
import isArr from './isArr';
import isObj from './isObj';


/**
 * [fn.typeOf] 检查值的类型
 * @param value : any
 * @param type_ : string|string[]
 * @param types : ...string[]
 */
var typeOf = rest(function (value, type_, types) {
  if (!type_) return false;
  types = toArr(type_).concat(types);
  return types.some(function (_type) {
    switch (_type) {
      case 'str': return isStr(value);
      case 'num': return isNum(value);
      case 'bol': return isBol(value);
      case 'fun': return isFun(value);
      case 'nul': return isNul(value);
      case 'udf': return isUdf(value);
      case 'err': return isErr(value);
      case 'dat': return isDat(value);
      case 'reg': return isReg(value);
      case 'arr': return isArr(value);
      case 'obj': return isObj(value);
      default: return typeof value === _type;
    }
  });
});

export default typeOf;