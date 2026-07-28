import type {League} from '../types';

const cache = new Map<string, League[]>();

export const clearCache = () => cache.clear();

export const URL = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';

export const fetchLeagues = async (): Promise<League[]> => {
    const key = 'leagues';
    
    if (cache.has(key))
        return cache.get(key)!;
    
    const response = await fetch(URL);
    
    if (!response.ok)
        throw Error('Failed to fetch leagues');
    
    const data = await response.json();
    const leagues: League[] = data.leagues || [];
    
    cache.set(key, leagues);
    
    return leagues;
};
