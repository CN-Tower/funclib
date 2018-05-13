export /*pxfunc*/ class ViewToolsHelper {
  translate: any;
  viewToolsCtrl: any;

  constructor(translate: any, viewToolsCtrl: any) {
    this.translate = translate;
    this.viewToolsCtrl = viewToolsCtrl;
  }

  viewToolsHandler(options: any) {
    if (options.type === 'timer') {
      if (options.hasOwnProperty('fn') && options.fn instanceof Function) {
        setTimeout(() => options.fn(), options.delay || 2000);
      }
    } else {
      if (options.hasOwnProperty('delay')) {
        setTimeout(() => {
          if (options.hasOwnProperty('fn') && options.fn instanceof Function) {options.fn(); }
          this.viewToolsCtrl.next(this._optionsHandler(options));
        }, options.delay);
      } else {
        this.viewToolsCtrl.next(this._optionsHandler(options));
      }
    }
  }

  private _optionsHandler(option: any) {
    if (!option.hasOwnProperty('isShow')) {
      option.isShow = true;
    }
    if (option.isShow && option.type === 'success' && !option.hasOwnProperty('msg')) {
      option.msg = this.translate.instant('vm.opOkMsg');
    }
    if (option.isShow && !option.hasOwnProperty('interval')) {
      option.interval = option.type === 'loader' ? 20000 : 2000;
    } return option;
  }
}
