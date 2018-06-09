export class Pattern {
  /* tslint:disable */
  // 匹配汉字
  private static cnCharPattern: any = /[\u4e00-\u9fa5]+/;
  // 匹配双字节字符
  private static dblBitCharPattern: any = /[^x00-xff]/;
  // 匹配Email
  private static emailPattern: any = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 匹配中国大陆手机号码
  private static mobPhonePattern: any = /(\+?0?86\-?)?1[3456789]\d{9}/;
  // 匹配中国大陆电话号码，格式为“XXXX-XXXXXXX”，“XXXX-XXXXXXXX”，“XXX-XXXXXXX”，“XXX-XXXXXXXX”，“XXXXXXX”，“XXXXXXXX”
  private static telPhonePattern: any = /((d{3,4})|d{3,4}-)?d{7,8}/;
  // 匹配中国大陆身份证
  private static idCardPattern: any = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/;
  // 匹配Base64编码格式
  private static base64CodePattern: any = /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/;
  // 匹配Mac地址
  private static macPattern: any = /[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}/;
  // 匹配域名
  private static domainPattern: any = /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/;
  // 匹配端口号
  private static portPattern: any = /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/;
  // 匹配IPv4地址
  private static ipv4Pattern: any = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/;
  // 匹配IPv6地址
  private static ipv6Pattern: any = new RegExp('' +
    '([\\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
    '|::([\\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
    '|([\\da-fA-F]{1,4}:):([\\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
    '|([\\da-fA-F]{1,4}:){2}:([\\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
    '|([\\da-fA-F]{1,4}:){3}:([\\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
    '|([\\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)' +
    '|([\\da-fA-F]{1,4}:){7}[\\da-fA-F]{1,4}' +
    '|:((:[\\da-fA-F]{1,4}){1,6}|:)' +
    '|[\\da-fA-F]{1,4}:((:[\\da-fA-F]{1,4}){1,5}|:)' +
    '|([\\da-fA-F]{1,4}:){2}((:[\\da-fA-F]{1,4}){1,4}|:)' +
    '|([\\da-fA-F]{1,4}:){3}((:[\\da-fA-F]{1,4}){1,3}|:)' +
    '|([\\da-fA-F]{1,4}:){4}((:[\\da-fA-F]{1,4}){1,2}|:)' +
    '|([\\da-fA-F]{1,4}:){5}:([\\da-fA-F]{1,4})?' +
    '|([\\da-fA-F]{1,4}:){6}:');
  // 匹配IP
  private static ipPattern: any = new RegExp(`(${Pattern.ipv4Pattern.source}|${Pattern.ipv6Pattern.source})`);
  // 匹配IPv4 cidr
  private static ipv4CidrPattern: any = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]|1[0-9]|2[0-9]|3[0-2]))/;
  // 匹配IPV6 cidr
  private static ipv6CidrPattern: any = new RegExp('s*(' +
    '(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))' +
    '|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))' +
    '|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))' +
    '|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
    '|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
    '|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
    '|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
    '|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))' +
    ')(\\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))');
  // 匹配IPv4范围
  private static ipv4IpRangePattern: any = new RegExp(`((${Pattern.ipv4Pattern.source})-(${Pattern.ipv4Pattern.source});)*(${Pattern.ipv4Pattern.source})-(${Pattern.ipv4Pattern.source})`);
  // 匹配IPv6范围
  private static ipv6IpRangePattern: any = new RegExp(`((${Pattern.ipv6Pattern.source})-(${Pattern.ipv6Pattern.source});)*(${Pattern.ipv6Pattern.source})-(${Pattern.ipv6Pattern.source})`);
  // 匹配IPv4 Url
  private static ipv4UrlPattern: any = new RegExp(`http(s)?://${Pattern.ipv4Pattern.source}(:${Pattern.portPattern.source})?`);
  // 匹配IPv6 Url
  private static ipv6UrlPattern: any = new RegExp(`http(s)?://\\[(${Pattern.ipv6Pattern.source})\\](:${Pattern.portPattern.source})?`);
  // 匹配Domain Url
  private static domainUrlPattern: any = new RegExp(`http(s)?://${Pattern.domainPattern.source}(:${Pattern.portPattern.source})?`);
  // 匹配Url
  private static urlPattern: any = new RegExp(`http(s)?://(${Pattern.ipv4Pattern.source}|\\[(${Pattern.ipv6Pattern.source})\\]|${Pattern.domainPattern.source})(:${Pattern.portPattern.source})?`);
  // 匹配必需带端口的IPv4 Url
  private static ipv4WithPortUrlPattern: any = new RegExp(`http(s)?://${Pattern.ipv4Pattern.source}:${Pattern.portPattern.source}`);
  // 匹配必需带端口的IPv6 Url
  private static ipv6WithPortUrlPattern: any = new RegExp(`http(s)?://\\[(${Pattern.ipv6Pattern.source})\\]:${Pattern.portPattern.source}`);
  // 匹配必需带端口的Domain Url
  private static domainWithPortUrlPattern: any = new RegExp(`http(s)?://${Pattern.domainPattern.source}:${Pattern.portPattern.source}`);
  // 匹配必需带端口的Url
  private static withPortUrlPattern: any = new RegExp(`http(s)?://(${Pattern.ipv4Pattern.source}|\\[(${Pattern.ipv6Pattern.source})\\]|${Pattern.domainPattern.source}):${Pattern.portPattern.source}`);
  /* tslint:enable */

  /**
   * 与一个或几个通用正则匹配
   * @param type
   * @param isNoLimit
   * @returns {pattern|undefined}
   */
  public static getPattern(type: string, isNoLimit: boolean = false): any {
    if (!type) { return; }
    const patternObj = {
      cnChar: Pattern.cnCharPattern,
      dblBitChar: Pattern.dblBitCharPattern,
      mobPhone: Pattern.mobPhonePattern,
      telPhone: Pattern.telPhonePattern,
      email: Pattern.emailPattern,
      idCard: Pattern.idCardPattern,
      base64Code: Pattern.base64CodePattern,
      mac: Pattern.macPattern,
      domain: Pattern.domainPattern,
      port: Pattern.portPattern,
      ip: Pattern.ipPattern,
      ipv4: Pattern.ipv4Pattern,
      ipv6: Pattern.ipv6Pattern,
      ipv4IpRange: Pattern.ipv4IpRangePattern,
      ipv6IpRange: Pattern.ipv6IpRangePattern,
      ipv4Cidr: Pattern.ipv4CidrPattern,
      ipv6Cidr: Pattern.ipv6CidrPattern,
      ipv4Url: Pattern.ipv4UrlPattern,
      ipv6Url: Pattern.ipv6UrlPattern,
      domainUrl: Pattern.domainUrlPattern,
      url: Pattern.urlPattern,
      ipv4WithPortUrl: Pattern.ipv4WithPortUrlPattern,
      ipv6WithPortUrl: Pattern.ipv6WithPortUrlPattern,
      domainWithPortUrl: Pattern.domainWithPortUrlPattern,
      withPortUrl: Pattern.withPortUrlPattern
    };
    patternObj['patternList'] = Object.keys(patternObj);
    return patternObj.hasOwnProperty(type) && patternObj[type]
      ? type === 'patternList'
        ? patternObj[type]
        : isNoLimit
          ? new RegExp(patternObj[type].source)
          : new RegExp(`^(${patternObj[type].source})$`)
      : undefined;
  }
  /**
   * 获取一个通用的正则表达式
   * @param src
   * @param type
   * @param isNoLimit
   * @returns {boolean}
   */
  public static matchPattern(src: string, type: string | string[], isNoLimit: boolean): boolean {
    if (!src || !type) { return false; }
    if (type instanceof Array) {
      let matchResult = false;
      type.forEach(item => {
        const pattern: RegExp = Pattern.getPattern(item, isNoLimit);
        if (pattern && pattern.test(src)) { matchResult = true; }
      });
      return matchResult;
    } else if (typeof type === 'string') {
      const pattern: RegExp = Pattern.getPattern(type, isNoLimit);
      return pattern && pattern.test(src);
    }
  }
}
