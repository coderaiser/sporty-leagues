import {http, HttpResponse} from 'msw';
import {mockLeagues, mockSeasons} from './fixtures';
import {endpoints} from '../shared/api/endpoints.ts';

export const handlers = [
    http.get(endpoints.leagues, () => HttpResponse.json({
        leagues: mockLeagues,
    })),
    http.get(endpoints.seasons, () => HttpResponse.json({
        seasons: mockSeasons,
    })),
];
