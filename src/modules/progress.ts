let progress: any;
let duration: number;
let pgType: 'sp'|'pg'|null;
const process: any = global.process;

export class FnProgress {
    private static overlay;
    private static chalk;
    private static interval;
    private static timeout;
    
    /**
     * [fn.progress.start] 开启进度条，并传入参数
     * @param options {title: string, width: number (base: 40)}
     */
    public static start(options: string|any) {
        FnProgress.chalk = this.chalk;
        FnProgress.interval = this.interval;
        FnProgress.timeout = this.timeout;
        this.interval('pg_sping', false);
        this.timeout('pg_Bar', false);
        if (typeof options === 'string') {
            pgType = 'sp';
            FnProgress.startSping(options);
        } else {
            pgType = 'pg';
            FnProgress.startPgbar(options);
        }
    }

    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param onStopped 
     */
    public static stop(onStopped?: Function) {
        if (pgType === 'sp') {
            pgType = null;
            FnProgress.stopSping();
        } else {
            FnProgress.stopPgbar(() => {
                pgType = null;
                if (typeof onStopped === 'function') {
                    onStopped();
                }
            });
        }

    }

    /**
     * 翻转
     */
    private static startSping(message: string) {
        this.interval('pg_sping', false);
        this.spingFun(message);
    }

    private static stopSping() {
        this.interval('pg_sping', false);
    }

    private static spingFun(msg: string) {
        const stream = process.stderr;
        const interrupt: Function = frame => {
            stream.clearLine();
            stream.cursorTo(0);
            stream.write(frame);
        };
        let s = '/'
        this.interval('pg_sping', 180, () => {
            interrupt(`${this.chalk(s, 'cyan')} ${msg}`);
            switch (s) {
                case '/':  s = '-';  break;
                case '-':  s = '\\'; break;
                case '\\': s = '|';  break;
                case '|':  s = '/';  break;
                default:   s = '-';  break;
            }
        });
    }

    /**
     * 进度条
     */
    private static startPgbar(options: any) {
        this.timeout('pg_Bar', false);
        const Pgbar = eval('require("progress")');
        const prog = `${options && options.title || '[fn.progress]'} [:bar] :percent`;
        progress = new Pgbar(prog, {
            complete: '=', incomplete: ' ',
            width: options && options['width'] || 40,
            total: options && options['total'] || 20
        });
        duration = 250;
        this.tickFun('+');
    }

    private static stopPgbar(onStopped: Function) {
        duration = 600;
        this.tickFun('-', onStopped);
    }

    private static tickFun(type, onStopped?) {
        this.timeout('pg_Bar', duration, () => {
            progress.tick();
            switch (type) {
                case '+': duration += 300; break;
                case '-': duration -= duration * 0.2; break;
            }
            if (!progress.complete) {
                this.tickFun(type, onStopped);
            } else if (onStopped) {
                onStopped();
            }
        });
    }
}
