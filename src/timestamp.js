import dateBase from './_dateBase';


/**
 * [fn.timestamp] 返回一个时间戳
 * @param time : date|string|number
 */
function timestamp(time) {
  return dateBase(time).getTime();
}

export default timestamp;