import { COLOR_LIST } from '../configs/fnConfigs';

export class FnLoger {
    private static array: Function;
    private static get: Function;
    private static typeValue: Function;
    private static cutString: Function;
    private static fmtDate: Function;
    private static version: string;

    private static getColorConf(configs: any, field: 'ttColor' | 'color') {
        const themeConfs = { ttColor: 'green', color: 'cyan' }
        return configs && configs[field] in COLOR_LIST && configs[field] || themeConfs[field];
    }

    /**
     * [fn.chalk] 在控制台打印有颜色的字符串
     * @param value 
     * @param color 
     */
    public static chalk(value: string, color: string = 'default') {
        if (!(color in COLOR_LIST)) color = 'default'
        return COLOR_LIST[color].replace(/%s/, value);
    }

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
    public static log(isClient: boolean, value: any,  configs: Object, isFmt: boolean) {
        isFmt = this.get(configs, '/isFmt') || isFmt;
        if (typeof configs === 'boolean') {
            isFmt = configs;
            configs = undefined;
        }
        value = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
        let title = (this.typeValue(configs, 'str')
            || this.get(configs, '/title')
            || `funclib(${this.version})`).replace(/\n|\s/mg, '');
        let time = this.fmtDate('hh:mm:ss');
        if (!isFmt) {
            if (!isClient) {
                time = this.chalk(`[${time}] `, 'grey');
                title = this.chalk(`( ${title} )`, FnLoger.getColorConf(configs, 'ttColor'));
            }
            console.log(`${time + title}: ${this.chalk(value, FnLoger.getColorConf(configs, 'color'))}`);
        } else {
            const originTtLength = (time + title + '[] ').length;
            if (!isClient) {
                time = this.chalk(`[${time}] `, 'grey');
                title = this.chalk(title, FnLoger.getColorConf(configs, 'ttColor'));
            }
            title = time + title;
            let width = this.get(configs, '/width');
            if (!width || width < 30 || width > 100) width = 66;
            if (originTtLength <= width) {
                title = this.array((width - originTtLength) / 2, ' ').join('') + title;
            } else {
                const colorEnd = '\x1B[0m';
                const fixLength = title.length - originTtLength - colorEnd.length;
                title = isClient
                    ? this.cutString(title, width - 3)
                    : this.cutString(title, width + fixLength - 3) + colorEnd;
            }
            let sgLine = '', dbLine = '';
            this.array(width).forEach(x => {
                sgLine += '-'; dbLine += '=';
            });
            isClient
                ? FnLoger.clientLog(dbLine, title, sgLine, value)
                : FnLoger.serverLog.call(this, dbLine, title, sgLine, value, configs);
        }
    }

    /**
     * 客户端打印
     */
    private static clientLog(dL, tt, sL, value) {
        console.log(`\n${dL}\n${tt}\n${sL}\n${value}\n${dL}\n`);
    }

    /**
     * 服务端打印
     */
    private static serverLog(dL, tt, sL, value, configs) {
        if (configs && ['pre', 'end'].indexOf(configs['part']) > -1) {
            if (configs['part'] === 'pre') {
                console.log('\n' + dL);
                console.log(tt);
                console.log(sL);
            } else {
                console.log(dL + '\n');
            }
        } else {
            console.log('\n' + dL);
            console.log(tt);
            console.log(sL);
            console.log(this.chalk(value, FnLoger.getColorConf(configs, 'color')));
            console.log(dL + '\n');
        }
    }
}
