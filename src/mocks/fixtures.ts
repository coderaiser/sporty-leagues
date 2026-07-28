import type {League} from '../leagues/types';
import type {Season} from '../badge/types';

export const mockLeagues: League[] = [{
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

export const mockSeasons: Season[] = [{
    strSeason: '2018-2019',
    strBadge: null,
}, {
    strSeason: '2019-2020',
    strBadge: 'https://example.com/badge.png',
}, {
    strSeason: '2020-2021',
    strBadge: 'https://example.com/badge2.png',
}];
