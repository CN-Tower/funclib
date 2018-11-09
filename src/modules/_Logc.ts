import { FnArray } from './_Array';
import { FnObject } from './_Object';
import { FnString } from './_String';
import { FnTime } from './_Time';
import { FnType } from './_Type';
import { VERSION } from '../funclib.conf';

const getIsFmt = configs => FnObject.has(configs, 'isFmt') ? configs.isFmt : true;
const getTitle = configs => FnObject.get(configs, '/title') || `funclib(${VERSION})`

export class FnLog {
  /**
   * [fn.log] 控制台格式化打印值
   * @param value 
   * @param title 
   * @param configs
   * {title: string, width: number [20-100], isFmt: boolean}
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
    title = time + title;
    // Line width
    let width = FnObject.get(configs, '/width');
    if (!width || width < 30 || width > 100) width = 66;
    // Fix title width
    if (originTtLength > width) {
      title = FnString.cutString(title, width - 3);
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
      console.log(`\n${dbLine}\n${title}\n${sgLine}\n${value}\n${dbLine}\n`);
    }
  }
}
