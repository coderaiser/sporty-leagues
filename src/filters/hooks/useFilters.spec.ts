import {renderHook, act} from '@testing-library/react';
import {useFilters} from './useFilters';
import type {League} from '../../leagues/types';

const leagues: League[] = [{
    idLeague: '4328',
    strLeague: 'English Premier League',
    strSport: 'Soccer',
    strLeagueAlternate: 'EPL',
}, {
    idLeague: '4329',
    strLeague: 'English League Championship',
    strSport: 'Soccer',
    strLeagueAlternate: '',
}, {
    idLeague: '4387',
    strLeague: 'NBA',
    strSport: 'Basketball',
    strLeagueAlternate: 'National Basketball Association',
}, {
    idLeague: '4391',
    strLeague: 'Formula 1',
    strSport: 'Motorsport',
    strLeagueAlternate: 'F1',
}];

describe('useFilters', () => {
    it('returns all leagues when search and sport are empty', () => {
        const {result} = renderHook(() => useFilters(leagues));
        
        expect(result.current.filteredLeagues).toEqual(leagues);
    });
    
    it('filters by strLeague match', () => {
        const {result} = renderHook(() => useFilters(leagues));
        
        act(() => {
            result.current.setSearch('Premier');
        });
        
        expect(result.current.filteredLeagues).toEqual([leagues[0]]);
    });
    
    it('filters by strLeagueAlternate match', () => {
        const {result} = renderHook(() => useFilters(leagues));
        
        act(() => {
            result.current.setSearch('EPL');
        });
        
        expect(result.current.filteredLeagues).toEqual([leagues[0]]);
    });
    
    it('filters by sport type', () => {
        const {result} = renderHook(() => useFilters(leagues));
        
        act(() => {
            result.current.setSport('Basketball');
        });
        
        expect(result.current.filteredLeagues).toEqual([leagues[2]]);
    });
    
    it('uses AND logic for combined search and sport filters', () => {
        const {result} = renderHook(() => useFilters(leagues));
        
        act(() => {
            result.current.setSearch('English');
            result.current.setSport('Soccer');
        });
        
        expect(result.current.filteredLeagues).toEqual([
            leagues[0],
            leagues[1],
        ]);
    });
    
    it('search is case-insensitive', () => {
        const {result} = renderHook(() => useFilters(leagues));
        
        act(() => {
            result.current.setSearch('premier');
        });
        
        expect(result.current.filteredLeagues).toEqual([leagues[0]]);
    });
    
    it('returns empty array when no match exists', () => {
        const {result} = renderHook(() => useFilters(leagues));
        
        act(() => {
            result.current.setSearch('unknown league');
        });
        
        expect(result.current.filteredLeagues).toEqual([]);
    });
});
