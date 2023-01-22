module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2015,
    },
};