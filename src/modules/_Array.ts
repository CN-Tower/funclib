import { FnType } from './_Type';
import { FnObject } from './_Object';

export class FnArray {
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
     * @param value 
     */
    public static toArray(value: any): any[] {
        return value instanceof Array ? value : [value];
    }

    /**
     * [fn.find] 根据条件取值
     * @param srcArr 
     * @param predicate 
     */
    public static find(srcArr: any[], predicate: any): any {
        const idx = FnArray.indexOf(srcArr, predicate);
        return idx > -1 ? srcArr[idx] : undefined;
    }

    /**
     * [fn.filter] 根据条件取过滤值
     * @param srcArr 
     * @param predicate 
     */
    public static filter(srcArr: any[], predicate: any): any[] {
        return FnArray._filter(srcArr, predicate, true);
    }

    /**
     * [fn.reject] 根据条件过滤值
     * @param srcArr 
     * @param predicate 
     */
    public static reject(srcArr: any[], predicate: any): any[] {
        return FnArray._filter(srcArr, predicate, false);
    }

    /**
     * 过滤函数
     * @param srcArr 
     * @param predicate 
     */
    private static _filter(srcArr: any[], predicate: any, isFlt: boolean): any[] {
        const ftItems = [];
        const rjItems = [];
        srcArr.forEach(item => {
            if (FnType.typeOf(predicate, 'obj')) {
                if (Object.keys(predicate).every(k => predicate[k] === item[k])) {
                    ftItems.push(item);
                } else {
                    rjItems.push(item);
                }
            } else if (FnType.typeOf(predicate, 'fun')) {
                predicate(item) ? ftItems.push(item) : rjItems.push(item);
            }
        });
        return isFlt ? ftItems : rjItems;
    }

    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param srcArr 
     * @param predicate 
     */
    public static contains(srcArr: any[], predicate: any): boolean {
        const idx = FnArray.indexOf(srcArr, predicate);
        return idx > -1;
    }
    
    /**
     * [fn.drop] 去掉Boolean()后为false和空数组或对象的值
     * @param srcArr 
     * @param isDrop0 
     */
    public static drop(srcArr: any[], isDrop0: boolean = false): any[] {
        return;
    }

    /**
     * [fn.flatten] 把有结构的数组打散，减少层数
     * @param srcArr 
     * @param isDeep 
     */
    public static flatten(srcArr: any[], isDeep: boolean = false): any[] {
        return;
    }

    /**
     * [fn.pluck] 把结构中的字段取出合并到一个数组中
     * @param obj 
     * @param path 
     * @param isUniq 
     */
    public static pluck(obj: any, path: string, isUniq: boolean = false): any[] {
        return;
    }

    /**
     * [fn.uniq] 把
     * @param srcArr 
     * @param path 
     */
    public static uniq(srcArr: any[], path: string): any[] {
        return;
    }

    /**
     * [fn.indexOf] 寻找值在数组中的索引
     * @param srcArr 
     * @param predicate 
     */
    public static indexOf(srcArr: any[], predicate: any): number {
        for (let i = 0; i < srcArr.length; i++) {
            if (FnType.typeOf(predicate, 'obj')) {
                let isInSrc = Object.keys(predicate).every(k => {
                    return srcArr[i][k] === predicate[k];
                });
                if (isInSrc) return i;
            } else if (FnType.typeOf(predicate, 'fun')) {
                if (predicate(srcArr[i])) return i;
            }
        }
        return srcArr.indexOf(predicate);
    }

    /**
     * [fn.forEach] 遍历数组或类数组
     * @param obj
     * @param iteratee
     */
    public static forEach(obj: any, iteratee: any): any {
        const length = FnObject.get(obj, '/length', 'num');
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
     * @param srcArr
     * @param field
     * @param isDesc
     */
    public static sortBy(srcArr: any, field: string, isDesc: boolean = false) {
        return [...srcArr].sort((row1, row2) => {
            const [rst1, rst2] = [FnObject.get(row1, field), FnObject.get(row2, field)];
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
