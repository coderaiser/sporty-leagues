import {safeAlign} from 'eslint-plugin-putout';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import {defineConfig, globalIgnores} from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']), {
        files: ['**/*.{ts,tsx}'],
        extends: [
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            safeAlign,
        ],
        languageOptions: {
            globals: globals.browser,
        },
    },
]);
