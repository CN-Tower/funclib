export class FnCookie {
    /**
     * [fn.setCookie] 设置Cookie
     * @param name 
     * @param value 
     * @param days 
     */
    public static setCookie(name: string, value: string, days: number = 0) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        document.cookie = `${name}=${value};expires=${date}`;
    }

    /**
     * [fn.getCookie] 根据name读取cookie
     * @param  name 
     * @return {String}
     */
    public static getCookie(name: string): string {
        const cks = document.cookie.replace(/\s/g, "").split(';');
        for (let i = 0; i < cks.length; i++) {
            const tempArr = cks[i].split('=');
            if (tempArr[0] == name) {
                return decodeURIComponent(tempArr[1]);
            }
        }
        return '';
    }

    /**
     * [fn.removeCookie] 根据name删除cookie
     * @param name 
     */
    public static removeCookie(name: string) {
        FnCookie.setCookie(name, '1', -1);
    }
}
