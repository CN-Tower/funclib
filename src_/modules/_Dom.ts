import { FnType } from './_Type';

const event = 'fullscreenchange';
const events = [event, `webkit${event}`, `moz${event}`, `MS${event}`];
const addFsChangeEvent = () => events.forEach(e => {
  document.addEventListener(e, window['onfullscreen']);
});
const removeFsChangeEvent = () => events.forEach(e => {
  document.removeEventListener(e, window['onfullscreen']);
});

export class FnDom {
  /**
   * [fn.fullScreen] 全屏显示HTML元素
   * @param el
   * @returns {any}
   */
  public static fullScreen(el: any): any {
    if (typeof el === 'string') el = document.querySelector(el);
    if (el && el.tagName) {
      const rfs = el['requestFullScreen'      ]
               || el['webkitRequestFullScreen']
               || el['mozRequestFullScreen'   ]
               || el['msRequestFullScreen'    ];
      if (rfs) return rfs.call(el);
      if (window['ActiveXObject']) {
        const ws = new window['ActiveXObject']("WScript.Shell");
        if (ws) { ws.SendKeys("{F11}"); }
      }
    }
  }

  /**
   * [fn.exitFullScreen] 退出全屏显示
   * @returns {any}
   */
  public static exitFullScreen(): any {
    const cfs = document['cancelFullScreen'      ]
             || document['webkitCancelFullScreen']
             || document['mozCancelFullScreen'   ]
             || document['exitFullScreen'        ];
    if (cfs) return cfs.call(document);
    if (window['ActiveXObject']) {
      const ws = new window['ActiveXObject']("WScript.Shell");
      if (ws != null) { ws.SendKeys("{F11}"); }
    }
  }

  /**
   * [fn.isFullScreen] 检测是否全屏状态
   * @returns {boolean}
   */
  public static isFullScreen(): boolean {
    return document['fullscreenEnabled'   ]
        || window  ['fullScreen'          ]
        || document['mozFullscreenEnabled']
        || document['webkitIsFullScreen'  ]
        || document['msIsFullScreen'      ]
        || false;
  }

  /**
   * [fn.fullScreenChange] 全屏状态变化事件
   * @param callback
   */
  public static fullScreenChange(callback?: boolean | any): any {
    if (FnType.typeOf(callback, 'fun')) {
      window['onfullscreen'] = callback;
      addFsChangeEvent();
    } else if (window['onfullscreen']) {
      if (callback === false) {
        removeFsChangeEvent();
      } else {
        return { off: removeFsChangeEvent };
      }
    }
  }

  /**
   * [fn.noAutoComplete] 防止input密码自动填充
   * @param input [HTMLInputElement]
   * @param type ['username'|'password']
   */
  public static noAutoComplete(input: any, type: 'username' | 'password'): void {
    if (typeof input === 'string') input = document.querySelector(input);
    if (input && input.tagName === 'INPUT') {
      switch (type) {
        case 'username':
          input.setAttribute('autocomplete', 'off');
          const ipt = document.createElement('input');
          ipt.setAttribute('type', 'password');
          ipt.style.display = 'none';
          input.parentNode.insertBefore(ipt, input);
          break;
        case 'password':
          input.setAttribute('autocomplete', 'new-password');
          break;
      }
    }
  }
}
