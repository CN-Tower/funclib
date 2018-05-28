"use strict";
exports.__esModule = true;
var Patterns = /** @class */ (function () {
    function Patterns() {
        /* tslint:disable */
        // 匹配汉字
        this.cnCharPattern = /[\u4e00-\u9fa5]+/;
        // 匹配双字节字符
        this.dblBitCharPattern = /[^x00-xff]/;
        // 匹配手机号码，以13/14/15/18开头
        this.mobPhonePattern = /1[3|4|5|8][0-9]\d{4,8}/;
        // 匹配大陆电话号码，格式为“XXXX-XXXXXXX”，“XXXX-XXXXXXXX”，“XXX-XXXXXXX”，“XXX-XXXXXXXX”，“XXXXXXX”，“XXXXXXXX”
        this.telPhonePattern = /((d{3,4})|d{3,4}-)?d{7,8}/;
        // 匹配Email
        this.emailPattern = /([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+/;
        // 匹配Base64编码格式
        this.base64CodePattern = /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/;
        // 匹配Mac地址
        this.macPattern = /[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}/;
        // 匹配域名
        this.domainPattern = /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/;
        // 匹配端口号
        this.portPattern = /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/;
        // 匹配IPv4地址
        this.ipv4Pattern = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/;
        // 匹配IPv6地址
        this.ipv6Pattern = new RegExp('' +
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
        this.ipPattern = new RegExp("(" + this.ipv4Pattern.source + "|" + this.ipv6Pattern.source + ")");
        // 匹配IPv4 cidr
        this.ipv4CidrPattern = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(\/([1-9]|1[0-9]|2[0-9]|3[0-2]))/;
        // 匹配IPV6 cidr
        this.ipv6CidrPattern = new RegExp('s*(' +
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
        this.ipv4IpRangePattern = new RegExp("((" + this.ipv4Pattern.source + ")-(" + this.ipv4Pattern.source + ");)*(" + this.ipv4Pattern.source + ")-(" + this.ipv4Pattern.source + ")");
        // 匹配IPv6范围
        this.ipv6IpRangePattern = new RegExp("((" + this.ipv6Pattern.source + ")-(" + this.ipv6Pattern.source + ");)*(" + this.ipv6Pattern.source + ")-(" + this.ipv6Pattern.source + ")");
        // 匹配IPv4 Url
        this.ipv4UrlPattern = new RegExp("http(s)?://" + this.ipv4Pattern.source + "(:" + this.portPattern.source + ")?");
        // 匹配IPv6 Url
        this.ipv6UrlPattern = new RegExp("http(s)?://\\[(" + this.ipv6Pattern.source + ")\\](:" + this.portPattern.source + ")?");
        // 匹配Domain Url
        this.domainUrlPattern = new RegExp("http(s)?://" + this.domainPattern.source + "(:" + this.portPattern.source + ")?");
        // 匹配Url
        this.urlPattern = new RegExp("http(s)?://(" + this.ipv4Pattern.source + "|\\[(" + this.ipv6Pattern.source + ")\\]|" + this.domainPattern.source + ")(:" + this.portPattern.source + ")?");
        // 匹配必需带端口的IPv4 Url
        this.ipv4WithPortUrlPattern = new RegExp("http(s)?://" + this.ipv4Pattern.source + ":" + this.portPattern.source);
        // 匹配必需带端口的IPv6 Url
        this.ipv6WithPortUrlPattern = new RegExp("http(s)?://\\[(" + this.ipv6Pattern.source + ")\\]:" + this.portPattern.source);
        // 匹配必需带端口的Domain Url
        this.domainWithPortUrlPattern = new RegExp("http(s)?://" + this.domainPattern.source + ":" + this.portPattern.source);
        // 匹配必需带端口的Url
        this.withPortUrlPattern = new RegExp("http(s)?://(" + this.ipv4Pattern.source + "|\\[(" + this.ipv6Pattern.source + ")\\]|" + this.domainPattern.source + "):" + this.portPattern.source);
        /* tslint:enable */
    }
    return Patterns;
}());
exports.Patterns = Patterns;
