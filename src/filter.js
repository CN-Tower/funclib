import filterBase from './_filterBase';


/**
 * [fn.filter] 根据条件取过滤值
 * @param srcArr    : array
 * @param predicate : object|function|any
 */
function filter(srcArr, predicate) {
  return filterBase(srcArr, predicate, true);
}

export default filter;