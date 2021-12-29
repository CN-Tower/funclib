/**
 * 同步src/index.js中的import到export列表中
 */
const fs = require('fs');
const { resolve } = require('./config');

const indexPath = resolve('src/index.js');
const indexText = fs.readFileSync(indexPath, 'utf-8');

// 获取import的函数列表
let bexports = `\n`;
indexText.replace(/import\s(?:\*\sas\s)?([\w_]*)\sfrom/gm, (_, $1) => {
  bexports += `  ${$1},\r\n`;
});

// 规换export中的函数列表
fs.writeFileSync(indexPath, indexText.replace(/(?<=export\s(?:default\s)?\{)(\r|\n|.)*?(?=\})/gm, bexports));
