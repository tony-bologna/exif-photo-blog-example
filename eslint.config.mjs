import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'), {
    ignoreDuringBuilds: true,
    ignores: ['app/about/page.tsx',
      '.app/book-me/page.tsx',
      '.src/app/ViewSwitcher.tsx',
      '.src/components/ButtonLink.tsx',
      '.src/components/InfoBlock.tsx',],
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-unused-expressions': ['off'],
      '@typescript-eslint/no-unused-vars': [
        'off', {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
        },
      ],
      'comma-dangle': [
        'warn',
        'always-multiline',
      ],
      'indent': [
        'off',
        2,
      ],
      'linebreak-style': [
        'warn',
        'unix',
      ],
      'quotes': [
        'warn',
        'single',
      ],
      'semi': [
        'warn',
        'always',
      ],
      'max-len': [
        'warn',
        { 'code': 80 },
      ],
    },
  }];

export default eslintConfig;
