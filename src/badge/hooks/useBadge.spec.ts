import {renderHook, act} from '@testing-library/react';
import {http, HttpResponse} from 'msw';
import {server} from '../../mocks/server';
import {clearBadgeCache} from '../services/badgeService';
import {useBadge} from './useBadge';
import {endpoints} from '../../shared/api/endpoints.ts';

beforeEach(() => {
    clearBadgeCache();
});

describe('useBadge', () => {
    it('has idle state initially', () => {
        const {result} = renderHook(() => useBadge());
        
        expect(result.current).toEqual({
            badge: null,
            loading: false,
            error: null,
            fetch: expect.any(Function),
        });
    });
    
    it('sets badge url on successful fetch', async () => {
        const {result} = renderHook(() => useBadge());
        
        await act(async () => {
            await result.current.fetch('4328');
        });
        
        expect(result.current.badge).toBe('https://example.com/badge.png');
    });
    
    it('sets error on fetch failure', async () => {
        server.use(http.get(endpoints.seasons, () => HttpResponse.error()));
        
        const {result} = renderHook(() => useBadge());
        
        await act(async () => {
            await result.current.fetch('4328');
        });
        
        expect(result.current.error).toBe('Failed to fetch');
    });
    
    it('does not call fetch twice for the same id because service cache is used', async () => {
        const spy = vi.spyOn(globalThis, 'fetch');
        
        const {result} = renderHook(() => useBadge());
        
        await act(async () => {
            await result.current.fetch('4328');
            await result.current.fetch('4328');
        });
        
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('sets null badge when no season has a badge', async () => {
        server.use(http.get(endpoints.seasons, () => HttpResponse.json({
            seasons: [{
                strSeason: '2020-2021',
                strBadge: null,
            }],
        })));
        
        const {result} = renderHook(() => useBadge());
        
        await act(async () => {
            await result.current.fetch('4328');
        });
        
        expect(result.current.badge).toBeNull();
    });
});
