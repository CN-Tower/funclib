import { FnArray } from './_Array';

export class FnMath {
    /**
     * [fn.random] 返回一个指定范围内的随机数
     * @param sta 
     * @param end 
     */
    public static random(sta: number, end?: number): number {
        if (sta === undefined && end === undefined) {
            return Math.random();
        } else if (end === undefined || sta === end) {
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
     * [fn.rdid] 返回一个指定长度的随机ID
     * @param len 
     */
    public static rdid(len: number = 12): string {
        const charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let id = '';
        FnArray.array(len).forEach(x => id += charSet[FnMath.random(charSet.length)]);
        return id;
    }

    /**
     * [fn.rdColor] 返回一个随机颜色色值
     */
    public static rdcolor() {
        return '#' + ('00000' + (FnMath.random(0x1000000) << 0).toString(16)).slice(-6);
    }
}
