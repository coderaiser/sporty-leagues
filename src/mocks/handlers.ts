import {http, HttpResponse} from 'msw';
import {mockLeagues, mockSeasons} from './fixtures';

export const handlers = [
    http.get('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php', () => HttpResponse.json({
        leagues: mockLeagues,
    })),
    http.get('https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php', () => HttpResponse.json({
        seasons: mockSeasons,
    })),
];
