export class FnObject {
    private static typeOf: Function;
    private static typeValue: Function;
    private static toArray: Function;
    private static log: Function;

    /**
     * [fn.len] 获取对象自有属性的个数
     * @arg obj [object]
     */
    public static len(obj: any): number {
        if (this.typeOf(obj, 'obj')) {
            return Object.keys(obj).length;
        } else if (this.typeOf(obj, ['str', 'arr', 'fun'])
            || this.get(obj, '/lenght', 'num')) {
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
    public static forIn(obj: Object, iteratee: any): void {
        return Object.keys(obj).forEach(iteratee);
    }

    /**
     * [fn.overlay] 给对象赋值
     * @param target 
     * @param source 
     * @param propList 
     */
    public static overlay(target: Object, source: Object, propList: string[]) {
        if (source) {
            if (propList && propList.length > 0) {
                propList.forEach(prop => {
                    if (source.hasOwnProperty(prop)) {
                        target[prop] = source[prop];
                    }
                });
            } else {
                Object.keys(source).forEach(key => {
                    target[key] = source[key];
                });
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
                tmpData.push(this.deepCopy(data[i]));
            }
        } else {
            tmpData = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    tmpData[key] = this.deepCopy(data[key]);
                }
            }
        }
        return tmpData;
    }

    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param obj [Object]
     * @param layers [string]
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    public static get(obj: Object, layers: string, type: string | string[]): any {
        if (!obj || !layers || !layers.trim()) {
            return undefined;
        }
        const lys = layers.trim().split('/');
        const prop = lys[0] || lys[1];
        if (lys.length === lys.indexOf(prop) + 1) {
            return type ? this.typeValue(obj[prop], type) : obj[prop];
        } else {
            if (this.typeOf(obj[prop], ['obj', 'arr'])) {
                if (lys.indexOf(prop)) {
                    lys.shift();
                }
                lys.shift();
                return this.get(obj[prop], lys.join('/'), type);
            } else {
                return undefined;
            }
        }
    }
}
