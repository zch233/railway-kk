const path = require('path');
const fs = require('fs');

function parseAutoImportsDts(contents) {
    const matchResults = contents.matchAll(/^\s+const (\w+): typeof import/gm);
    return Array.from(matchResults, ([, word]) => word);
}

function uiPackageAutoImportGlobals() {
    const autoImportsPath = path.resolve(__dirname, './auto-imports.d.ts');
    const envPath = path.resolve(__dirname, './.env');
    const contents = fs.readFileSync(autoImportsPath, { encoding: 'utf-8' });
    const envs = fs.readFileSync(envPath, { encoding: 'utf-8' });
    const parsed = parseAutoImportsDts(contents);
    return envs.match(/(?<=VITE_UNPLUGINS_IMPORTS=).*/)[0] === 'true'
        ? parsed.reduce((acc, word) => {
              acc[word] = 'readonly';
              return acc;
          }, {})
        : {};
}

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: 'vue-eslint-parser',
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'space-before-function-paren': 'off',
        'vue/attributes-order': 'off',
        'vue/one-component-per-file': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-prop-type-constructor': 0,
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
    },
    globals: {
        defineProps: true,
        defineEmits: true,
        defineExpose: true,
        ...uiPackageAutoImportGlobals(),
    },
};
