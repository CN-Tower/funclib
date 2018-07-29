import { FnType } from './modules/_Type';
import { FnArray } from './modules/_Array';
import { FnObject } from './modules/_Object';
import { FnString } from './modules/_String';
import { FnTime } from './modules/_Time';
import { FnRegExp } from './modules/_RegExp';
import { FnMath } from './modules/_Math';
import { FnFunction } from './modules/_Function';
import { FnUrl } from './modules/_Url';
import { FnFileSys } from './modules/_FileSys';
import { FnProgress } from './modules/_Progress';
import { FnLog } from './modules/_Logs';
import { VERSION, MAIN_METHODS } from './funclib.conf'

const fnModules = [
  FnType, FnArray, FnObject, FnString, FnTime, FnRegExp,
  FnMath, FnFunction, FnUrl, FnFileSys, FnLog
] 
const methods = [...MAIN_METHODS, 'chalk', 'rd', 'wt', 'cp', 'mv', 'rm', 'mk' ];

let _fn: any = {};
fnModules.forEach(fnModule => {
  FnObject.forIn(fnModule, (mtd, method) => {
    if (methods.indexOf(mtd) > -1) _fn[mtd] =  function() {
      let args: any = arguments;
      args = Object.keys(args).map(key => args[key]);
      return _fn.data !== undefined ? method(_fn.data, ...args) : method(...args);
    }
  });
});

var fn: any = function(data: any) {
  _fn.data = data;
  return _fn;
}

fnModules.forEach(fnModule => {
  FnObject.forIn(fnModule, (mtd, method) => {
    if (methods.indexOf(mtd) > -1) fn[mtd] = method;
  });
});

fn.version = VERSION;

fn.progress = {
  start: FnProgress.start,
  stop: FnProgress.stop
};

module.exports = fn;
