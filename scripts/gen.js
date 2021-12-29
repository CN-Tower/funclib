/**
 * 新增一个函数，命令：npm run gen
 */
const fs = require('fs');
const fn = require('funclib');
const inquirer = require('inquirer');
const { resolve } = require('./config');
const { execSync } = require('child_process');

inquirer.registerPrompt('search-list', require('inquirer-search-list'));

const dtsPath = resolve('index.d.ts');
const indexPath = resolve('src/index.js');
const dtsText = fs.readFileSync(dtsPath, 'utf-8');
const indexText = fs.readFileSync(indexPath, 'utf-8');

/**
 * 获取已有函数列表
 */
let libFunctionList = [];
indexText.replace(/import\s(?:\*\sas\s)?([\w_]*)\sfrom/gm, (_, $1) => {
  if ($1 !== 'consts') libFunctionList.push($1);
});

/**
 * 执行新函数创建
 */
(async () => {
  const fnName = await getFunctionName();
  const fnDesc = await getFunctionDesc();
  const fnBefore = await getFuncBefore();
  const fnPath = resolve(`src/${fnName}.js`);
  const testPath = resolve(`test/cases/${fnName}.spec.js`);

  const fnTpl = getFuncTpl(fnName, fnDesc);
  const idxTpl = getFuncIptTpl(fnName, fnBefore);
  const dtsTpl = getFuncDtsTpl(fnName, fnBefore, fnDesc);
  const specTpl = getFuncSpec(fnName, fnDesc);

  // 生成函数文件
  fs.writeFileSync(fnPath, fnTpl);
  // 在index.js文件中导入
  fs.writeFileSync(indexPath, idxTpl);
  // 在index.d.ts文件中增加函数
  fs.writeFileSync(dtsPath, dtsTpl);
  // 生成测试用例
  fs.writeFileSync(testPath, specTpl);

  // 同步函数导出和定义文件
  execSync('npm run sync:exports && npm run sync:mtddefs');

  // 打印生成和修改的文件路径
  fn.log(
    `
${fn.chalk('函数创建成功！', 'green')}，按住"command"键+点击下面的链接进入相关文件进一步编辑吧！

  函数位置：
    ${fn.chalk(fnPath, 'blue')}
  索引文件：
    ${fn.chalk(indexPath, 'blue')}
  定义文件：
    ${fn.chalk(dtsPath, 'blue')}
  测试用例：
    ${fn.chalk(testPath, 'blue')}
`,
    'funclib'
  );
})();

/**
 * 命令行中输入函数名
 */
async function inquirerName(isDesc) {
  const qName = isDesc ? '函数功能描述' : '函数名';
  const { inputName } = await inquirer.prompt(
    [
      {
        type: 'input',
        name: 'inputName',
        message: `请输入${qName}: `,
      },
    ],
    {}
  );
  const trimedName = inputName.trim();
  if (!trimedName) {
    console.log(fn.chalk(`${qName}不能为空，请重新输入！`, 'red'));
    return await inquirerName(isDesc);
  }
  return inputName;
}

/**
 * 获取函数名称
 */
async function getFunctionName(funcName = process.argv[2] || '') {
  funcName = funcName.trim();
  if (funcName) {
    console.log(fn.chalk('函数名: ', 'green') + fn.chalk(`${funcName}`, 'cyan'));
  } else {
    funcName = await inquirerName();
  }
  if (/[^0-9a-zA-Z$_]|^[0-9]/.test(funcName)) {
    console.log(fn.chalk('函数名不合法，请重新输入！', 'red'));
    return getFunctionName('');
  }
  if (libFunctionList.includes(funcName)) {
    console.log(fn.chalk('函数名不能和已有函数重复，请重新输入！', 'red'));
    return getFunctionName('');
  }
  return funcName;
}

/**
 * 获取函数描述
 */
async function getFunctionDesc() {
  const descName = (await inquirerName(true)).trim();
  if (descName.length < 3) {
    console.log(fn.chalk('函数功能描述有点短，请重新输入！', 'red'));
    return getFunctionDesc();
  }
  return descName;
}

/**
 * 获取函数插入位置
 */
async function getFuncBefore() {
  const { fnBefore } = await inquirer.prompt(
    [
      {
        type: 'search-list',
        name: 'fnBefore',
        message: '需要插入到哪个函数后面？',
        choices: libFunctionList,
      },
    ],
    {}
  );
  return fnBefore;
}

/**
 * 获取函数模板
 */
function getFuncTpl(fnName, fnDesc) {
  return `\
/**
 * ${fnDesc}
 */
function ${fnName}() {

}
export default ${fnName};
`;
}

/**
 * 获取函数import模板
 */
function getFuncIptTpl(fnName, fnBefore) {
  return indexText.replace(
    new RegExp(`import ${fnBefore} from '\\.\\/${fnBefore}';`),
    $0 => `${$0}\nimport ${fnName} from './${fnName}';`
  );
}
/**
 * 获取函数定义模板
 */
function getFuncDtsTpl(fnName, fnBefore, fnDesc) {
  const spaces = new Array(24 - fnName.length).fill(' ').join('');
  return (
    dtsText
      // 增加接口列表
      .replace(
        new RegExp(`b\\.${fnBefore}\\(\\)\\s*\\/\\/.*`),
        $0 => `${$0}\nb.${fnName}()${spaces}// ${fnDesc}`
      )
      // 增加接口定义
      .replace(
        new RegExp(
          `(?<=[\\r\\n])(\\s*)${fnBefore}\\(\.*?\\):.*;(?=(?:\\r|\\n|\\s)*(?:\\/\\*\\*|\\/\\/\\s=*))`
        ),
        ($0, $1) => `${$0}\n${$1}/** */\n${$1}${fnName}(...args: any[]): any;`
      )
  );
}

/**
 * 获取函数用例模板
 */
function getFuncSpec(fnName, fnDesc) {
  return `\
import { expect } from "chai";
import b from "../";

describe("测试函数${fnName}", () => {
  it("测试函数${fnName}：${fnDesc}", () => {
    expect(b.isFun(b.${fnName})).to.be.true;
  });
});
`;
}
