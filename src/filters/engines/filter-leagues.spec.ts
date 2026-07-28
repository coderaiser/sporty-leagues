import {filterLeagues, type LeagueFilter} from './filter-leagues.ts';
import type {League} from '../../leagues/types';

const returns = <T>(a: T) => () => a;
const success = returns<boolean>(true);

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

describe('filterLeagues', () => {
    it('filters', () => {
        const result = filterLeagues(leagues, []);
        
        expect(result).toEqual(leagues);
    });
    
    it('with filters ', () => {
        const createSportFilter = (sport: string): LeagueFilter => {
            if (!sport)
                return success;
            
            return (league) => league.sport === sport;
        };
        
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
