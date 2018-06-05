let ora, Bar;
export class Progress {
    private ora;
    private pgType: 'ora'|'pg'|undefined;
    private timer: any;
    private progress: any;
    private duration: number;

    constructor() {
        ora = eval('require("ora")');
        Bar = eval('require("progress")');
    }
    /**
     * [fn.progress.start] 开启进度条，并传入参数
     * @param options {title: string, width: number (base: 40)}
     */
    public start(options: string|any) {
        if (!this.pgType) {
            if (typeof options === 'string') {
                this.pgType = 'ora';
                this.ora = ora(options);
                this.ora.start();
            } else {
                this.pgType = 'pg';
                const prog = `${options && options.title || '[fn.progress]'} [:bar] :percent`;
                this.progress = new Bar(prog, {
                    complete: '=', incomplete: ' ',
                    width: options && options['width'] || 40,
                    total: options && options['total'] || 20
                });
                clearTimeout(this.timer);
                this.duration = 250;
                this.tickFun('+');
            }
        }
    }

    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param onStopped 
     */
    public stop(onStopped?: Function) {
        if (this.pgType === 'ora') {
            this.ora.stop();
            this.pgType = undefined;
        } else {
            clearTimeout(this.timer);
            this.duration = 600;
            this.tickFun('-', () => {
                this.pgType = undefined;
                if (typeof onStopped === 'function') {
                    onStopped();
                }
            });
        }

    }

    private tickFun(type, onStopped?) {
        this.timer = setTimeout(() => {
            this.progress.tick();
            switch (type) {
                case '+': this.duration += 300; break;
                case '-': this.duration -= this.duration * 0.2; break;
            }
            this.progress.complete ? onStopped() : this.tickFun(type, onStopped);
        }, this.duration);
    }
}
