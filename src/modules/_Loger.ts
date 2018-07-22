import { COLOR_LIST } from '../configs/fnConfigs';

export class FnLoger {
    private static array: Function;
    private static get: Function;
    private static typeValue: Function;
    private static cutString: Function;
    private static fmtDate: Function;
    private static version: string;

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
    public static log(isClient: boolean, value: any, configs: Object, isFmt: boolean) {
        let isFormate = this.get(configs, '/isFmt') || isFmt;
        if (typeof configs === 'boolean') {
            isFormate = configs; configs = undefined;
        }
        value = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
        let time = `[${this.fmtDate('hh:mm:ss')}] `;
        let title = (this.typeValue(configs, 'str') || this.get(configs, '/title')
            || `funclib(${this.version})`).replace(/\n/mg, '');
        const originTtLength = (time + title + '[] ').length;
        if (!isFormate) title = `( ${title} )`;
        if (!isClient) {
            time  = this.chalk(time);
            const titlec = this.get(configs, '/ttColor');
            const valuec = this.get(configs, '/color');
            title = this.chalk(title, titlec in COLOR_LIST && titlec || 'green');
            value = this.chalk(value, valuec in COLOR_LIST && valuec || 'cyan');
        }

        title = time + title;
        let width = this.get(configs, '/width');
        if (!width || width < 30 || width > 100) width = 66;
        if (originTtLength <= width) {
            if (isFormate) {
                title = this.array((width - originTtLength) / 2, ' ').join('') + title;
            }
        } else {
            const colorEnd = '\x1B[0m';
            const fixLength = title.length - originTtLength - colorEnd.length;
            if (isClient) {
                title = this.cutString(title, width - 3);
            } else {
                title = this.cutString(title, width + fixLength - 3) + colorEnd;
            }
        }

        if (!isFormate) {
            console.log(`${title}: ${value}`);
        } else {
            let sgLine = '', dbLine = '';
            this.array(width).forEach(x => {
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
