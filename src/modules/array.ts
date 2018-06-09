export class Array_ {
    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param length [number]
     * @param value  [any, function]
     */
    public static array(length: number, value?: any): any[] {
        const tmpArr = [];
        const isUndefied = value === undefined;
        const isFunction = typeof value === 'function';
        let tmpVal = 0;
        for (let i = 0; i < length; i++) {
            if (isUndefied) {
                tmpArr.push(tmpVal);
                tmpVal++;
            } else if (isFunction) {
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
     * [fn.sortByField] 对象数组根据字段排序
     * @param data
     * @param field
     * @param isDesc
     */
    public static sortByField(data: any, field: string, isDesc?: boolean) {
        return data.sort((row1, row2) => {
            return row1.hasOwnProperty(field) && row2.hasOwnProperty(field)
                ? row1[field] === row2[field]
                    ? 0
                    : isDesc
                        ? row1[field] > row2[field] ? -1 : 1
                        : row1[field] > row2[field] ? 1 : -1
                : 0;
        });
    }
}
