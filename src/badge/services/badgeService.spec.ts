import {http, HttpResponse} from 'msw';
import {server} from '../../mocks/server.ts';
import {
    fetchBadge,
    clearBadgeCache,
    selectBadge,
} from './badgeService.ts';
import {mockSeasons} from '../../mocks/fixtures.ts';
import {endpoints} from '../../shared/api/endpoints.ts';

beforeEach(() => clearBadgeCache());

describe('selectBadge', () => {
    it('returns first available badge', () => {
        expect(selectBadge(mockSeasons)).toBe('https://example.com/badge.png');
    });
    
    it('returns null when no badges exist', () => {
        expect(selectBadge([{
            strSeason: '2020',
            strBadge: null,
        }, {
            strSeason: '2021',
            strBadge: null,
        }])).toBeNull();
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
        clearBadgeCache();
        await fetchBadge('4328');
        
        expect(spy).toHaveBeenCalledTimes(2);
    });
    
    it('throws on network error', async () => {
        server.use(http.get(endpoints.seasons, () => HttpResponse.error()));
        
        await expect(fetchBadge('4328')).rejects.toThrow();
    });
    
    it('returns null when seasons is null', async () => {
        server.use(http.get(endpoints.seasons, () => HttpResponse.json({
            seasons: null,
        })));
        
        const badge = await fetchBadge('4328');
        
        expect(badge).toBeNull();
    });
});
