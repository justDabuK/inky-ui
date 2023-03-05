module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended',
      '@vue/typescript/recommended',
      'prettier'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: {
            ts: '@typescript-eslint/parser',
            '<template>': 'espree',
        }
    },

    plugins: ['prettier'],
    ignorePatterns: ['**/*.d.ts'],
    rules: {
        'no-console': 'error',
        'no-debugger': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }
        ]
    },
    globals: {
        page: true,
        browser: true,
        context: true,
    }
};
