import dateBase from './_dateBase';
import getTimeObj from './_getTimeObj';


/**
 * [fn.asUtcTime] 转化为相同时间的UTC时间戳
 * @param time : date|string|number
 */
function asUtcTime(time) {
  var date = dateBase(time);
  if (!date.getTime()) return NaN;
  var timeObj = getTimeObj(date);
  return Date.UTC(
    timeObj['y+'], timeObj['M+'] - 1, timeObj['d+'],
    timeObj['h+'], timeObj['m+'], timeObj['s+'], timeObj['S']
  );
}

export default asUtcTime;