export class FnArray {
    private static get: Function
    private static typeOf: Function

    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param length [number]
     * @param value  [any, function]
     */
    public static array(length: number, value?: any): any[] {
        const tmpArr = [];
        let tmpVal = 0;
        for (let i = 0; i < length; i++) {
            if (value === undefined) {
                tmpArr.push(tmpVal);
                tmpVal++;
            } else if (typeof value === 'function') {
                tmpArr.push(value());
            } else {
                tmpArr.push(value);
            }
        }
        return tmpArr;
    }

    /**
     * [fn.toArray] 值数组化
     * @param src 
     */
    public static toArray(src: any): any[] {
        return src instanceof Array ? src : [src];
    }

    /**
     * [fn.find] 根据条件取值
     * @param src 
     * @param predicate 
     */
    public static find(src: any[], predicate: any): any {
        const idx = this.findIndex(src, predicate);
        return idx > -1 ? src[idx] : undefined;
    }

    /**
     * [fn.filter] 根据条件取过滤值
     * @param src 
     * @param predicate 
     */
    public static filter(src: any[], predicate: any): any[] {
        return FnArray._filter.call(this, src, predicate, true);
    }

    /**
     * [fn.reject] 根据条件过滤值
     * @param src 
     * @param predicate 
     */
    public static reject(src: any[], predicate: any): any[] {
        return FnArray._filter.call(this, src, predicate, false);
    }

    /**
     * 过滤函数
     * @param src 
     * @param predicate 
     */
    private static _filter(src: any[], predicate: any, isFlt: boolean): any[] {
        const ftItems = [];
        const rjItems = [];
        src.forEach(item => {
            if (this.typeOf(predicate, 'obj')) {
                if (Object.keys(predicate).every(k => predicate[k] === item[k])) {
                    ftItems.push(item);
                } else {
                    rjItems.push(item);
                }
            } else if (this.typeOf(predicate, 'fun')) {
                predicate(item) ? ftItems.push(item) : rjItems.push(item);
            }
        });
        return isFlt ? ftItems : rjItems;
    }

    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param src 
     * @param predicate 
     */
    public static contains(src: any[], predicate: any): boolean {
        const idx = this.findIndex(src, predicate);
        return idx > -1;
    }

    /**
     * [fn.findIndex] 寻找值在数组中的索引
     * @param src 
     * @param predicate 
     */
    public static findIndex(src: any[], predicate: any): number {
        for (let i = 0; i < src.length; i++) {
            if (this.typeOf(predicate, 'obj')) {
                let isInSrc = Object.keys(predicate).every(k => {
                    return src[i][k] === predicate[k];
                });
                if (isInSrc) return i;
            } else if (this.typeOf(predicate, 'fun')) {
                if (predicate(src[i])) return i;
            }
        }
        return src.indexOf(predicate);
    }

    /**
     * [fn.forEach] 遍历数组或类数组
     * @param obj
     * @param iteratee
     */
    public static forEach(obj: any, iteratee: any): any {
        const length = this.get(obj, '/length', 'num');
        if (length && length >= 0 && length < Math.pow(2, 53) - 1) {
            for(let i = 0; i < length; i ++) {
                iteratee(obj[i], i);
            }
        } else {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i ++) {
                iteratee(obj[keys[i]], keys[i]);
            }
        }
        return obj;
    }

    /**
     * [fn.sortBy] 返回对象数组根据字段排序后的副本
     * @param data
     * @param field
     * @param isDesc
     */
    public static sortBy(data: any, field: string, isDesc: boolean = false) {
        return [...data].sort((row1, row2) => {
            const [rst1, rst2] = [this.get(row1, field), this.get(row2, field)];
            if ([rst1, rst2].some(x => x !== 0 && !x) || rst1 === rst2) {
                return 0;
            } else {
                return rst1 > rst2
                    ? isDesc ? -1 : 1
                    : isDesc ? 1 : -1
            }
        });
    }
}
