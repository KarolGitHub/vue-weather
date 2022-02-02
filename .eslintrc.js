module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'prettier/prettier': ['warn', { singleQuote: true, endOfLine: 'auto', trailingComma: 'all' }],
    'no-unused-vars': 'warn',
    'no-console': 'off'
  }
  /* parserOptions: {
    parser: 'babel-eslint'
  } */
};
