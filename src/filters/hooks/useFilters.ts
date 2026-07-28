import {useState} from 'react';
import type {League} from '../../leagues/types';
import {
    filterLeagues,
    createSearchFilter,
    createSportFilter,
} from '../engines/filter-leagues.ts';

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
