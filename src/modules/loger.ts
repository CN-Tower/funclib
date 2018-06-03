/**
 * 控制台格式化打印值
 * @param value 
 * @param configs {
 * title: string,
 * lineLen: number [20-100]
 * part: 'pre'|'end' [S]
 * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [S]
 */
export function loger(value: any, configs: Object, isClient: boolean) {
    if (value === undefined) {
        value = `Welecome come to use funclib: ${this.version} !`;
    }
    if (typeof value === 'object') {
        value = JSON.stringify(value, null, 2);
    } else {
        value = String(value);
    }
    let title = configs && configs['title'] || `funclib ${this.version}`;
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
    if (isClient) {
        console.log(`\n${dL}\n${tt}\n${sL}\n${value}\n${dL}\n`);
    } else {
        const colors = {
            'grey': '\x1B[90m%s\x1B[0m',
            'blue': '\x1B[34m%s\x1B[0m',
            'cyan': '\x1B[36m%s\x1B[0m',
            'green': '\x1B[32m%s\x1B[0m',
            'magenta': '\x1B[35m%s\x1B[0m',
            'red': '\x1B[31m%s\x1B[0m',
            'yellow': '\x1B[33m%s\x1B[0m'
        }
        const color = configs && configs['color'] in colors && configs['color'] || 'grey';
        if (configs && ['pre', 'end'].indexOf(configs['part']) > -1) {
            if (configs['part'] === 'pre') {
                console.log('\n' + dL);
                console.log(colors['green'], tt);
                console.log(sL);
            } else {
                console.log(dL + '\n');
            }
        } else {
            console.log('\n' + dL);
            console.log(colors['green'], tt);
            console.log(sL);
            console.log(colors[color], value);
            console.log(dL + '\n');
        }
    }
}