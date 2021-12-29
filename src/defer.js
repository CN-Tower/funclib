
/**
 * [fn.defer] 延迟执行函数
 * @param func : function
 */
function defer(func) {
  return setTimeout(func);
}

export default defer;