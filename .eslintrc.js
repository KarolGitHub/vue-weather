module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: { 'prettier/prettier': ['warn', { singleQuote: true, endOfLine: 'auto', trailingComma: 'all' }] },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
