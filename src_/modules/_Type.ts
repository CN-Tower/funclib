import { Types } from '../funclib.conf';

export class FnType {
  /**
   * [fn.typeOf] 检查值的类型
   * @param value
   * @param type_
   * @param types
   */
  public static typeOf(value: any, type_: Types|Types[]|any, ...types: Types[]): boolean {
    if (!type_) return false;
    type_ instanceof Array ? types = type_ : types.unshift(type_);
    return types.some(type => {
      switch (type) {
        case 'arr': return value && value instanceof Array;
        case 'obj': return value && typeof value === 'object' && !(value instanceof Array);
        case 'fun': return value && typeof value === 'function';
        case 'str': return typeof value === 'string';
        case 'num': return typeof value === 'number';
        case 'bol': return typeof value === 'boolean';
        case 'udf': return typeof value === 'undefined';
        default: return typeof value === type;
      }
    });
  }

  /**
   * [fn.typeVal] 检查是否为某类型的值，是则返回该值，不是则返回false
   * @param value 
   * @param type_
   * @param types
   */
  public static typeVal(value: any, type_?: Types|Types[]|any, ...types: Types[]): any {
    return FnType.typeOf(value, type_, ...types) && value;
  }
}
