import fmtDateBase from './_fmtDateBase';


/**
 * [fn.fmtUtcDate] 获取格式化的UTC时间字符串
 * @param fmtStr : string
 * @param time   : date|string|number
 */
function fmtUtcDate(fmtStr, time) {
  return fmtDateBase(fmtStr, time, true);
}

export default fmtUtcDate;