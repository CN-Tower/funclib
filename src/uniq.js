var UDF = undefined;
import isUdf from './isUdf';
import isBol from './isBol';
import typeVal from './typeVal';
import get from './get';
import isDeepEqual from './isDeepEqual';

/**
 * [fn.uniq] 去重或根据字段去重
 * @param srcArr  : array
 * @param pathStr : string [?]
 * @param isDeep  : boolean = true
 */
function uniq(srcArr, pathStr, isDeep) {
  if (isUdf(isDeep)) isDeep = true;
  if (isBol(pathStr)) isDeep = pathStr, pathStr = UDF;
  pathStr = typeVal(pathStr, 'str');
  var tmpArr = srcArr.slice(), i = -1;
  while (++i < tmpArr.length - 1) {
    for (var j = i + 1; j < tmpArr.length; j++) {
      var isDuplicate;
      if (pathStr) {
        var val1 = get(tmpArr[i], pathStr), val2 = get(tmpArr[j], pathStr);
        isDuplicate = isDeep ? isDeepEqual(val1, val2) : val1 === val2;
      } else {
        isDuplicate = isDeep ? isDeepEqual(tmpArr[i], tmpArr[j]) : tmpArr[i] === tmpArr[j];
      }
      if (isDuplicate) tmpArr.splice(j--, 1);
    }
  }
  return tmpArr;
}

export default uniq;