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
### CONTENT
 #### Version
 [fn.version](#fnversion)&nbsp;&nbsp;返回当前函数库版本
 #### Array      
 [fn.array](#fnarray)&nbsp;&nbsp;返回指定长度和默认值的数组<br/>
 [fn.toArr](#fntoarr)&nbsp;&nbsp;值数组化<br/>
 [fn.sortByField](#fnsortbyfield)&nbsp;&nbsp;对象数组根据字段排序
 #### Object     
 [fn.len](#fnlen)&nbsp;&nbsp;获取对象自有属性的个数<br/>
 [fn.isEmpty](#fnisempty)&nbsp;&nbsp;判断对象是否为空对象或数组<br/>
 [fn.overlay](#fnoverlay)&nbsp;&nbsp;给对象赋值，可指定字段<br/>
 [fn.deepCopy](#fndeepcopy)&nbsp;&nbsp;深拷贝数组或对象
 #### Mathematic 
 [fn.rdId](#fnrdid)&nbsp;&nbsp;返回指定长度(最小6位)的随机ID<br/>
 [fn.rdNum](#fnrdnum)&nbsp;&nbsp;返回指定范围的随机数<br/>
 [fn.rdColor](#fnrdcolor)&nbsp;&nbsp;返回一个随机色值
 #### Time       
 [fn.interval](#fninterval)&nbsp;&nbsp;循环定时器<br/>
 [fn.timeout](#fntimeout)&nbsp;&nbsp;延时定时器<br/>
 [fn.timeStamp](#fntimestamp)&nbsp;&nbsp;返回一个当前时间戳<br/>
 [fn.fmtDate](#fnfmtdate)&nbsp;&nbsp;获取格式化的时间字符串
 #### String     
 [fn.encodeHtml](#fnencodehtml)&nbsp;&nbsp;编码HTML字符串<br/>
 [fn.decodeHtml](#fndecodehtml)&nbsp;&nbsp;解码HTML字符串<br/>
 [fn.currency](#fncurrency)&nbsp;&nbsp;格式化显示货币<br/>
 [fn.cutString](#fncutstring)&nbsp;&nbsp;裁切字符串到指定长度
 #### RegExp     
 [fn.getPattern](#fngetpattern)&nbsp;&nbsp;获取一个通用的正则表达式<br/>
 [fn.matchPattern](#fnmatchpattern)&nbsp;&nbsp;与一个或几个通用正则匹配
 #### Events     
 [fn.getKeyCodeByName](#fngetkeycodebyname)&nbsp;&nbsp;根据键名获取键码<br/>
 [fn.getKeyNameByCode](#fngetkeynamebycode)&nbsp;&nbsp;根据键码获取键名
 #### Dom        
 [fn.fullScreen](#fnfullscreen)&nbsp;&nbsp;全屏显示一个HTML元素<br/>
 [fn.exitFullScreen](#fnexitfullscreen)&nbsp;&nbsp;退出全屏显示<br/>
 [fn.checkIsFullScreen](#fncheckisfullscreen)&nbsp;&nbsp;检测是否处理全屏状态
 #### Cookie     
 [fn.setCookie](#fnsetcookie)&nbsp;&nbsp;设置Cookie<br/>
 [fn.getCookie](#fngetcookie)&nbsp;&nbsp;根据name读取cookie<br/>
 [fn.removeCookie](#fnremovecookie)&nbsp;&nbsp;根据name删除cookie
 #### Loger      
 [fn.log](#fnlog)&nbsp;&nbsp;控制打印格式化值
 #### Tools      
 [fn.initTools](#fninittools)&nbsp;&nbsp;初始化一个NodeJs工具包对象<br/>
 [fn.wt](#fnwt)&nbsp;&nbsp;NodeJs写文件<br/> 
 [fn.cp](#fncp)&nbsp;&nbsp;NodeJs复制文件夹和文件<br/>
 [fn.mv](#fnmv)&nbsp;&nbsp;NodeJs移动文件夹和文件<br/>
 [fn.rm](#fnrm)&nbsp;&nbsp;NodeJs删除文件夹和文件<br/>
 [fn.mk](#fnmk)&nbsp;&nbsp;NodeJs创建文件夹
 #### Prigress      
 [fn.initProgress](#fninitprogress)&nbsp;&nbsp;初始化进度条对象<br/>
 [fn.progress.start](#fnprogressstart)&nbsp;&nbsp;开启进度条，并传入参数<br/>
 [fn.progress.stop](#fnprogressstop)&nbsp;&nbsp;停止进度条，结束后触发回调
 #### ExtendJq      
 [$.pollingElement](#pollingelement)&nbsp;&nbsp;jQuery获取异步出现的元素<br/>
 [$.noAutoComplete](#noautocomplete)&nbsp;&nbsp;jQuery禁止input密码自动填充<br/>
 [$.copyText](#copytext)&nbsp;&nbsp;jQuery复制文本到粘贴板<br/>
 [$ele.findCousin](#elefindcousin)&nbsp;&nbsp;jQuery获取元素表亲
### Version
#### fn.version
返回当前函数库版本
### Array      
#### fn.array
返回指定长度和默认值的数组
#### fn.toArr
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
#### fn.wt
NodeJs写文件
#### fn.cp
NodeJs复制文件夹和文件
#### fn.mv
NodeJs移动文件夹和文件
#### fn.rm
NodeJs删除文件夹和文件
#### fn.mk
NodeJs创建文件夹
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
