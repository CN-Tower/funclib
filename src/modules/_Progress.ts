import { FnType } from './_Type';
import { FnObject } from './_Object';
import { FnTime } from './_Time';
import { FnLog } from './_Logs';
import { VERSION } from '../funclib.conf';

let progress: any;
let duration: number;
let pgType: 'bar'|'spi'|null;
const process: any = global.process;

export class FnProgress {
    /**
     * [fn.progress.start] 开启进度条，并传入参数
     * @param title: string
     * @param options {{title?: string, width?: number = 40, type?: 'bar'|'spi' = 'bar'}}
     */
    public static start(title: string, options?: any) {
        if (FnType.typeOf(title, 'obj')) {
            options = title;
            title = undefined;
        }
        FnTime.interval('pg_sping', false);
        FnTime.timeout('pg_Bar', false);
        title =FnType.typeVal(title, 'str')
            || FnObject.get(options, 'title', 'str') || `funclib ${VERSION}`;
        pgType = FnObject.get(options, '/type', 'str');
        if (!options) options = {};
        options.title = title;
        if (pgType === 'bar' || ['bar', 'spi'].indexOf(pgType) === -1) {
            pgType = 'bar';
            FnProgress.startPgbar(options);
        } else {
            FnProgress.startSping(title);
        }
    }

    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param onStopped 
     */
    public static stop(onStopped?: Function) {
        if (pgType === 'bar') {
            FnProgress.stopPgbar(() => {
                pgType = null;
                if (FnType.typeOf(onStopped, 'fun')) onStopped();
            });
        } else {
            FnProgress.stopSping();
            pgType = null;
            if (FnType.typeOf(onStopped, 'fun')) onStopped();
        }
    }

    /**
     * 翻转
     */
    private static startSping(message: string) {
        FnTime.interval('pg_sping', false);
        FnProgress.spingFun(message);
    }

    private static stopSping() {
        FnTime.interval('pg_sping', false);
    }

    private static spingFun(msg: string) {
        const stream = process.stderr;
        const interrupt: Function = frame => {
            stream.clearLine();
            stream.cursorTo(0);
            stream.write(frame);
        };
        let s = '/'
        FnTime.interval('pg_sping', 180, () => {
            interrupt(`${FnLog.chalk(s, 'cyan')} ${msg}`);
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
        FnTime.timeout('pg_Bar', false);
        const Pgbar = eval('require("progress")');
        const prog = `${options.title || '[fn.progress]'} [:bar] :percent`;
        progress = new Pgbar(prog, {
            complete: '=', incomplete: ' ',
            width: options['width'] || 40,
            total: options['total'] || 20
        });
        duration = 250;
        FnProgress.tickFun('+');
    }

    private static stopPgbar(onStopped: Function) {
        duration = 600;
        FnProgress.tickFun('-', onStopped);
    }

    private static tickFun(type, onStopped?) {
        FnTime.timeout('pg_Bar', duration, () => {
            progress.tick();
            switch (type) {
                case '+': duration += 300; break;
                case '-': duration -= duration * 0.2; break;
            }
            if (!progress.complete) {
                FnProgress.tickFun(type, onStopped);
            } else if (onStopped) {
                onStopped();
            }
        });
    }
}
