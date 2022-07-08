module.exports = {
  root: true,
  env: {
    node: true, // node 全局变量和作用域
    es6: true, // 启用 ES6 语法支持
    browser: true // 浏览器全局变量
  },
  parser: 'vue-eslint-parser', //定义ESLint的解析器
  parserOptions: {
    parser: '@typescript-eslint/parser' // 解析 .ts 文件
  },
  extends: [
    //定义文件继承的子规范
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  plugins: ['prettier', '@typescript-eslint'], // 定义了eslint文件所依赖的插件
  rules: {
    'prettier/prettier': 'warn', // prettier 检查警告
    'vue/multi-word-component-names': ['off'] // 允许单个词组件名称
  },
  exclude: ['node_modules', 'dist']
};
