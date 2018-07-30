import { FnArray } from './_Array';
import { FnObject } from './_Object';
import { FnString } from './_String';
import { FnTime } from './_Time';
import { FnType } from './_Type';
import { VERSION } from '../funclib.conf';

export class FnLog {
    /**
     * [fn.log] 控制台格式化打印值
     * @param value 
     * @param configs
     * {title: string, width: number [20-100], isFmt: boolean}
     * @param isFmt 
     */
    public static log(value: any, configs?: any, isFmt: boolean = true) {
        if (configs && typeof configs.isFmt === 'boolean') isFmt = configs.isFmt;
        if (typeof configs === 'boolean') {
            isFmt = configs;
            configs = undefined;
        }
        // Value
        value = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
        // Title
        let time = `[${FnTime.fmtDate('hh:mm:ss')}] `;
        let title = (FnType.typeVal(configs, 'str') || FnObject.get(configs, '/title')
            || `funclib(${VERSION})`).replace(/\n/mg, '');
        const originTtLength = (time + title + '[] ').length;
        if (!isFmt) title = `( ${title} )`;
        title = time + title;
        // Line width
        let width = FnObject.get(configs, '/width');
        if (!width || width < 30 || width > 100) width = 66;
        // Fix title width
        if (originTtLength > width) {
            title = FnString.cutString(title, width - 3);
        } else if (isFmt){
            title = FnArray.array((width - originTtLength) / 2, ' ').join('') + title;
        }
        // Do log
        if (!isFmt) {
            console.log(`${title}: ${value}`);
        } else {
            let sgLine = '', dbLine = '';
            FnArray.array(width).forEach(x => {
                sgLine += '-'; dbLine += '=';
            });
            console.log(`\n${dbLine}\n${title}\n${sgLine}\n${value}\n${dbLine}\n`);
        }
    }
}
