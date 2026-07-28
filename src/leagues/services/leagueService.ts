import type {League} from '../types';
import {endpoints} from '../../shared/api/endpoints';

const cache = new Map<string, League[]>();

export const clearLeagueCache = () => cache.clear();

export const fetchLeagues = async (): Promise<League[]> => {
    const key = 'leagues';
    
    if (cache.has(key))
        return cache.get(key)!;
    
    const response = await fetch(endpoints.leagues);
    
    if (!response.ok)
        throw Error('Failed to fetch leagues');
    
    const data = await response.json();
    const leagues: League[] = data.leagues || [];
    
    cache.set(key, leagues);
    
    return leagues;
};
