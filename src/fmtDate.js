import fmtDateBase from './_fmtDateBase';


/**
 * [fn.fmtDate] 获取格式化的时间字符串
 * @param fmtStr : string
 * @param time   : date|string|number
 */
function fmtDate(fmtStr, time) {
  return fmtDateBase(fmtStr, time, false);
}

export default fmtDate;