import {http, HttpResponse} from 'msw';
import {server} from '../../mocks/server';
import {fetchLeagues, clearCache} from './leagueService';
import {mockLeagues} from '../../mocks/fixtures';
import {URL} from './leagueService.ts';

beforeEach(() => clearCache());

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
        clearCache();
        await fetchLeagues();
        expect(spy).toHaveBeenCalledTimes(2); // requires vi.restoreAllMocks() in afterEach
    });
    
    it('throws on network error', async () => {
        server.use(http.get(URL, () => HttpResponse.error()));
        await expect(fetchLeagues()).rejects.toThrow();
    });
    
    it('returns empty array when leagues is null in response', async () => {
        server.use(http.get(URL, () => HttpResponse.json({leagues: null})));
        
        const leagues = await fetchLeagues();
        
        expect(leagues).toEqual([]);
    });
});
