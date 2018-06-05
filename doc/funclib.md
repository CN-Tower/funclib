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
#### fn.random
返回指定范围的随机数
#### fn.rdId
返回指定长度(最小6位)的随机ID
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
#### fn.rd
NodeJs读文件
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
#### fn.progress.start
开启进度条，并传入参数
#### fn.progress.stop
停止进度条，结束后触发回调
### ViewTools 
#### fn.initViewTools
初始化视图工具
#### fn.viewTools.show
显示视图工具
### Table 
#### fn.initBootstrapTable
初始化Bootstrap表格工具
#### fn.table.render
渲染Bootstrap表格
### ExtendJq      
#### $.pollingElement
jQuery获取异步出现的元素
#### $.noAutoComplete
jQuery禁止input密码自动填充
#### $.copyText
jQuery复制文本到粘贴板
#### $ele.findCousin
jQuery获取元素表亲
