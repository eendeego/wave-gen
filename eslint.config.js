import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import solid from 'eslint-plugin-solid';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {ignores: ['dist/*']},
  {files: ['**/*.{js,mjs,cjs,ts,tsx}']},
  {
    files: ['**/*.js'],
    languageOptions: {sourceType: 'commonjs'},
    plugins: {solid},
  },
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
