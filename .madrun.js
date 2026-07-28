import {run} from 'madrun';

export default {
    'dev': () => 'vite',
    'build': () => 'tsc -b && vite build',
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => 'vitest',
    'coverage': () => run('test', 'run --coverage'),
    'preview': () => 'vite preview',
};
