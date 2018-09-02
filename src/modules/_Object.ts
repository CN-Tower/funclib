import { FnType } from './_Type';
import { FnArray } from './_Array'
import { Types } from '../funclib.conf';

export class FnObject {
  /**
   * [fn.len] 获取对象自有属性的个数
   * @arg obj
   */
  public static len(obj: any): number {
    if (FnType.typeOf(obj, 'obj')) {
      return Object.keys(obj).length;
    } else if (FnType.typeOf(obj, ['str', 'arr', 'fun'])
      || FnObject.get(obj, '/length', 'num')) {
      return obj.length;
    } else {
      return -1;
    }
  }

  /**
   * [fn.has] 判断对象是否存在某自有属性
   * @param obj 
   * @param property 
   */
  public static has(obj: any, property: string): boolean {
    return obj && obj.hasOwnProperty(property) || false;
  }

  /**
   * [fn.get] 返回对象或子孙对象的属性，可判断类型
   * @param obj [Object]
   * @param path [string]
   * @param type ['arr'|'obj'|'fun'|string|string[]]
   */
  public static get(obj: Object, path: string, ...types: Types[]): any {
    if (!obj || !FnType.typeOf(path, 'str')) return undefined;
    const paths = FnArray.drop(path.split('/'));
    const key = paths.shift();
    if (!key) return types.length ? FnType.typeVal(obj, ...types) : obj;
    if (paths.length) {
      if (!FnType.typeOf(obj[key], 'obj', 'arr')) return undefined;
      return FnObject.get(obj[key], paths.join('/'), ...types);
    } else {
      return types.length ? FnType.typeVal(obj[key], ...types) : obj[key];
    }
  }

  /**
   * [fn.pick] 获取对象的部分属性
   * @param srcObj
   * @param predicate
   * @param propList
   */
  public static pick(srcObj: Object, predicate: any, ...propList: string[]): any {
    return FnObject.propsTraversal({}, srcObj, predicate, propList, false);
  }

  /**
   * [fn.extend] 给对象赋值
   * @param tarObj 
   * @param srcObj 
   * @param predicate 
   * @param propList
   */
  public static extend(target: any, srcObj: any, predicate?: any, ...propList: string[]) {
    if (FnType.typeVal(srcObj, 'object')) {
      FnObject.propsTraversal(target, srcObj, predicate, propList, true);
    }
    return target;
  }

  private static propsTraversal(tarObj, srcObj, predicate, propList, isDoTraDft: boolean) {
    if (FnType.typeOf(predicate, 'str')) {
      propList.unshift(predicate);
      FnObject.doTraversal(tarObj, srcObj, propList);
    }
    else if (FnType.typeOf(predicate, 'arr')) {
      FnObject.doTraversal(tarObj, srcObj, predicate);
    }
    else if (FnType.typeOf(predicate, 'fun')) {
      FnObject.forIn(srcObj, (k, v) => {
        if (predicate(k, v)) tarObj[k] = v;
      });
    }
    else if (isDoTraDft) {
      FnObject.doTraversal(tarObj, srcObj, Object.keys(srcObj));
    }
    return tarObj;
  }

  private static doTraversal(tarObj: any, srcObj: any, propList: string[]) {
    propList.forEach(prop => {
      if (FnObject.has(srcObj, prop)) tarObj[prop] = srcObj[prop];
    });
  }

  /**
   * [fn.forIn] 遍历对象的可数自有属性
   * @arg obj
   * @arg iteratee
   */
  public static forIn(obj: any, iteratee: any): any {
    return FnArray.forEach(obj, (v, k) => iteratee(k, v));
  }

  /**
   * [fn.deepCopy] 深拷贝对象或数组
   * @param data
   */
  public static deepCopy(data: any) {
    if (typeof data !== 'object') return data;
    let tmpData;
    if (data instanceof Array) {
      tmpData = [];
      for (let i = 0; i < data.length; i++) {
        tmpData.push(FnObject.deepCopy(data[i]));
      }
    } else {
      tmpData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          tmpData[key] = FnObject.deepCopy(data[key]);
        }
      }
    }
    return tmpData;
  }

  /**
   * [fn.isEmpty] 判断对象是否为空对象或数组
   * @param srcObj
   */
  public static isEmpty(srcObj: any) {
    return FnObject.len(srcObj) === 0;
  }

  /**
   * [fn.isDeepEqual] 判断数组或对象是否相等
   * @param obj1 
   * @param obj2 
   * @param isStrict 
   */
  public static isDeepEqual(obj1: any, obj2: any, isStrict: boolean = false): boolean {
    if (typeof obj1 !== typeof obj2) return false;
    if (FnType.typeOf(obj1, 'arr') && FnType.typeOf(obj2, 'arr')) {
      if (obj1.length !== obj2.length) return false;
      for (let i = 0; i < obj1.length; i++) {
        if (!FnObject.isDeepEqual(obj1[i], obj2[i], isStrict)) return false;
      }
      return true;
    } else if (FnType.typeOf(obj1, 'obj') && FnType.typeOf(obj2, 'obj')) {
      if (FnObject.len(obj1) !== FnObject.len(obj2)) return false;
      const keys = Object.keys(obj1);
      if (isStrict && !FnObject.isDeepEqual(keys, Object.keys(obj2))) return false;
      for (let i = 0; i < keys.length; i++) {
        if (!obj2.hasOwnProperty(keys[i])) return false;
        if (!FnObject.isDeepEqual(obj1[keys[i]], obj2[keys[i]], isStrict)) return false;
      }
      return true;
    } else {
      return obj1 === obj2
    }
  }
}
