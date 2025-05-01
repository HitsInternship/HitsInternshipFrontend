import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPrettier from 'eslint-plugin-prettier';
import eslintImport from 'eslint-plugin-import';
import eslintReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginQuery from '@tanstack/eslint-plugin-query';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
    {
        ignores: [
            'dist',
            'node_modules',
            'eslint.config.js',
            'src/components',
            'src/hooks/use-toast.ts',
        ],
    },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            ...pluginQuery.configs['flat/recommended'],
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['tsconfig.app.json', 'tsconfig.node.json'],
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: eslintReact,
            prettier: eslintPrettier,
            import: eslintImport,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            ...eslintConfigPrettier.rules,
            'prettier/prettier': 'error',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['sibling', 'parent'],
                        'index',
                    ],
                    'newlines-between': 'always',
                },
            ],
            'prefer-const': 'error',
            'react/jsx-curly-brace-presence': [
                'warn',
                { props: 'never', children: 'never' },
            ],
            'react/function-component-definition': [
                'warn',
                { namedComponents: 'arrow-function' },
            ],
            'react/self-closing-comp': ['error', { component: true, html: true }],
        },
    },
);

