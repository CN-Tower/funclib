# funclib.js (凡客杰斯)

## Brief Intro
Javascript通用型逻辑函数封装 funclib: V1.0.5
> 目的：高效率完成前端业务代码

## Quick start
```bash
# Install funclib.js
$ npm install funclib

# Use funclib
$ node
> var fn = require('funclib');
> console.log(fn.rdId()) // => 8GH9IYO60MXQ
```

## Clone Repo
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

## Structure
```
funclib.js
├── node_modules/           # You know the drill...
├── dist/                   # 构建目录
│   └── funclib.min.js      # 最终生成
├── script                  # 脚本
│   ├── build.js            # 构建脚本
│   ├── buildFix.js         # 修改脚本
│   └── webpack.conf.js     # Webpack配置
├── src                     # Source code
│   ├── configs             # 模块
│   │   ├── fnConf.ts       # 特殊方法
│   │   └── keyMap.ts       # 键映射表
│   ├── modules             # 模块
│   │   ├── $.extends.ts    # jQuery拓展
│   │   ├── array.ts        # Array
│   │   ├── cookie.ts       # Cookie
│   │   ├── dom.ts          # DOM
│   │   ├── events.ts       # Events
│   │   ├── loger.ts        # Loger
│   │   ├── math.ts         # Mathematic
│   │   ├── object.ts       # Object
│   │   ├── patterns.ts     # RegExp
│   │   ├── progress.ts     # 进度条工具
│   │   ├── string.ts       # String
│   │   ├── time.ts         # Time
│   │   └── tools.ts        # NodeJs工具
│   ├── funclib.spec.ts     # 测试用例
│   └── funclib.ts          # Main函数
├── .editorconfig           # Set coding style (indents, charset, etc.)
├── .gitignore              # You know the drill...
├── .travis.yml             # CI配置
├── app.js                  # 服务端试验
├── funclib.d.ts            # 定义文件
├── funclib.html            # 客户端试验
├── index.js                # Index
├── LICENSE                 # 授权说明
├── package-lock.json       # NPM Lock
├── package.json            # 库配置
├── README.md               # Read this FIRST :)
└── tsconfig.json           # Typescript配置
```

## Document (CM: Client side method, SM: Server side method)
 ### Version
 #### fn.version
 返回当前函数库版本
 ### Array      
 #### fn.array
返回指定长度和默认值的数组
 #### fn.
 值数组化
 #### fn.sortByField
 对象数组根据字段排序
 ### Object     
 #### fn.len
 获取对象自有属性的个数
 #### fn.isEmpty
 判断对象是否为空对象或数组
 #### fn.overlay
 给对象赋值，可指定字段
 #### fn.deepCopy
 深拷贝数组或对象
 ### Mathematic 
 #### fn.rdId
 返回指定长度(最小6位)的随机ID
 #### fn.rdNum
 返回指定范围的随机数
 #### fn.rdColor
 返回一个随机色值
 ### Time       
 #### fn.interval
 循环定时器
 #### fn.timeout
 延时定时器
 #### fn.timeStamp
 返回一个当前时间戳
 #### fn.fmtDate
 获取格式化的时间字符串
 ### String     
 #### fn.encodeHtml
 编码HTML字符串
 #### fn.decodeHtml
 解码HTML字符串
 #### fn.currency
 格式化显示货币
 #### fn.cutString
 裁切字符串到指定长度
 ### RegExp     
 #### fn.getPattern
 获取一个通用的正则表达式
 #### fn.matchPattern
 与一个或几个通用正则匹配
 ### Events     
 #### fn.getKeyCodeByName
 根据键名获取键码
 #### fn.getKeyNameByCode
 根据键码获取键名
 ### DOM        
 #### fn.fullScreen
 全屏显示一个HTML元素
 #### fn.exitFullScreen
 退出全屏显示
 #### fn.checkIsFullScreen
 检测是否处理全屏状态
 ### Cookie     
 #### fn.setCookie
 设置Cookie
 #### fn.getCookie
 根据name读取cookie
 #### fn.removeCookie
 根据name删除cookie
 ### Loger      
 #### fn.log
 控制打印格式化值
 ### Tools      
 #### fn.initTools
 初始化一个NodeJs工具包对象
 #### fn.cp
 NodeJs写文件
 #### fn.mv
 NodeJs删除文件夹和文件
 #### fn.rm
 NodeJs复制文件
 #### fn.mkdir
 NodeJs复制文件夹和文件
 ### Prigress      
 #### fn.initProgress
 初始化进度条对象
 #### fn.progress.start
 开启进度条，并传入参数
 #### fn.progress.stop
 停止进度条，结束后触发回调
 ### ExtendJq      
 #### $.pollingElement
 jQuery获取异步出现的元素
 #### $.noAutoComplete
 jQuery禁止input密码自动填充
 #### $.copyText
 jQuery复制文本到粘贴板
 #### $ele.findCousin
 jQuery获取元素表亲
