# funclib.js (凡客杰斯)

### Version
Javascript通用型逻辑函数封装 funclib: V1.0.5

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

### Structure
```
funclib.js
├── dist/                   # You know the drill...
│   └── funclib.min.js      # npm run start
├── node_modules/           # You know the drill...
├── script                  # 运行脚本
│   ├── build.js            # npm run update
│   ├── buildFix.js         # npm run update
│   └── webpack.conf.js     # npm run start
├── src                     # Source code
│   ├── modules             # Project Source Code
│   │   ├── helper          # 模块
│   │   │   └── keyMap.ts   # 提示和Loader工具
│   │   ├── $.extends.ts    # 提示和Loader工具
│   │   ├── array.ts        # 提示和Loader工具
│   │   ├── cookie.ts       # 提示和Loader工具
│   │   ├── dom.ts          # 提示和Loader工具
│   │   ├── events.ts       # 提示和Loader工具
│   │   ├── loger.ts        # 提示和Loader工具
│   │   ├── math.ts         # 提示和Loader工具
│   │   ├── object.ts       # 提示和Loader工具
│   │   ├── patterns.ts     # 提示和Loader工具
│   │   ├── progress.ts     # 提示和Loader工具
│   │   ├── string.ts       # 提示和Loader工具
│   │   ├── time.ts         # 提示和Loader工具
│   │   └── tools.ts        # 主函数
│   ├── funclib.conf.ts     # 编译UMD
│   ├── funclib.spec.ts     # 编译UMD
│   └── funclib.ts          # 编译UMD
├── .editorconfig           # Set coding style (indents, charset, etc.)
├── .gitignore              # You know the drill...
├── .travis.yml             # Slides
├── app.js                  # Slides
├── funclib.d.ts            # Slides
├── funclib.html            # Slides
├── index.js                # Slides
├── LICENSE                 # Slides
├── package-lock.json       # Slides
├── package.json            # Slides
├── README.md               # Read this FIRST :)
└── tsconfig.json           # Test file
```

### Methods (CM: Client side method, SM: Server side method)
```
 * fn.version                返回当前函数库版本
 Array      _____________________________________________________
 * fn.array                  返回指定长度和默认值的数组
 * fn.toArray                值数组化
 * fn.sortByField            对象数组根据字段排序
 Object     _____________________________________________________
 * fn.len                    获取对象自有属性的个数
 * fn.isEmpty                判断对象是否为空对象或数组
 * fn.overlay                给对象赋值，可指定字段
 * fn.deepCopy               深拷贝数组或对象
 Mathematic _____________________________________________________
 * fn.randomId               返回指定长度(最小6位)的随机ID
 * fn.randomNum              返回指定范围的随机数
 * fn.randomColor            返回一个随机色值
 Time       _____________________________________________________
 * fn.interval               循环定时器
 * fn.timeout                延时定时器
 * fn.timeStamp              返回一个当前时间戳
 * fn.fmtDate                获取格式化的时间字符串
 String     _____________________________________________________
 * fn.encodeHtml             编码HTML字符串
 * fn.decodeHtml             解码HTML字符串
 * fn.currency               格式化显示货币
 * fn.cutString              裁切字符串到指定长度
 RegExp     _____________________________________________________
 * fn.getPattern             获取一个通用的正则表达式
 * fn.matchPattern           与一个或几个通用正则匹配
 Events     _____________________________________________________
 * fn.getKeyCodeByName       根据键名获取键码
 * fn.getKeyNameByCode       根据键码获取键名
 Dom        _____________________________________________________
 * fn.fullScreen             全屏显示一个HTML元素
 * fn.exitFullScreen         退出全屏显示
 * fn.checkIsFullScreen      检测是否处理全屏状态
 Cookie     _____________________________________________________
 * fn.setCookie              设置Cookie
 * fn.getCookie              根据name读取cookie
 * fn.removeCookie           根据name删除cookie
 Loger      _____________________________________________________
 * fn.log                    控制打印格式化值
 Tools      _____________________________________________________
 * fn.initTools              初始化一个NodeJs工具包对象
 * fn.cp                     NodeJs写文件
 * fn.mv                     NodeJs删除文件夹和文件
 * fn.rm                     NodeJs复制文件
 * fn.mkdir                  NodeJs复制文件夹和文件
 Prigress      __________________________________________________
 * fn.initProgress           初始化进度条对象
 * fn.progress.start         开启进度条，并传入参数
 * fn.progress.stop          停止进度条，结束后触发回调
 ExtendJq      __________________________________________________
 * $.pollingElement          jQuery获取异步出现的元素
 * $.noAutoComplete          jQuery禁止input密码自动填充
 * $.copyText                jQuery复制文本到粘贴板
 * $ele.findCousin           jQuery获取元素表亲
 ```
