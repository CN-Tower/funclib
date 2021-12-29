/**
 * 创建`根目录`的软链接到`node_module/funclib`目录下
 */
const fs = require('fs');
const { execSync } = require('child_process');
const { resolve } = require('./config');

const lnPath = resolve('node_modules/funclib');

if (!fs.existsSync(lnPath)) {
  execSync(`ln -s ${resolve('.')} ${resolve('node_modules/funclib')}`);
}
