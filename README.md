# funclib.js (凡客杰斯)

### Version
Javascript通用型逻辑函数封装 funclib: V1.0.2

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

# Install dependency
$ npm install

# Start
$ npm start

# Build
$ npm run build
```

### Methods
```
fn.version                返回当前函数库版本
fn.time                   返回当前时间戳
fn.gnid                   返回指定长度(最小6位)的随机ID
fn.array                  返回指定长度和默认值的数组
fn.random                 返回指定范围的随机数
fn.len                    获取对象自有属性的个数
fn.deepCopy               深拷贝数组或对象
fn.interval               循环定时器
fn.timeout                延时定时器
fn.sortData               对象数组根据字段排序
fn.currency               格式化显示货币
fn.cutString              裁切字符串到指定长度
fn.overlay                给对象赋值，可指定字段
fn.getPattern             获取一个通用的正则表达式
fn.matchPattern           与一个或几个通用正则匹配
fn.fullScreen             全屏显示一个HTML元素
fn.log                    控制打印格式化值
fn.exitFullScreen         退出全屏显示
fn.checkIsFullScreen      检测是否处理全屏状态
fn.setErrors              手动设定表单错误
fn.tools.writeFile        NodeJs写文件
fn.tools.deleteDirectory  NodeJs删除文件夹和文件
fn.tools.copyFile         NodeJs复制文件
fn.tools.copyDirectory    NodeJs复制文件夹和文件
fn.progress.start         开启进度条，并传入参数
fn.progress.stop          停止进度条，结束后触发回调
fn.viewTools.show         提示信息和Loader工具
fn.bootstrapTable.render  渲染Bootstrap表格
$.pollingElement          jQuery获取异步出现的元素
$.noAutoComplete          jQuery禁止input密码自动填充
$.copyText                jQuery复制文本到粘贴板
$ele.findCousin           jQuery获取元素表亲
 ```
