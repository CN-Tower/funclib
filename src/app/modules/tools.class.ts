export /*funclib*/ class Tools {

    writeFile: Function;
    deleteDirectory: Function;
    copyFile: Function;
    copyDirectory: Function;

    constructor(fs, path) {
        if (fs) {
            /**
             * [fn.tools.writeFile] 写文件
             * @param dir
             * @param dist
             */
            this.writeFile = (file: string, text: string, onEnd?: Function) => {
                fs.open(file, 'w', function(err, fd) {
                    if (err) {
                        throw err;
                    } else {
                        var buffer = new Buffer(text);
                        fs.write(fd, buffer, 0, buffer.length, 0, function(err, bytesWritten, buffer) {
                            if (err) {
                                throw err;
                            } else {
                                fs.close(fd);
                                if (typeof onEnd === 'function') {
                                    onEnd();
                                }
                            }
                        });
                    }
                });
            }
            /**
             * [fn.tools.copyFile] 复制文件
             * @param dir
             * @param dist
             */
            this.copyFile = (filePath: string, distPath: string) => {
                fs.createReadStream(filePath).pipe(fs.createWriteStream(distPath));
            }
        }
        if (fs && path) {
            /**
             * [fn.tools.deleteDirectory] 删除文件夹和文件
             * @param dir
             * @param dist
             */
            this.deleteDirectory = (dir: string) => {
                if( fs.existsSync(dir) ) {
                    const files = fs.readdirSync(dir);
                    files.forEach(file => {
                        const subFile = path.join(dir, file);
                        if (fs.statSync(subFile).isDirectory()) {
                            this.deleteDirectory(subFile);
                        } else {
                            fs.unlinkSync(subFile);
                        }
                    });
                    fs.rmdirSync(dir);
                }
            }
            /**
             * [fn.tools.copyDirectory] 复制文件夹和文件
             * @param dir
             * @param dist
             */
            this.copyDirectory = (dir: string, dist: string) => {
                if( fs.existsSync(dir) ) {
                    const distDir = path.join(dist, path.basename(dir));
                    fs.mkdirSync(distDir);
                    const files = fs.readdirSync(dir);
                    files.forEach(file => {
                        const subFile = path.join(dir, file);
                        const subDist = path.join(distDir, file);
                        if (fs.statSync(subFile).isDirectory()) {
                            this.copyDirectory(subFile, subDist);
                        } else {
                            this.copyFile(subFile, subDist);
                        }
                    });
                }
            }
        }
    }
}
