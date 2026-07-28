import type {Season} from '..//types.ts';

const cache = new Map<string, string | null>();

const URL = `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1`;
const buildURL = (id: string) => {
    return `${URL}&id=${id}`;
};

export const clearBadgeCache = () => cache.clear();

export const selectBadge = (seasons: Season[]): string | null => seasons.find((s) => s.strBadge !== null)?.strBadge ?? null;

export const fetchBadge = async (id: string): Promise<string | null> => {
    if (cache.has(id))
        return cache.get(id)!;
    
    const response = await fetch(buildURL(id));
    
    if (!response.ok)
        throw Error('Failed to fetch badge');
    
    const data = await response.json();
    const badge = selectBadge(data.seasons ?? []);
    
    cache.set(id, badge);
    
    return badge;
};
