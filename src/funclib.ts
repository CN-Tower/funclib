import { FnType } from './modules/_Type';
import { FnArray } from './modules/_Array';
import { FnObject } from './modules/_Object';
import { FnString } from './modules/_String';
import { FnTime } from './modules/_Time';
import { FnRegExp } from './modules/_RegExp';
import { FnMath } from './modules/_Math';
import { FnFunction } from './modules/_Function';
import { FnCookie } from './modules/_Cookie';
import { FnDom } from './modules/_Dom';
import { FnTrick } from './modules/_Trick';
import { FnLog } from './modules/_Logc';
import { VERSION, MAIN_METHODS } from './funclib.conf'

const fnModules = [
  FnType, FnArray, FnObject, FnString, FnTime, FnRegExp,
  FnMath, FnFunction, FnCookie, FnDom, FnTrick, FnLog
]

const methods = [
  ...MAIN_METHODS,
  'fullScreen',
  'exitFullScreen',
  'isFullScreen',
  'fullScreenChange',
  'noAutoComplete',
  'setCookie',
  'getCookie',
  'removeCookie',
  'copyText',
];

let _fn: any = {};
fnModules.forEach(fnModule => {
  FnObject.forIn(fnModule, (mtd, method) => {
    if (methods.indexOf(mtd) > -1) _fn[mtd] = function () {
      let args: any = arguments;
      args = Object.keys(args).map(key => args[key]);
      return _fn.data !== undefined ? method(_fn.data, ...args) : method(...args);
    }
  });
});

var fn: any = function (data: any) {
  _fn.data = data;
  return _fn;
}

fnModules.forEach(fnModule => {
  FnObject.forIn(fnModule, (mtd, method) => {
    if (methods.indexOf(mtd) > -1) fn[mtd] = method;
  });
});

fn.version = VERSION;

module.exports = fn;
