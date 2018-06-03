export function extendJquery($, interval) {
  const intervalTimers: any = {};
  const timeoutTimers: any = {};
  $.extend({

    /**
     * [$.pollingElement] 轮询获取异步出现的jQuery元素
     * @param timerId
     * @param selector
     * @param interval
     * @param func [opt.]
     */
    pollingElement: function (timerId: string, selector: boolean | string | any[], interval: number, func?: Function) {
      if ((typeof selector === 'string' || selector instanceof Array) && typeof func === 'function') {
        let count = 0;
        const duration = 250;
        this.interval(timerId, duration, eles => {
          parseInt(String(interval / duration), 10) <= count ? this.interval(timerId, false) : count++;
          const tmpArr = [];
          const slts: any = typeof selector === 'string' ? [selector] : selector;
          slts.forEach(slt => {
            const $ele = $(slt);
            if ($ele.length > 0) {
              tmpArr.push($ele);
            }
          });
          if (tmpArr.length === slts.length) {
            this.interval(timerId, false);
            func(tmpArr);
          }
        });
      } else {
        this.interval(timerId, false);
      }
    },

    /**
     * [$.noAutoComplete] 防止input密码自动填充
     * @param options [{type: 'username'|'password', $input: $(input)} | [{}]]
     */
    noAutoComplete: function (options: Object | Object[]) {
      const noAutoCplt: Function = opt => {
        if (opt['type'] && opt['$input']) {
          if (['user', 'username'].indexOf(opt.type) > -1) {
            opt.$input
              .attr('autocomplete', 'off')
              .before('<input type="password" style="display: none"/>');
          } else if (['pwd', 'pass', 'password'].indexOf(opt.type) > -1) {
            opt.$input
              .attr({ autocomplete: 'new-password', type: 'text' })
              .on('input propertychange', function () {
                $(this).val() ? $(this).attr('type', 'password') : $(this).attr('type', 'text');
              });
          }
        }
      }
      options instanceof Array
        ? options.forEach(opt => noAutoCplt(opt))
        : noAutoCplt(options);
    },

   /**
     * [$.copyText] 复制文本到粘贴板
     * @param text [string]
     */
    copyText: function (text: string) {
      const $tmpIpt = $('<textarea></textarea>').css({position: 'fixed', left: '200%'});
      $('body').append($tmpIpt);
      $tmpIpt.val(text).select();
      document.execCommand('Copy');
      $tmpIpt.remove();
    }
  });

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
