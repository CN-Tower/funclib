export class FnTrick {
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
