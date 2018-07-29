import { FnArray } from './_Array';

export class FnType {
    /**
     * [fn.typeOf] 检查值的类型
     * @param value 
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    public static typeOf(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): boolean {
        const types = FnArray.toArray(type);
        if (types.length === 0) return false;
        return types.some(type => {
            switch (type) {
                case 'arr': return value && value instanceof Array;
                case 'obj': return value && typeof value === 'object' && !(value instanceof Array);
                case 'fun': return value && typeof value === 'function';
                case 'str': return typeof value === 'string';
                case 'num': return typeof value === 'number';
                case 'bol': return typeof value === 'boolean';
                case 'udf': return typeof value === 'undefined';
                default: return typeof value === type;
            }
        });
    }

    /**
     * [fn.typeVal] 检查是否为某类型的值，是则返回该值，不是则返回false
     * @param value 
     * @param type ['arr'|'obj'|'fun'|string|string[]]
     */
    public static typeVal(value: any, type: 'arr' | 'obj' | 'fun' | string | string[]): any {
        return FnType.typeOf(value, type) && value;
    }
}