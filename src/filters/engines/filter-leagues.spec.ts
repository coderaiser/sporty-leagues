import {
    filterLeagues,
    normalizeLeague,
    createSearchFilter,
    createSportFilter,
    applyFilters,
} from './filter-leagues.ts';
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

const singleLeague: League = leagues[0];

describe('normalizeLeague', () => {
    it('joins strLeague and strLeagueAlternate into lowercase searchText', () => {
        const result = normalizeLeague(singleLeague);
        
        expect(result.searchText).toBe('english premier league epl');
    });
    
    it('maps idLeague to id field', () => {
        const result = normalizeLeague(singleLeague);
        
        expect(result.id).toBe('4328');
    });
});

describe('createSearchFilter', () => {
    it('returns true when query matches searchText', () => {
        const normalized = normalizeLeague(singleLeague);
        const filter = createSearchFilter('Premier');
        
        expect(filter(normalized)).toBe(true);
    });
    
    it('returns false when query does not match', () => {
        const normalized = normalizeLeague(singleLeague);
        const filter = createSearchFilter('Baseball');
        
        expect(filter(normalized)).toBe(false);
    });
    
    it('returns true for empty query', () => {
        const normalized = normalizeLeague(singleLeague);
        const filter = createSearchFilter('');
        
        expect(filter(normalized)).toBe(true);
    });
});

describe('createSportFilter', () => {
    it('returns true when sport matches', () => {
        const normalized = normalizeLeague(singleLeague);
        const filter = createSportFilter('Soccer');
        
        expect(filter(normalized)).toBe(true);
    });
    
    it('returns false when sport does not match', () => {
        const normalized = normalizeLeague(singleLeague);
        const filter = createSportFilter('Basketball');
        
        expect(filter(normalized)).toBe(false);
    });
    
    it('returns true for empty sport', () => {
        const normalized = normalizeLeague(singleLeague);
        const filter = createSportFilter('');
        
        expect(filter(normalized)).toBe(true);
    });
});

describe('applyFilters', () => {
    it('returns empty array when one filter fails', () => {
        const normalized = leagues.map(normalizeLeague);
        const result = applyFilters(normalized, [
            createSearchFilter('Premier'),
            createSportFilter('Basketball'),
        ]);
        
        expect(result).toEqual([]);
    });
});

describe('filterLeagues', () => {
    it('filters', () => {
        const result = filterLeagues(leagues, []);
        
        expect(result).toEqual(leagues);
    });
    
    it('with filters', () => {
        const result = filterLeagues(leagues, [
            createSportFilter('Soccer'),
        ]);
        
        const expected = [{
            idLeague: '4328',
            strLeague: 'English Premier League',
            strLeagueAlternate: 'EPL',
            strSport: 'Soccer',
        }, {
            idLeague: '4329',
            strLeague: 'English League Championship',
            strLeagueAlternate: '',
            strSport: 'Soccer',
        }];
        
        expect(result).toEqual(expected);
    });
});
