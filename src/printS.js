import chalk from './chalk';
import pretty from './pretty';


/**
 * [fn.print] 在控制台打印值
 * @param value  : any
 * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
 */
function print(value, color) {
  console.log(chalk(pretty(value), color));
}

export default print;