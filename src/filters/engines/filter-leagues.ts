import type {League} from '../../leagues/types';

export interface NormalizedLeague {
    id: string;
    sport: string;
    searchText: string;
}

export type LeagueFilter = (league: NormalizedLeague) => boolean;

export const filterLeagues = (leagues: League[], filters: LeagueFilter[]) => {
    const leagueMap = createLeagueMap(leagues);
    const normalizedLeagues: NormalizedLeague[] = leagues.map(normalizeLeague);
    
    return applyFilters(normalizedLeagues, filters).map(getLeagueFromMap(leagueMap));
};

const normalizeLeague = (league: League): NormalizedLeague => {
    const {
        idLeague,
        strSport,
        strLeague,
        strLeagueAlternate,
    } = league;
    
    const searches = [
        strLeague,
        strLeagueAlternate || '',
    ];
    
    const searchText = searches
        .join(' ')
        .toLowerCase();
    
    return {
        id: idLeague,
        sport: strSport,
        searchText,
    };
};

const createLeagueMap = (leagues: League[]): Map<string, League> => {
    const result = new Map<string, League>();
    
    for (const league of leagues) {
        result.set(league.idLeague, league);
    }
    
    return result;
};

const getLeagueFromMap = (leagueMap: Map<string, League>) => (league: NormalizedLeague): League => leagueMap.get(league.id)!;

export const applyFilters = (leagues: NormalizedLeague[], filters: LeagueFilter[]): NormalizedLeague[] => {
    const result: NormalizedLeague[] = [];
    
    for (const league of leagues) {
        let matches = true;
        
        for (const filter of filters) {
            if (!filter(league)) {
                matches = false;
                break;
            }
        }
        
        if (matches)
            result.push(league);
    }
    
    return result;
};
