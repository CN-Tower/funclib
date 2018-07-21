export class FnLoger {
    private static array: Function;
    private static cutString: Function;
    private static version: string;
    
    private static colors = {
        'grey': '\x1B[90m%s\x1B[0m',
        'blue': '\x1B[34m%s\x1B[0m',
        'cyan': '\x1B[36m%s\x1B[0m',
        'green': '\x1B[32m%s\x1B[0m',
        'magenta': '\x1B[35m%s\x1B[0m',
        'red': '\x1B[31m%s\x1B[0m',
        'yellow': '\x1B[33m%s\x1B[0m',
        'default': '%s',
    }

    /**
     * [fn.chalk] 在控制台打印有颜色的字符串
     * @param value 
     * @param color 
     */
    public static chalk(value: string, color?: string) {
        if (!(color in this.colors)) {
            color = 'default'
        }
        return this.colors[color].replace(/%s/, value);
    }

  /**
   * [fn.log] 控制台格式化打印值
   * @param value 
   * @param configs {
   * title: string,
   * lineLen: number [20-100]
   * part: 'pre'|'end'
   * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
   * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' }
   */
    public static log (value: any, configs: Object, isClient: boolean) {
        value = typeof value === 'object'
            ? JSON.stringify(value, null, 2)
            : String(value);
        let title = (typeof configs === 'string' && configs)
            || (configs && configs['title']) || `funclib ${this.version}`;
        let lineLen = configs && configs['lineLen'];
        if (!lineLen || lineLen < 20 || lineLen > 100) {
            lineLen = 66;
        }
        let titlelen, sp = '';
        if (title.length <= lineLen - 10) {
            titlelen = title.length;
        } else {
            titlelen = lineLen - 10;
            title = this.cutString(title, titlelen - 2);
        }
        this.array((lineLen - titlelen) / 2, ' ').forEach(x => sp += x);
        const tt = sp + title;
        const s = '-', d = '=';
        let sL = '', dL = '';
        this.array(lineLen).forEach(x => {
            sL += s;
            dL += d;
        });
        isClient
            ? FnLoger.clientLog(dL, tt, sL, value)
            : FnLoger.serverLog(dL, tt, sL, value, configs);
    }

    /**
     * 客户端打印
     */
    private static clientLog(dL, tt, sL, value)  {
        console.log(`\n${dL}\n${tt}\n${sL}\n${value}\n${dL}\n`);
    }

    /**
     * 服务端打印
     */
    private static serverLog(dL, tt, sL, value, configs)  {
        const color = configs && configs['color'] in this.colors && configs['color'] || 'grey';
        const ttColor = configs && configs['ttColor'] in this.colors && configs['ttColor'] || 'green';

        if (configs && ['pre', 'end'].indexOf(configs['part']) > -1) {
            if (configs['part'] === 'pre') {
                console.log('\n' + dL);
                console.log(this.chalk(tt, ttColor));
                console.log(sL);
            } else {
                console.log(dL + '\n');
            }
        } else {
            console.log('\n' + dL);
            console.log(this.chalk(tt, ttColor));
            console.log(sL);
            console.log(this.chalk(value, color));
            console.log(dL + '\n');
        }
    }
}
