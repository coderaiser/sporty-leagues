import {renderHook, waitFor} from '@testing-library/react';
import {http, HttpResponse} from 'msw';
import {server} from '../../mocks/server';
import {mockLeagues} from '../../mocks/fixtures';
import {useLeagues} from './useLeagues';
import {clearLeagueCache} from '../services/leagueService';
import {endpoints} from '../../shared/api/endpoints.ts';

beforeEach(() => {
    clearLeagueCache();
});

describe('useLeagues', () => {
    it('has loading state initially', () => {
        const {result} = renderHook(() => useLeagues());
        
        expect(result.current).toEqual({
            leagues: [],
            loading: true,
            error: null,
        });
    });
    
    it('sets leagues on successful fetch', async () => {
        const {result} = renderHook(() => useLeagues());
        
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        
        expect(result.current.leagues).toEqual(mockLeagues);
    });
    
    it('sets error on fetch failure', async () => {
        server.use(
            http.get(endpoints.leagues, () => HttpResponse.error()),
        );
        
        const {result} = renderHook(() => useLeagues());
        
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        
        expect(result.current.error).toBe('Failed to fetch');
    });
    
    it('does not fetch again on rerender because service cache is used', async () => {
        const spy = vi.spyOn(globalThis, 'fetch');
        
        const {result, rerender} = renderHook(() => useLeagues());
        
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        
        rerender();
        
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('does not fetch again when hook is mounted twice because service cache is used', async () => {
        const spy = vi.spyOn(globalThis, 'fetch');
        const first = renderHook(() => useLeagues());
        
        await waitFor(() => {
            expect(first.result.current.loading).toBe(false);
        });
        
        first.unmount();
        
        const second = renderHook(() => useLeagues());
        
        await waitFor(() => {
            expect(second.result.current.loading).toBe(false);
        });
        
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
