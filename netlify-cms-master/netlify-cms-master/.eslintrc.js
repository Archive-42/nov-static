const fs = require('fs');

const packages = fs
  .readdirSync(`${__dirname}/packages`, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'prettier',
    'plugin:import/recommended',
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  globals: {
    NETLIFY_CMS_VERSION: false,
    NETLIFY_CMS_APP_VERSION: false,
    NETLIFY_CMS_CORE_VERSION: false,
    CMS_ENV: false,
  },
  rules: {
    'no-console': [0],
    'react/prop-types': [0],
    'import/no-named-as-default': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index'], ['type']],
      },
    ],
    'no-duplicate-imports': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
    'require-atomic-updates': [0],
    'object-shorthand': ['error', 'always'],
    'func-style': ['error', 'declaration'],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
  },
  plugins: ['babel', '@emotion', 'cypress'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/core-modules': [...packages, 'netlify-cms-app/dist/esm'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:cypress/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'no-duplicate-imports': [0], // handled by @typescript-eslint
        '@typescript-eslint/ban-types': [0], // TODO enable in future
        '@typescript-eslint/no-non-null-assertion': [0],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': [0],
        '@typescript-eslint/explicit-module-boundary-types': [0],
        '@typescript-eslint/no-duplicate-imports': 'error',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: true, variables: true },
        ],
      },
    },
    {
      files: ['website/**/*'],
      rules: {
        'import/no-unresolved': [0],
      },
    },
  ],
};
