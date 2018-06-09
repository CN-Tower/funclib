export class Mathematic {
    private static array: Function;
    
    /**
     * [fn.random] 返回一个指定范围内的随机数
     * @param sta 
     * @param end 
     */
    public static random(sta: number, end?: number): number {
        if (end === undefined || sta === end) {
            return Math.floor(Math.random() * sta);
        } else {
            if (sta > end) {
                const tmpSta = sta;
                sta = end;
                end = tmpSta;
            }
            return Math.floor(Math.random() * (end - sta) + sta)
        }
    }
    
    /**
     * [fn.rdId] 返回一个指定长度（最小4位）的随机ID
     * @param len 
     */
    public static rdId(len: number): string {
        const charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let eleId = '';
        if (len < 4) {
            len = 4;
        };
        this.array(len).forEach(x => eleId += charSet[this.random(charSet.length)]);
        return eleId;
    }

    /**
     * [fn.rdColor] 返回一个随机颜色色值
     */
    public static rdColor() {
        return '#' + ('00000' + (this.random(0x1000000) << 0).toString(16)).slice(-6);
    }
}
