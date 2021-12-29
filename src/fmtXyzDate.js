import timestamp from './timestamp';
import fmtDate from './fmtDate';
import fmtUtcDate from './fmtUtcDate';
import dateBase from './_dateBase';


/**
 * [fn.fmtXyzDate] 获取格式化指定时差的时间字符串
 * @param fmtStr : string
 * @param time   : date|string|number
 * @param offset : number
 */
function fmtXyzDate(fmtStr, time, offset) {
  var date = dateBase(time);
  if (!date.getTime()) return '';
  var ms = date.getUTCMilliseconds()
    , tm = timestamp(fmtUtcDate('yyyy/MM/dd hh:mm:ss', time)) + ms + (!+offset ? 0 : +offset);
  return fmtDate(fmtStr, tm);
}

export default fmtXyzDate;