import { FnType } from './_Type';
import { FnArray } from './_Array'

export class FnObject {
  /**
   * [fn.len] 获取对象自有属性的个数
   * @arg obj [object]
   */
  public static len(obj: any): number {
    if (FnType.typeOf(obj, 'obj')) {
      return Object.keys(obj).length;
    } else if (FnType.typeOf(obj, ['str', 'arr', 'fun'])
      || FnObject.get(obj, '/length', 'num')) {
      return obj.length;
    } else {
      return 0;
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
   * [fn.forIn] 遍历对象的可数自有属性
   * @arg obj
   * @arg iteratee
   */
  public static forIn(obj: any, iteratee: any): any {
    return FnArray.forEach(obj, (v, k) => iteratee(k, v));
  }

  /**
   * [fn.overlay] 给对象赋值
   * @param target 
   * @param source 
   * @param propList 
   */
  public static overlay(target: Object, source: Object, propList?: string[]) {
    if (source) {
      if (propList && propList.length > 0) {
        propList.forEach(prop => {
          if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
          }
        });
      } else {
        Object.keys(source).forEach(key => target[key] = source[key]);
      }
    }
    return target;
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

  /**
   * [fn.get] 返回对象或子孙对象的属性，可判断类型
   * @param obj [Object]
   * @param path [string]
   * @param type ['arr'|'obj'|'fun'|string|string[]]
   */
  public static get(obj: Object, path: string, type?: 'arr' | 'obj' | 'fun' | string | string[]): any {
    if (!obj || !FnType.typeOf(path, 'str')) return undefined;
    const paths = FnArray.drop(path.split('/'));
    const key = paths.shift();
    if (!key) return type ? FnType.typeVal(obj, type) : obj;
    if (paths.length) {
      if (!FnType.typeOf(obj[key], ['obj', 'arr'])) return undefined;
      return FnObject.get(obj[key], paths.join('/'), type);
    } else {
      return type ? FnType.typeVal(obj[key], type) : obj[key];
    }
  }

  /**
   * [fn.pick] 获取对象的部分属性
   * @param obj
   * @param predicate
   */
  public static pick(obj: Object, predicate: any): any {
    const tmpObj = {};
    if (FnType.typeOf(predicate, 'str')) {
      const rst = FnObject.get(obj, predicate);
      if (rst) tmpObj[predicate] = rst;
    }
    else if (FnType.typeOf(predicate, 'arr')) {
      predicate.forEach(pd => {
        const rst = FnObject.get(obj, pd);
        if (rst) tmpObj[pd] = rst;
      });
    }
    else if (FnType.typeOf(predicate, 'fun')) {
      FnObject.forIn(obj, (k, v) => {
        if (predicate(k, v)) tmpObj[k] = v;
      });
    }
    return tmpObj;
  }
}
