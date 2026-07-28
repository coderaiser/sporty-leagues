import {useState} from 'react';
import type {League} from '../../leagues/types';

const returns = (a: unknown) => () => a;
const success = returns(true);

interface NormalizedLeague {
    id: string;
    sport: string;
    searchText: string;
}

type LeagueFilter = (league: NormalizedLeague) => boolean;

interface UseFiltersResult {
    search: string;
    setSearch: (value: string) => void;
    sport: string;
    setSport: (value: string) => void;
    filteredLeagues: League[];
}

const normalizeLeague = (league: League): NormalizedLeague => {
    const {
        idLeague,
        strSport,
        strLeague,
        strLeagueAlternate,
    } = league;
    
    return {
        id: idLeague,
        sport: strSport,
        searchText: [
            strLeague,
            strLeagueAlternate || '',
        ]
            .join(' ')
            .toLowerCase(),
    };
};

const createLeagueMap = (leagues: League[]): Map<string, League> => {
    const result = new Map<string, League>();
    
    for (const league of leagues) {
        result.set(league.idLeague, league);
    }
    
    return result;
};

const getLeagueFromMap = (leagueMap: Map<string, League>) => (league: NormalizedLeague): League => {
    return leagueMap.get(league.id)!;
};

const createSearchFilter = (search: string): LeagueFilter => {
    const query = search.toLowerCase();
    
    if (!query)
        return success;
    
    return (league) => league.searchText.includes(query);
};

const createSportFilter = (sport: string): LeagueFilter => {
    if (!sport)
        return success;
    
    return (league) => league.sport === sport;
};

const applyFilters = (leagues: NormalizedLeague[], filters: LeagueFilter[]): NormalizedLeague[] => {
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

export const useFilters = (leagues: League[]): UseFiltersResult => {
    const [search, setSearch] = useState('');
    const [sport, setSport] = useState('');
    
    const normalizedLeagues = leagues.map(normalizeLeague);
    
    const leagueMap = createLeagueMap(leagues);
    
    const filters: LeagueFilter[] = [
        createSearchFilter(search),
        createSportFilter(sport),
    ];
    
    const filteredLeagues = applyFilters(normalizedLeagues, filters).map(getLeagueFromMap(leagueMap));
    
    return {
        search,
        setSearch,
        sport,
        setSport,
        filteredLeagues,
    };
};

