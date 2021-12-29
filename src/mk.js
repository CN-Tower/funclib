import fs from 'fs';
import path from 'path';


/**
 * [fn.mk] 创建文件夹
 * @param dir : string
 */
function mk(dir) {
  var absDir = path.resolve(dir);
  if (!fs.existsSync(absDir)) {
    try {
      fs.mkdirSync(absDir);
    }
    catch (e) {
      mk(path.dirname(absDir));
      fs.mkdirSync(absDir);
    }
  }
}

export default mk;