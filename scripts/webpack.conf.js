const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');

module.exports = {
    entry: path.resolve(rootPath, 'src', 'funclib.ts'),
    output: {
        filename: 'funclib.min.js',
        path: path.resolve(rootPath, 'dist'),
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
