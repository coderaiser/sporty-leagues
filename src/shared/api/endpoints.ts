import {env} from '../config/env.ts';

export const endpoints = {
    leagues: `${env.sportsApiBaseUrl}/all_leagues.php`,
    seasons: `${env.sportsApiBaseUrl}/search_all_seasons.php`,
};
