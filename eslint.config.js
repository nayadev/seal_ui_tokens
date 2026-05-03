import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
    plugins: { import: importPlugin },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'import/no-duplicates': 'error',
    },
  },
  {
    ignores: ['build/', 'node_modules/'],
  },
]
