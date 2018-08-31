const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');

module.exports = {
  funclibJsConf: dfFnJsConf(),
  funclibMinJsConf: dfMinJsConf(),
  indexJsConf: fnIndexJs()
}

function dfFnJsConf() {
  return {
    entry: path.resolve(rootPath, 'src', 'funclib.ts'),
    output: {
      filename: 'funclib.js',
      path: path.resolve(rootPath, 'assets'),
      library: 'fn',
      libraryTarget: "umd"
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      loaders: [{
        test: /\.ts$/,
        loader: 'ts-loader'
      }]
    }
  }
}

function dfMinJsConf() {
  return {
    entry: path.resolve(rootPath, 'src', 'funclib.ts'),
    output: {
      filename: 'funclib.min.js',
      path: path.resolve(rootPath, 'assets'),
      library: 'fn',
      libraryTarget: "umd"
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      loaders: [{
        test: /\.ts$/,
        loader: 'ts-loader'
      }]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
}

function fnIndexJs() {
  return {
    entry: path.resolve(rootPath, 'src', 'index.ts'),
    output: {
      filename: 'index.js',
      path: path.resolve(rootPath, 'assets'),
      library: 'fn',
      libraryTarget: "umd"
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      loaders: [{
        test: /\.ts$/,
        loader: 'ts-loader'
      }]
    }
  }
}
