import { FnType } from './modules/_Type';
import { FnArray } from './modules/_Array';
import { FnObject } from './modules/_Object';
import { FnString } from './modules/_String';
import { FnTime } from './modules/_Time';
import { FnRegExp } from './modules/_RegExp';
import { FnMath } from './modules/_Math';
import { FnFunction } from './modules/_Function';
import { FnUrl } from './modules/_Url';
import { FnLoger } from './modules/_Loger';
import { FnFileSys } from './modules/_FileSys';
import { FnProgress } from './modules/_Progress';
import { VERSION, MAIN_METHODS } from './funclib.conf'

const fnModules = [
  FnType, FnArray, FnObject, FnString, FnTime, FnRegExp,
  FnMath, FnFunction, FnUrl, FnLoger, FnFileSys
] 
const methods = [...MAIN_METHODS, 'chalk', 'rd', 'wt', 'cp', 'mv', 'rm', 'mk' ];

var fn: any = function() {}

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

fn.log = (value: any, configs: Object, isFmt: boolean) => {
  return FnLoger.log(false, value, configs, isFmt);
}

module.exports = fn;
