import fs from 'fs';
import cp from './cp';
import rm from './rm';


/**
 * [fn.mv] 移动文件或文件夹
 * @param src  : string
 * @param dist : string
 */
function mv(src, dist) {
  try {
    fs.renameSync(src, dist);
  }
  catch (e) {
    cp(src, dist);
    rm(src);
  }
}

export default mv;