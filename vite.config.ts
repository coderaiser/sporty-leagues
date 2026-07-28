import process from 'node:process';
import '@testing-library/jest-dom/vitest';
import {defineConfig} from 'vite';
import react, {
    reactCompilerPreset,
} from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

const base = process.env.BASE || '/';

export default defineConfig({
    base,
    plugins: [
        react(),
        babel({
            presets: [
                reactCompilerPreset(),
            ],
        }),
    ],
});

