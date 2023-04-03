/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],

  overrides: [
    {
      files: [
        '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      extends: [
        'plugin:cypress/recommended'
      ],
      env: {
        jest: true
      }
    }
  ],

  parserOptions: {
    ecmaVersion: 'latest'
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'eqeqeq': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-var': ['error'],
    'no-unused-vars': ['warn'],
    'no-mixed-spaces-and-tabs': ['warn'],
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'always']
  },
}
