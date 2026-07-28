import {http, HttpResponse} from 'msw';
import {server} from '../../mocks/server.ts';
import {
    fetchBadge,
    clearCache,
    selectBadge,
} from './badgeService.ts';
import {mockSeasons} from '../../mocks/fixtures.ts';

const URL =
    'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php';

beforeEach(() => clearCache());

describe('selectBadge', () => {
    it('returns first available badge', () => {
        expect(selectBadge(mockSeasons)).toBe('https://example.com/badge.png');
    });
    
    it('returns null when no badges exist', () => {
        expect(
            selectBadge([{strSeason: '2020', strBadge: null}, {strSeason: '2021', strBadge: null}]),
        ).toBeNull();
    });
});

describe('fetchBadge', () => {
    it('returns badge url on success', async () => {
        const badge = await fetchBadge('4328');
        expect(badge).toBe('https://example.com/badge.png');
    });
    
    it('returns cached result on second call', async () => {
        const spy = vi.spyOn(globalThis, 'fetch');
        
        await fetchBadge('4328');
        await fetchBadge('4328');
        
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('clears cache when clearCache is called', async () => {
        const spy = vi.spyOn(globalThis, 'fetch');
        
        await fetchBadge('4328');
        clearCache();
        await fetchBadge('4328');
        
        expect(spy).toHaveBeenCalledTimes(2);
    });
    
    it('throws on network error', async () => {
        server.use(
            http.get(URL, () => HttpResponse.error()),
        );
        
        await expect(fetchBadge('4328')).rejects.toThrow();
    });
    
    it('returns null when seasons is null', async () => {
        server.use(
            http.get(URL, () => HttpResponse.json({seasons: null})),
        );
        
        const badge = await fetchBadge('4328');
        
        expect(badge).toBeNull();
    });
});
