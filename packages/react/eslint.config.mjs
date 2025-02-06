import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import parser from 'vue-eslint-parser'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/es',
      '**/lib',
      '**/vite.config.mts',
      '**/env.d.ts',
      '**/postcss.config.js',
      'public/**/*'
    ]
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      vue,
      '@typescript-eslint': typescriptEslint,
      prettier
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...vue.configs.recommended.globals
      },
      parser: parser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
          jsx: true
        },
        tsconfigRootDir: '.',
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue']
      }
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'promise/always-return': 'off',
      'no-global-assign': 'off',
      'no-multi-str': 'off',
      'class-methods-use-this': 'off',
      'no-console': 'off',
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
]
