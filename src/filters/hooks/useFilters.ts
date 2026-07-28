import {useState} from 'react';
import type {League} from '../../leagues/types';
import {filterLeagues, type LeagueFilter} from '../engines/filter-leagues.ts';

const returns = <T>(a: T) => () => a;
const success = returns<boolean>(true);

interface UseFiltersResult {
    search: string;
    setSearch: (value: string) => void;
    sport: string;
    setSport: (value: string) => void;
    filteredLeagues: League[];
}

export const useFilters = (leagues: League[]): UseFiltersResult => {
    const [search, setSearch] = useState('');
    const [sport, setSport] = useState('');
    
    const filteredLeagues = filterLeagues(leagues, [
        createSearchFilter(search),
        createSportFilter(sport),
    ]);
    
    return {
        search,
        setSearch,
        sport,
        setSport,
        filteredLeagues,
    };
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
