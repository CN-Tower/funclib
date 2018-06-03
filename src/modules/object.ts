export class Obj {
    /**
     * [fn.length] 获取对象自有属性的个数
     * @arg obj [object]
     */
    public static len(obj: any): number {
        if (obj && typeof obj === 'object' && ! (obj instanceof Array)) {
            return Object.keys(obj).length;
        } else {
            return obj && obj[length] || undefined;
        }
    }

    /**
     * [fn.isEmpty] 判断对象是否为空对象或数组
     * @param obj 
     */
    public static isEmpty(obj: Object | any[]): boolean {
        return obj && !Obj.len(obj) || false;
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
}