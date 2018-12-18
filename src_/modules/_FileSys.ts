const fs: any = eval('require("fs")');
const path: any = eval('require("path")');
const execSync: any = eval('require("child_process").execSync');
const process: any = global.process;

export class FnFileSys {
  /**
   * [fn.rd] 读文件
   * @param file
   */
  public static rd = (file: string) => {
    return fs.existsSync(file) ? fs.readFileSync(file, { encoding: 'utf8' }) : '';
  }

  /**
   * [fn.wt] 写文件
   * @param file
   * @param text
   * @param flag ['w'|'a'] default: 'w'
   */
  public static wt = (file: string, text: string, flag: 'w' | 'a' = 'w') => {
    fs.writeFileSync(file, text, { encoding: 'utf8', flag: flag });
  }

  /**
   * [fn.cp] 复制文件或文件夹
   * @param src
   * @param dist
   */
  public static cp(src: string, dist: string) {
    if (fs.existsSync(src)) {
      if (fs.statSync(src).isFile()) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dist));
      } else if (fs.statSync(src).isDirectory()) {
        FnFileSys.mk(dist);
        const subSrcs = fs.readdirSync(src);
        subSrcs.forEach(file => {
          const subSrc = path.join(src, file);
          const subDist = path.join(dist, file);
          FnFileSys.cp(subSrc, subDist);
        });
      }
    }
  }

  /**
   * [fn.mv] 移动文件或文件夹
   * @param src 
   * @param dist 
   */
  public static mv(src: string, dist: string) {
    try {
      fs.renameSync(src, dist);
    } catch (e) {
      FnFileSys.cp(src, dist);
      FnFileSys.rm(src);
    }
  }

  /**
   * [fn.rm] 删除文件或文件夹
   * @param src
   */
  public static rm(src: string) {
    if (fs.existsSync(src)) {
      if (fs.statSync(src).isFile()) {
        fs.unlinkSync(src);
      } else if (fs.statSync(src).isDirectory()) {
        const subSrcs = fs.readdirSync(src);
        subSrcs.forEach(file => {
          const subSrc = path.join(src, file);
          FnFileSys.rm(subSrc);
        });
        try {
          fs.rmdirSync(src);
        } catch (e) {
          setTimeout(() => {
            if (/win/.test(process.platform)) {
              const absSrc = path.resolve(src);
              execSync(`rd /s /q ${absSrc}`);
            } else {
              execSync(`rm -rf ${src}`)
            }
          }, 500);
        }
      }
    }
  }

  /**
   * [fn.mk] 创建文件夹
   * @param dist
   */
  public static mk(dist: string) {
    const absDist = path.resolve(dist);
    if (!fs.existsSync(absDist)) {
      try {
        fs.mkdirSync(absDist);
      } catch (e) {
        FnFileSys.mk(path.dirname(absDist));
        fs.mkdirSync(absDist);
      }
    };
  }

 /**
   * [fn.mk] 创建文件夹
   * @param src
   * @param digit
   */
  public static size(src, digit) {
    if (digit === void 0) { digit = 2; }
    return (fs.statSync(src)["size"] / 1024).toFixed(2)
  }
}
