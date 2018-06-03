import { KEY_MAP } from './helper/keyMap'

export class Events {
    /**
     * [fn.getKeyCodeByName] 根据键名获取键码
     * @param keyName 
     */
    public static getKeyCodeByName(keyName: string): number {
        for (let keyCode in KEY_MAP) {
            if (KEY_MAP[keyCode] === keyName) {
                return Number(keyCode);
            }
        }
        return NaN;
    }

    /**
     * [fn.getKeyCodeByName] 根据键码获取键名
     * @param keyName 
     */
    public static getKeyNameByCode(keyCode: number): string {
        return KEY_MAP[keyCode] || '';
    }
}