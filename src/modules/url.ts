export class Url {
    private static isTypeOf: Function;
    
    /**
     * [fn.parseQueryString] 解析Url参数成对象
     * @param url [string]  default: window.location.href
     */
    public static parseQueryString(url: string) {
        url = url || window.location.href;
        if(url.indexOf('?') === -1) {
            return {};
        }
        const queryStr = url.substring(url.lastIndexOf('?') + 1);
        if (queryStr === '') {
            return {};
        }
        const querys = queryStr.split('&');
        var params = {};
        for (var i = 0; i < querys.length; i++) {
            var kw = querys[i].split('=');
            params[decodeURIComponent(kw[0])] = decodeURIComponent(kw[1] || '');
        }
        return params;
    }

    /**
     * [fn.stringfyQueryString] 把对象编译成Url参数
     * @param obj [string]  default: window.location.href
     */
    public static stringfyQueryString(obj: Object) {
        if (!this.isTypeOf(obj, 'obj')) {
            return '';
        }
        var pairs = [];
        for (var key in obj) {
            var value = obj[key];
            if (value instanceof Array) {
                for (var i = 0; i < value.length; ++i) {
                    pairs.push(encodeURIComponent(`${key}[${i}]`) + '=' + encodeURIComponent(value[i]));
                }
                continue;
            }
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return '?' + pairs.join('&');
    }
}