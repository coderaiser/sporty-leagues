import {http, HttpResponse} from 'msw';
import {vi} from 'vitest';
import {server} from '../../mocks/server';
import {
    fetchLeagues,
    clearLeagueCache,
} from './leagueService';
import {mockLeagues} from '../../mocks/fixtures';
import {endpoints} from '../../shared/api/endpoints.ts';

beforeEach(() => clearLeagueCache());

describe('fetchLeagues', () => {
    it('returns league array on success', async () => {
        const leagues = await fetchLeagues();
        expect(leagues).toEqual(mockLeagues);
    });
    
    it('returns cached result on second call without fetching again', async () => {
        const spy = vi.spyOn(globalThis, 'fetch');
        await fetchLeagues();
        await fetchLeagues();
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('clears cache when clearCache is called', async () => {
        const spy = vi.spyOn(globalThis, 'fetch');
        await fetchLeagues();
        clearLeagueCache();
        await fetchLeagues();
        expect(spy).toHaveBeenCalledTimes(2); // requires vi.restoreAllMocks() in afterEach
    });
    
    it('throws on network error', async () => {
        server.use(http.get(endpoints.leagues, () => HttpResponse.error()));
        await expect(fetchLeagues()).rejects.toThrow();
    });
    
    it('returns empty array when leagues is null in response', async () => {
        server.use(http.get(endpoints.leagues, () => HttpResponse.json({
            leagues: null,
        })));
        
        const leagues = await fetchLeagues();
        
        expect(leagues).toEqual([]);
    });
    
    it('throws when response is not ok', async () => {
        server.use(http.get(endpoints.leagues, () => new HttpResponse(null, {
            status: 500,
        })));
        
        await expect(fetchLeagues()).rejects.toThrow();
    });
});
