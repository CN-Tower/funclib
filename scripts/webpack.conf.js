const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');

const funclibJsConf = {
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

const funclibMinJsConf = {
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

module.exports = {
    funclibJsConf: funclibJsConf,
    funclibMinJsConf: funclibMinJsConf
}
