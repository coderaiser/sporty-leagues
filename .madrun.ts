import {run, cutEnv} from 'madrun';

const env = {
    NODE_OPTIONS: `"--no-experimental-webstorage"`,
};

export default {
    'start': () => 'vite',
    'start:prod': () => 'serve dist',
    'build': () => 'tsc -b && vite build',
    'report': async () => [env, await cutEnv('coverage', '--coverage.reporter lcov')],
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => [env, 'vitest'],
    'coverage': async () => [env, await cutEnv('test', 'run --coverage')],
    'preview': () => 'vite preview',
};
