# funclib.js (凡客杰斯)
[![npm](https://img.shields.io/npm/v/funclib.svg)
![LICENSE MIT](https://img.shields.io/npm/l/funclib.svg)](https://www.npmjs.com/package/funclib) 
[![Build Status](https://travis-ci.org/CN-Tower/funclib.js.svg?branch=master)](https://travis-ci.org/CN-Tower/funclib.js)
[![Coverage Status](https://coveralls.io/repos/github/CN-Tower/funclib.js/badge.svg)](https://coveralls.io/github/CN-Tower/funclib.js)

## Brief Intro
JavaScript通用型UMD函数库!
> 目的：高效率完成前端业务代码！

### Documents:&nbsp;&nbsp;http://funclib.net

## Quick start
```bash
# Install funclib.js
$ npm install funclib

# Use funclib
$ node
> var fn = require('funclib');
> console.log(fn.gid()) // => 8GH9IYO60MXQ
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
├── node_modules/           ### You know the drill...
├── script                  ### 脚本
│   ├── build.js            # 构建脚本
│   ├── karma.conf.js       # Karma测试框架配置
│   ├── pre-build.js        # 构建配置脚本
│   └── test.js             # 测试配置脚本
├── src                     ### Source code
│   ├── funclib.core.js     # 通用版
│   ├── funclib.js          # 未压缩版客户端版
│   ├── funclib.min.js      # 压缩版客户端版
│   ├── index.d.ts          # 定义文件
│   ├── index.js            # 服务端版
│   ├── package.json        # 库模块定义
│   └── README.md           # Read this FIRST :)
├── test                    ### 测试
│   ├── client-methods/     # 客户端版测试用例
│   ├── core-methods/       # 通用版测试用例
│   ├── server-methods/     # 服务端版测试用例
│   ├── fn-core.js          # 通用版测试文件
│   └── fn-index.js         # 服务端版测试文件
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
