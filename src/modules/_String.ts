import { FnType } from './_Type';
import { FnRegExp } from './_RegExp';
import { FnObject } from './_Object';

const htmlMap = {
  src: ['&', '<', '>', ' ', '\'', '"'],
  map: ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;']
}

export class FnString {
  /**
   * [fn.match] 类型匹配，默认情况还可以写表达式
   * @param source
   * @param cases
   * @param isExec
   */
  public static match(source: string, cases: Object, isExec: boolean = true): any {
    let type_;
    if (FnObject.has(cases, source)) {
      type_ = source;
    } else if (FnObject.has(cases, '@default')) {
      type_ = '@default';
    }
    if (type_) {
      if (isExec && typeof cases[type_] === 'function') {
        return FnObject.len(cases[type_]) > 0 ? cases[type_](source) : cases[type_]()
      } else {
        return cases[type_];
      }
    }
    return undefined;
  }

  /**
   * [fn.pretty] 转换成格式化字符串
   * @param obj
   */
  public static pretty(obj: any) {
    return typeof obj === 'object' ? JSON.stringify(obj, null, 2) : String(obj);
  }

  /**
   * [fn.encodeHtml] 编码HTML字符串 同: fn.escape
   * @param html 
   */
  public static encodeHtml(html: string): string {
    htmlMap.src.forEach((src, i) => {
      html = html.replace(new RegExp(src, 'g'), htmlMap.map[i]);
    });
    return html;
  }
  public static escape = FnString.encodeHtml;

  /**
   * [fn.decodeHtml] 解码HTML字符串 同: fn.unescape
   * @param html 
   */
  public static decodeHtml(html: string): string {
    htmlMap.map.forEach((map, i) => {
      html = html.replace(new RegExp(map, 'g'), htmlMap.src[i]);
    });
    return html;
  }
  public static unescape = FnString.decodeHtml;

  /**
   * [fn.capitalize] 字符串首字母大写
   * @param str 
   */
  public static capitalize(str: string): string {
    return str && typeof str === 'string'
      ? str[0].toUpperCase() + str.substr(1) : str;
  }

  /**
 * [fn.fmtCurrency] 格式化显示货币
 * @param number
 * @param digit
 * @returns {string}
 */
  public static fmtCurrency(number: number, digit: number = 2): string {
    let nbArr = String(number.toFixed(digit)).split('.');
    const integer = nbArr[0];
    const decimal = nbArr.length > 1 ? nbArr[1] : '';
    let integerStr, spn, sti, i;
    spn = Math.floor(integer.length / 3);
    sti = integer.length % 3;
    integerStr = integer.substr(0, sti);
    for (i = 0; i < spn; i++) {
      integerStr += i === 0 && !integerStr
        ? integer.substr(sti, 3)
        : ',' + integer.substr(sti, 3);
      sti += 3;
    }
    return decimal ? integerStr + '.' + decimal : integerStr;
  }

  /**
   * [fn.cutString] 裁切字符串到指定长度
   * @param str
   * @param len
   * @returns {string}
   */
  public static cutString(str: string, len: number): string {
    let tmpStr = '';
    let count = 0;
    let tmpChar;
    for (let i = 0; i < str.length; i++) {
      if (count >= len) break;
      tmpChar = str.substr(i, 1);
      tmpStr += tmpChar;
      count += FnRegExp.matchPattern(tmpChar, 'cnChar') ? 2 : 1;
    }
    return tmpStr + '...';
  }

  /**
   * [fn.parseQueryStr] 解析Url参数成对象
   * @param url [string]
   */
  public static parseQueryStr(url?: string) {
    if (url.indexOf('?') === -1) return {};
    const queryStr = url.substring(url.lastIndexOf('?') + 1);
    if (queryStr === '') return {};
    const querys = queryStr.split('&');
    var params = {};
    for (var i = 0; i < querys.length; i++) {
      var kw = querys[i].split('=');
      params[decodeURIComponent(kw[0])] = decodeURIComponent(kw[1] || '');
    }
    return params;
  }

  /**
   * [fn.stringifyQueryStr] 把对象编译成Url参数
   * @param obj [string]
   */
  public static stringifyQueryStr(obj: Object) {
    if (!FnType.typeOf(obj, ['obj', 'arr'])) return '';
    obj = JSON.parse(JSON.stringify(obj));
    const pairs = [];
    FnObject.forIn(obj, (key, value) => {
      if (FnType.typeOf(value, 'arr')) {
        value.forEach((v, i) => {
          const _k = encodeURIComponent(`${key}[${i}]`);
          pairs.push(`${_k}=${encodeURIComponent(v)}`);
        });
      } else {
        const _v = encodeURIComponent(value);
        pairs.push(`${encodeURIComponent(key)}=${_v}`);
      }
    });
    return '?' + pairs.join('&');
  }
}
