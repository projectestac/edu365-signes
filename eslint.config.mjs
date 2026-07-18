import { defineConfig } from "eslint/config";
import globals from "globals";
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
// import pluginReact from "eslint-plugin-react";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    extends: [
      eslintJs.configs.recommended,
      eslintReact.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax support
        },
      },
    },
  },
  {
    settings: { react: { version: 'detect' } },
    rules: {
      'react/no-unescaped-entities': 'off',
      'react/prop-types': [0],
      "no-unused-vars": ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    },
  }
]);