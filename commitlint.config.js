module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义 表示git 提交的type必须在以下类型范围内
    'type-enum': [
      2, // 错误级别
      'always', // 在什么情况下进行验证
      ['chore', 'feat', 'fix', 'test', 'docs', 'perf', 'style', 'merge', 'revert', 'release', 'refactor'],
    ],
    // subject 大小写不做校验
    'subject-case': [0],
  },
};
