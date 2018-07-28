import { FnType } from './_Type';
import { FnArray } from './_Array'

export class FnObject {
    /**
     * [fn.len] 获取对象自有属性的个数
     * @arg obj [object]
     */
    public static len(obj: any): number {
        if (FnType.typeOf(obj, 'obj')) {
            return Object.keys(obj).length;
        } else if (FnType.typeOf(obj, ['str', 'arr', 'fun'])
            || FnObject.get(obj, '/lenght', 'num')) {
            return obj.length;
        } else {
            return 0;
        }
    }

    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @arg obj
     * @arg iteratee
     */
    public static forIn(obj: any, iteratee: any): any {
        return FnArray.forEach(obj, (v, k) => iteratee(k, v));
    }

    /**
     * [fn.overlay] 给对象赋值
     * @param target 
     * @param source 
     * @param propList 
     */
    public static overlay(target: Object, source: Object, propList?: string[]) {
        if (source) {
            if (propList && propList.length > 0) {
                propList.forEach(prop => {
                    if (source.hasOwnProperty(prop)) {
                        target[prop] = source[prop];
                    }
                });
            } else {
                Object.keys(source).forEach(key => target[key] = source[key]);
            }
        }
        return target;
    }

    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param data
     */
    public static deepCopy(data: any) {
        if (typeof data !== 'object') { return data; }
        let tmpData;
        if (data instanceof Array) {
            tmpData = [];
            for (let i = 0; i < data.length; i++) {
                tmpData.push(FnObject.deepCopy(data[i]));
            }
        } else {
            tmpData = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    tmpData[key] = FnObject.deepCopy(data[key]);
                }
            }
        }
        return tmpData;
    }

    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param obj [Object]
     * @param path [string]
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    public static get(obj: Object, path: string, type?: 'arr' | 'obj' | 'fun' | string | string[]): any {
        if (!obj || !path || !path.trim()) return undefined;
        const paths = path.trim().split('/');
        const prop = paths[0] || paths[1];
        if (paths.length === paths.indexOf(prop) + 1) {
            return type ? FnType.typeValue(obj[prop], type) : obj[prop];
        } else {
            if (FnType.typeOf(obj[prop], ['obj', 'arr'])) {
                if (paths.indexOf(prop)) paths.shift();
                paths.shift();
                return FnObject.get(obj[prop], paths.join('/'), type);
            } else {
                return undefined;
            }
        }
    }
}
