let fs, path, Buffer, execSync, process;

export class Tools {
    constructor () {
        fs = eval('require("fs")');
        path = eval('require("path")');
        execSync = eval('require("child_process").execSync');
        process = global.process;
        Buffer = global.Buffer;
    }

    /**
     * [fn.rd] 读文件
     * @param file
     */
    public rd = (file: string) => {
        return fs.existsSync(file) ? fs.readFileSync(file, {encoding: 'utf8'}) : '';
    }

    /**
     * [fn.wt] 写文件
     * @param file
     * @param text
     * @param flag ['w'|'a'] default: 'w'
     */
    public wt = (file: string, text: string, flag: 'w'|'a') => {
        const fd = fs.openSync(file, flag);
        var buffer = new Buffer(text);
        fs.writeSync(fd, buffer, 0, buffer.length, 0);
        fs.closeSync(fd);
    }

    /**
     * [fn.cp] 复制文件或文件夹
     * @param src
     * @param dist
     */
    public cp(src: string, dist: string) {
        if (fs.existsSync(src)) {
            if (fs.statSync(src).isFile()) {
                fs.createReadStream(src).pipe(fs.createWriteStream(dist));
            } else if (fs.statSync(src).isDirectory()) {
                this.mk(dist);
                const subSrcs = fs.readdirSync(src);
                subSrcs.forEach(file => {
                    const subSrc = path.join(src, file);
                    const subDist = path.join(dist, file);
                    this.cp(subSrc, subDist);
                });
            }
        }
    }
    
    /**
     * [fn.mv] 移动文件或文件夹
     * @param src 
     * @param dist 
     */
    public mv(src: string, dist: string) {
        try {
            fs.renameSync(src, dist);
        } catch (e) {
            this.cp(src, dist);
            this.rm(src);
        }
    }

    /**
     * [fn.rm] 删除文件或文件夹
     * @param src
     */
    public rm(src: string) {
        if (fs.existsSync(src)) {
            if (fs.statSync(src).isFile()) {
                fs.unlinkSync(src);
            } else if (fs.statSync(src).isDirectory()) {
                const subSrcs = fs.readdirSync(src);
                subSrcs.forEach(file => {
                    const subSrc = path.join(src, file);
                    this.rm(subSrc);
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
    public mk(dist) {
        const absDist = path.resolve(dist);
        if (!fs.existsSync(absDist)) {
            try {
                fs.mkdirSync(absDist);
            } catch (e) {
                this.mk(path.dirname(absDist));
                fs.mkdirSync(absDist);
            }
        };
    }
}
