module.exports = {
  root: true,

  env: {
    node: true,
    commonjs: true,
    es2021: true
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2021'
  },

  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'eqeqeq': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-var': ['error'],
    'no-console': ['off'],
    'no-unused-vars': ['warn'],
    'no-mixed-spaces-and-tabs': ['warn'],
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'always'],
  }
}
