import {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    vi,
} from 'vitest';
import {server} from './src/mocks/server';
import {clearLeagueCache} from './src/leagues/services/leagueService';
import {clearBadgeCache} from './src/badge/services/badgeService';

beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
}));

afterEach(() => {
    server.resetHandlers();
    vi.restoreAllMocks(); // prevents fetch spy call counts leaking between tests
});

beforeEach(() => {
    clearLeagueCache();
    clearBadgeCache();
});

afterAll(() => server.close());
