# funclib.js (凡客杰斯)
[![npm](https://img.shields.io/npm/v/funclib.svg)
![LICENSE MIT](https://img.shields.io/npm/l/funclib.svg)](https://www.npmjs.com/package/funclib) 
[![Build Status](https://travis-ci.org/CN-Tower/funclib.js.svg?branch=master)](https://travis-ci.org/CN-Tower/funclib.js)
[![Coverage Status](https://coveralls.io/repos/github/CN-Tower/funclib.js/badge.svg)](https://coveralls.io/github/CN-Tower/funclib.js)

## Brief Intro
Javascript通用型UMD函数库，采用Typescript开发，Webpack打包编译!
> 目的：高效率完成前端业务代码！

### Documents:&nbsp;&nbsp;http://funclib.net

## Quick start
```bash
# Install funclib.js
$ npm install funclib

# Use funclib
$ node
> var fn = require('funclib');
> console.log(fn.rdid()) // => 8GH9IYO60MXQ
```

## Clone Repo
```bash
# Download funclib repo
$ git clone https://github.com/CN-Tower/funclib.js.git
# $ git clone http://gitlab.zte.com.cn/CN-Tower/funclib.js.git

# Install dependency
$ npm install

# Start
$ npm start

# Do Try
$ npm run usage

# Build
$ npm run build

# Test
$ npm run test
```

## Structure
```
funclib.js
├── node_modules/           # You know the drill...
├── assets                  # 构建目录
│   ├── funclib.js          # 未压缩版
│   ├── funclib.min.js      # 压缩版
│   ├── index.d.ts          # 定义文件
│   ├── index.js            # 索引文件
│   ├── package.json        # 库模块定义
│   └── README.md           # Read this FIRST :)
├── script                  # 脚本
│   ├── build.js            # 编译脚本
│   ├── karma.conf.js       # Karma配置
│   └── webpack.conf.js     # Webpack配置
├── src                     # Source code
│   ├── modules             # 模块
│   │   ├── _Array.ts       # Array
│   │   ├── _Cookie.ts      # Cookie
│   │   ├── _Dom.ts         # Element
│   │   ├── _FileSys.ts     # FileSystem
│   │   ├── _Function.ts    # Function
│   │   ├── _Math.ts        # Mathematic
│   │   ├── _Object.ts      # Object
│   │   ├── _Pattern.ts     # RegExp
│   │   ├── _Progress.ts    # Progress
│   │   ├── _String.ts      # String
│   │   ├── _Time.ts        # Time
│   │   ├── _Trick.ts       # Trick
│   │   ├── _Type.ts        # Type
│   │   ├── _Url.ts         # Url
│   │   ├── _Logc.ts        # ClientLog
│   │   └── _Logs.ts        # ServerLog
│   ├── funclib.conf.ts     # 配置文件
│   ├── funclib.ts          # ClientMain
│   └── index.ts            # ServerMain
├── test                    # 测试
│   ├── client-methods      # 客户端方法测试用例
│   ├── server-methods      # 服务端方法测试用例
│   └── *.spec.js           # 通用方法测试用例
├── .coveralls.yml          # 测试覆盖率
├── .editorconfig           # Set coding style (indents, charset, etc.)
├── .gitignore              # You know the drill...
├── .travis.yml             # CI配置
├── LICENSE                 # 授权说明
├── package-lock.json       # NPM Lock
├── package.json            # 库配置
├── README.md               # Read this FIRST :)
├── tsconfig.json           # Typescript配置
├── usage.html              # 客户端试验
└── usage.js                # 服务端试验
```