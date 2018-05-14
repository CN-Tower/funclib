# pxfunc

### Version
通用型逻辑函数封装 PxFunc (V2.0.1)

### Quick start
```bash
# Install pxjson
$ npm install pxfunc

# Use pxjson
$ node
> var fn = require('pxfunc');
> console.log(fn.uuid()) // => as93ad3dfasx
```

### Contribute
```bash
# Download pxjson repo
$ git clone https://github.com/CN-Tower/pxfunc.js.git

# Install dependency
$ npm install

# Start
$ npm start

# Build
$ npm run build
```

### Methods

- fn.time                   返回一个当前时间字符串
- fn.uuid                   返回一个指定长度(最小6位)的随机ID
- fn.array                  返回一个指定长度和默认值的数组
- fn.random                 返回一个指定范围的随机数
- fn.objLen                 获取对象自有属性的个数
- fn.copy                   深拷贝数组或对象
- fn.polling                用于轮询控制
- fn.errors                 表单控件的错误提示控制
- fn.viewTools              通知和Loading的控制
- fn.bootstrapTable         渲染Bootstrap表格的通用方式
- fn.sortData               表格数据根据字段排序
- fn.currency               格式化显示货币
- fn.cutString              裁切字符串到指定长度
- fn.findCousin             用jQuery寻找元素的表亲
- fn.matchPattern           与一个或几个通用正则匹配
- fn.getPattern             获取一个通用的正则表达式
- fn.pollingEl              用jQuery定时寻找一个异步渲染的元素
