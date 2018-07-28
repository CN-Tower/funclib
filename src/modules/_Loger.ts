import { FnArray } from './_Array';
import { FnObject } from './_Object';
import { FnString } from './_String';
import { FnTime } from './_Time';
import { FnType } from './_Type';
import { COLOR_LIST, VERSION } from '../funclib.conf';

export class FnLoger {
    /**
     * [fn.log] 控制台格式化打印值
     * @param value 
     * @param configs {
     * title: string,
     * width: number [20-100]
     * part: 'pre'|'end'
     * isFmt: boolean
     * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
     * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
     * @param isFmt 
     */
    public static log(isClient: boolean, value: any, configs: Object, isFmt: boolean = true) {
        let isFormate = FnObject.get(configs, '/isFmt') || isFmt;
        if (typeof configs === 'boolean') {
            isFormate = configs; configs = undefined;
        }
        value = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
        let time = `[${FnTime.fmtDate('hh:mm:ss')}] `;
        let title = (FnType.typeValue(configs, 'str') || FnObject.get(configs, '/title')
            || `funclib(${VERSION})`).replace(/\n/mg, '');
        const originTtLength = (time + title + '[] ').length;
        if (!isFormate) title = `( ${title} )`;
        if (!isClient) {
            time  = FnLoger.chalk(time);
            const titlec = FnObject.get(configs, '/ttColor');
            const valuec = FnObject.get(configs, '/color');
            title = FnLoger.chalk(title, titlec in COLOR_LIST && titlec || 'green');
            value = FnLoger.chalk(value, valuec in COLOR_LIST && valuec || 'cyan');
        }

        title = time + title;
        let width = FnObject.get(configs, '/width');
        if (!width || width < 30 || width > 100) width = 66;
        if (originTtLength <= width) {
            if (isFormate) {
                title = FnArray.array((width - originTtLength) / 2, ' ').join('') + title;
            }
        } else {
            const colorEnd = '\x1B[0m';
            const fixLength = title.length - originTtLength - colorEnd.length;
            if (isClient) {
                title = FnString.cutString(title, width - 3);
            } else {
                title = FnString.cutString(title, width + fixLength - 3) + colorEnd;
            }
        }

        if (!isFormate) {
            console.log(`${title}: ${value}`);
        } else {
            let sgLine = '', dbLine = '';
            FnArray.array(width).forEach(x => {
                sgLine += '-'; dbLine += '=';
            });
            if (isClient) {
                console.log(`\n${dbLine}\n${title}\n${sgLine}\n${value}\n${dbLine}\n`);
            } else {
                if (configs && ['pre', 'end'].indexOf(configs['part']) > -1) {
                    if (configs['part'] === 'pre') {
                        console.log('\n' + dbLine);
                        console.log(title);
                        console.log(sgLine);
                    } else {
                        console.log(dbLine + '\n');
                    }
                } else {
                    console.log('\n' + dbLine);
                    console.log(title);
                    console.log(sgLine);
                    console.log(value);
                    console.log(dbLine + '\n');
                }
            }
        }
    }

    /**
     * [fn.chalk] 在控制台打印有颜色的字符串
     * @param value 
     * @param color 
     */
    public static chalk(value: string, color?: string) {
        if (!(color in COLOR_LIST)) color = 'grey'
        return COLOR_LIST[color].replace(/%s/, value);
    }
}
