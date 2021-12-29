import pretty from './pretty';


/**
 * [fn.print] 在控制台打印值
 * @param value  : any
 */
function print(value) {
  console.log(pretty(value));
}

export default print;