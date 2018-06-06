export class Str {
    private static matchPattern: any;

    private static htmlMap = {
        src: ['&', '<', '>', ' ', '\'', '"'],
        map: ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;']
    }

    /**
     * [fn.encodeHtml] 编码HTML字符串
     * @param html 
     */
    public static encodeHtml(html: string): string {
        this.htmlMap.src.forEach((src, i) => html = html.replace(new RegExp(src, 'g'), this.htmlMap.map[i]));
        return html;
    }

    /**
     * [fn.decodeHtml] 解码HTML字符串
     * @param html 
     */
    public static decodeHtml(html: string): string {
        this.htmlMap.map.forEach((map, i) => html = html.replace(new RegExp(map, 'g'), this.htmlMap.src[i]));
        return html;
    }

    /**
   * [fn.currency] 格式化显示货币
   * @param number
   * @param digit
   * @returns {string}
   */
    public static currency(number: number, digit: number): string {
        let nbArr = String(number.toFixed(digit)).split('.');
        const integer = nbArr[0];
        const decimal = nbArr.length > 1 ? nbArr[1] : '';
        let integerStr, spn, sti, i;
        spn = Math.floor(integer.length / 3);
        sti = integer.length % 3;
        integerStr = integer.substr(0, sti);
        for (i = 0; i < spn; i++) {
            integerStr += (i === 0 && !integerStr) ? integer.substr(sti, 3) : ',' + integer.substr(sti, 3);
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
    public static cutString(str, len): string {
        let tmpStr = '';
        let count = 0;
        let tmpChar;
        for (let i = 0; i < str.length; i++) {
            if (count < len) {
                tmpChar = str.substr(i, 1);
                tmpStr += tmpChar;
                count += this.matchPattern(tmpChar, 'cnChar') ? 2 : 1;
            } else {
                break;
            }
        }
        return tmpStr + '...';
    }
}