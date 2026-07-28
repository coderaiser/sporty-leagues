import {run, cutEnv} from 'madrun';

const env = {
    NODE_OPTIONS: `"--no-experimental-webstorage"`,
};

export default {
    'start': () => 'vite',
    'start:dev': () => run('start'),
    'start:prod': () => run('build:serve'),
    'build': () => 'tsc -b && vite build',
    'build:serve': () => run(['build', 'serve']),
    'serve': () => 'serve dist',
    'report': async () => [env, await cutEnv('coverage', '--coverage.reporter lcov')],
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => [env, 'vitest'],
    'coverage': async () => [env, await cutEnv('test', 'run --coverage')],
    'preview': () => 'vite preview',
};
