import {run, cutEnv} from 'madrun';

const env = {
    NODE_OPTIONS:`"--no-experimental-webstorage"`,
}

export default {
    'dev': () => 'vite',
    'build': () => 'tsc -b && vite build',
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => [env, 'vitest'],
    'coverage': () => [env, cutEnv('test', 'run --coverage')],
    'preview': () => 'vite preview',
};
