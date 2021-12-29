import fs from 'fs';


/**
 * [fn.rd] 读文件
 * @param file : string
 */
function rd(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, { encoding: 'utf8' }) : '';
}

export default rd;