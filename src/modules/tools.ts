export class Tools {
    private fs: any;
    private path: any;
    private child_process: any;
    private process;

    constructor (fs, path, child_process, process) {
        this.fs = fs;
        this.path = path;
        this.child_process = child_process;
        this.process = process;
    }

    /**
     * [fn.cpSync] 复制文件或文件夹
     * @param src
     * @param dist
     */
    public cpSync(src: string, dist: string) {
        if (this.fs.existsSync(src)) {
            if (this.fs.statSync(src).isFile()) {
                this.fs.createReadStream(src).pipe(this.fs.createWriteStream(dist));
            } else if (this.fs.statSync(src).isDirectory()) {
                this.mkdirSync(dist);
                const subSrcs = this.fs.readdirSync(src);
                subSrcs.forEach(file => {
                    const subSrc = this.path.join(src, file);
                    const subDist = this.path.join(dist, file);
                    this.cpSync(subSrc, subDist);
                });
            }
        }
    }
    
    /**
     * [fn.mvSync] 移动文件或文件夹
     * @param src 
     * @param dist 
     */
    public mvSync(src: string, dist: string) {
        try {
            this.fs.renameSync(src, dist);
        } catch (e) {
            this.cpSync(src, dist);
            this.rmSync(src);
        }
    }

    /**
     * [fn.rmSync] 删除文件或文件夹
     * @param src
     */
    public rmSync(src: string) {
        if (this.fs.existsSync(src)) {
            if (this.fs.statSync(src).isFile()) {
                this.fs.unlinkSync(src);
            } else if (this.fs.statSync(src).isDirectory()) {
                const subSrcs = this.fs.readdirSync(src);
                subSrcs.forEach(file => {
                    const subSrc = this.path.join(src, file);
                    this.rmSync(subSrc);
                });
                try {
                    this.fs.rmdirSync(src);
                } catch (e) {
                    setTimeout(() => {
                        if (/win/.test(this.process.platform)) {
                            const absSrc = this.path.resolve(src);
                            this.child_process.execSync(`rd /s /q ${absSrc}`);
                        } else {
                            this.child_process.execSync(`rm -rf ${src}`)
                        }
                    }, 500);
                }
            }
        }
    }

    /**
     * [fn.mkdirSync] 创建文件夹
     * @param dist
     */
    public mkdirSync(dist) {
        const absDist = this.path.resolve(dist);
        if (!this.fs.existsSync(absDist)) {
            try {
                this.fs.mkdirSync(absDist);
            } catch (e) {
                this.mkdirSync(this.path.dirname(absDist));
                this.fs.mkdirSync(absDist);
            }
        };
    }
}
