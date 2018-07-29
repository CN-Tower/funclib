import { FnType } from './_Type';
import { FnObject } from './_Object';

export class FnUrl {
    /**
     * [fn.parseQueryString] 解析Url参数成对象
     * @param url [string]  default: window.location.href
     */
    public static parseQueryString(url?: string) {
        url = url || typeof window !== 'undefined' && window.location.href || '';
        if(url.indexOf('?') === -1) return {};
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
     * [fn.stringfyQueryString] 把对象编译成Url参数
     * @param obj [string]  default: window.location.href
     */
    public static stringfyQueryString(obj: Object) {
        if (!FnType.typeOf(obj, 'object')) return '';
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
