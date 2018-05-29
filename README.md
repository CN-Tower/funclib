# funclib.js (凡客杰斯)

### Version
Javascript通用型逻辑函数封装 funclib: V1.0.4

### Quick start
```bash
# Install funclib.js
$ npm install funclib

# Use funclib
$ node
> var fn = require('funclib');
> console.log(fn.gnid()) // => 8GH9IYO60MXQ
```

### Contribute
```bash
# Download funclib repo
$ git clone https://github.com/CN-Tower/funclib.js.git
$ git clone http://gitlab.zte.com.cn/CN-Tower/funclib.js.git

# Install dependency
$ npm install

# Start
$ npm start

# Build
$ npm run build
```

### Methods (CM: Client side method, SM: Server side method)
```
 * fn.version                返回当前函数库版本
 * fn.gnid                   返回指定长度(最小6位)的随机ID
 * fn.array                  返回指定长度和默认值的数组
 * fn.toArray                值数组化
 * fn.random                 返回指定范围的随机数或返回一个随机色值
 * fn.length                 获取对象自有属性的个数
 * fn.isEmpty                判断对象是否为空对象或数组
 * fn.overlay                给对象赋值，可指定字段
 * fn.deepCopy               深拷贝数组或对象
 * fn.sortData               对象数组根据字段排序
 * fn.interval               循环定时器
 * fn.timeout                延时定时器
 * fn.currency               格式化显示货币
 * fn.cutString              裁切字符串到指定长度
 * fn.getPattern             获取一个通用的正则表达式
 * fn.matchPattern           与一个或几个通用正则匹配
 * fn.fmtDate                获取格式化的时间字符串
 * fn.timeStamp              返回一个当前时间戳
 * fn.encodeHtml             编码HTML字符串
 * fn.decodeHtml             解码HTML字符串
 * fn.getKeyCodeByName       根据键名获取键码
 * fn.getKeyCodeByName       根据键码获取键名
 * fn.fullScreen             CM 全屏显示一个HTML元素
 * fn.exitFullScreen         CM 退出全屏显示
 * fn.checkIsFullScreen      CM 检测是否处理全屏状态
 * fn.setCookie              CM 设置Cookie
 * fn.getCookie              CM 根据name读取cookie
 * fn.removeCookie           CM 根据name删除cookie
 * fn.setErrors              CM 手动设定表单错误
 * fn.log                    SM 控制打印格式化值
 * fn.initTools              SM 初始化一个NodeJs工具包对象
 * fn.tools.writeFile        SM NodeJs写文件
 * fn.tools.deleteDirectory  SM NodeJs删除文件夹和文件
 * fn.tools.copyFile         SM NodeJs复制文件
 * fn.tools.copyDirectory    SM NodeJs复制文件夹和文件
 * fn.initProgress           SM 初始化进度条对象
 * fn.progress.start         SM 开启进度条，并传入参数
 * fn.progress.stop          SM 停止进度条，结束后触发回调
 * fn.initViewTools          CM 初始化提示和Loader
 * fn.viewTools.show         CM 提示信息和Loader工具
 * fn.initBootstrapTable     CM 初始化一个BootstrapTable对象
 * fn.bootstrapTable.render  CM 渲染Bootstrap表格
 * $.pollingElement          CM jQuery获取异步出现的元素
 * $.noAutoComplete          CM jQuery禁止input密码自动填充
 * $.copyText                CM jQuery复制文本到粘贴板
 * $ele.findCousin           CM jQuery获取元素表亲
 ```
