var fs = require('fs');
var path = require('path');
var mk = require('./mk');

/**@function*/

/**
 * [fn.cp] 复制文件或文件夹
 * @param src  : string
 * @param dist : string
 */
function cp(src, dist) {
  function copy(sr, di, isOnInit) {
    if (fs.existsSync(sr)) {
      var stat = fs.statSync(sr);
      if (stat.isFile()) {
        var wtStream = fs.createWriteStream(di);
        fs.createReadStream(sr).pipe(wtStream);
      }
      else if (stat.isDirectory()) {
        if (isOnInit) {
          di = path.join(di, path.basename(sr));
        }
        mk(di);
        var subSrcs = fs.readdirSync(sr);
        subSrcs.forEach(function (file) {
          var subSrc = path.join(sr, file);
          var subDist = path.join(di, file);
          copy(subSrc, subDist, false);
        });
      }
    }
  }
  return copy(src, dist, true);
}

/**@function*/
module.exports = cp;