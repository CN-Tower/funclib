import { FnArray } from './_Array';
import { FnObject } from './_Object';
import { FnString } from './_String';
import { FnTime } from './_Time';
import { FnType } from './_Type';
import { VERSION } from '../funclib.conf';

const COLOR_LIST = {
  'grey'   : '\x1B[90m%s\x1B[0m',
  'blue'   : '\x1B[34m%s\x1B[0m',
  'cyan'   : '\x1B[36m%s\x1B[0m',
  'green'  : '\x1B[32m%s\x1B[0m',
  'magenta': '\x1B[35m%s\x1B[0m',
  'red'    : '\x1B[31m%s\x1B[0m',
  'yellow' : '\x1B[33m%s\x1B[0m',
  'default': '%s\x1B[0m'
}

const getIsFmt = configs => FnObject.has(configs, 'isFmt') ? configs.isFmt : true;
const getTitle = configs => FnObject.get(configs, '/title') || `funclib(${VERSION})`;

export class FnLog {
  /**
   * [fn.chalk] 在控制台打印有颜色的字符串
   * @param value 
   * @param color 
   */
  public static chalk(value: string, color?: string) {
    if (!(color in COLOR_LIST)) color = 'grey'
    return COLOR_LIST[color].replace(/%s/, value);
  }
  
  /**
   * [fn.log] 控制台格式化打印值
   * @param value 
   * @param title
   * @param configs 
   * {title: string, width: number [20-100], isFmt: boolean
   * pre: boolean = false, end: boolean = false
   * color: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
   * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'}
   */
  public static log(value: any, title?: any, configs?: any) {
    let isFmt;
    if (FnType.typeVal(title, 'str')) {
      if (FnType.typeOf(configs, 'bol')) {
        isFmt = configs;
        configs = undefined;
      } else {
        isFmt = getIsFmt(configs);
      }
    } else if (FnType.typeOf(title, 'bol')) {
      isFmt = title;
      title = getTitle(configs);
    } else if (FnType.typeOf(title, 'obj')) {
      configs = title;
      isFmt = getIsFmt(configs);
      title = getTitle(configs);
    } else {
      isFmt = true;
      title = `funclib(${VERSION})`;
    }
    // Value
    value = FnString.pretty(value);
    // Title
    let time = `[${FnTime.fmtDate('hh:mm:ss')}] `;
    title = title.replace(/\n/mg, '');
    const originTtLength = (time + title + '[] ').length;
    if (!isFmt) title = `( ${title} )`;
    time = FnLog.chalk(time);
    const titlec = FnObject.get(configs, '/ttColor');
    const valuec = FnObject.get(configs, '/color');
    title = FnLog.chalk(title, titlec in COLOR_LIST && titlec || 'green');
    value = FnLog.chalk(value, valuec in COLOR_LIST && valuec || 'cyan');
    title = time + title;
    // Line width
    let width = FnObject.get(configs, '/width');
    if (!width || width < 30 || width > 100) width = 66;
    // Fix title width
    if (originTtLength > width) {
      const colorEnd = '\x1B[0m';
      const fixLength = title.length - originTtLength - colorEnd.length;
      title = FnString.cutString(title, width + fixLength - 3) + colorEnd;
    } else if (isFmt) {
      title = FnArray.array((width - originTtLength) / 2, ' ').join('') + title;
    }
    // Do log
    if (!isFmt) {
      console.log(`${title}:\n${value}`);
    } else {
      let sgLine = '', dbLine = '';
      FnArray.array(width).forEach(x => {
        sgLine += '-'; dbLine += '=';
      });
      if (FnObject.get(configs, '/pre', 'bol')) {
        console.log('\n' + dbLine);
        console.log(title);
        console.log(sgLine);
      } else if (FnObject.get(configs, '/end', 'bol')) {
        console.log(dbLine + '\n');
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
