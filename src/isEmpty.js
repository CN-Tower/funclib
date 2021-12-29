import len from './len';


/**
 * [fn.isEmpty] 判断对象是否为空对象或数组
 * @param srcObj : object
 */
function isEmpty(srcObj) { return len(srcObj) === 0; }

export default isEmpty;