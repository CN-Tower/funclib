module.exports = {
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ['import'],
  rules: {
    'import/no-named-as-default': 0,
    'prefer-object-spread': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-continue': 0,
    'prefer-rest-params': 0,
    'no-return-assign': 0,
    'no-bitwise': 0,
    'prefer-spread': 0,
    'consistent-return': 0,
    'no-prototype-builtins': 0,
  },
};
