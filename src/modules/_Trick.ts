export class FnTrick {
    
    /**
     * [fn.copyText] 复制文本到粘贴板
     * @param text [string]
     */
    public static copyText(text: string = ''): void {
        let textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.left = '200%';
        document.body.appendChild(textarea)
        textarea.value = text;
        textarea.select();
        document.execCommand('Copy');
        document.body.removeChild(textarea);
    }

    public static extendJquery(jquery?: any) {
        const $ = jquery || window['jquery'] || window['jQuery'] || null;
        if ($) {
            // $.extend({});
            /**
             * [$ele.findCousin] 寻找元素的表亲
             * @param selector [string]
             * @param level    [number]
             */
            $.fn.findCousin = function (selector: string, level: number = 0) {
                if (!level) {
                return selector ? this.parents().find(selector) : this.parents();
                } else {
                let $parent = this;
                for (let i = 0; i < level; i++) {
                    $parent = $parent.parent();
                }
                return selector ? $parent.find(selector) : $parent;
                }
            };
        }
        return !!$;
    }
}
