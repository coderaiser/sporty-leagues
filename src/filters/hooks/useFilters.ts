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
    clearFilters: () => void;
    isFiltered: boolean;
}

export const useFilters = (leagues: League[]): UseFiltersResult => {
    const [search, setSearch] = useState('');
    const [sport, setSport] = useState('');
    
    const filteredLeagues = filterLeagues(leagues, [
        createSearchFilter(search),
        createSportFilter(sport),
    ]);
    
    const clearFilters = () => {
        setSearch('');
        setSport('');
    };
    
    const isFiltered = Boolean(search || sport);
    
    return {
        search,
        setSearch,
        sport,
        setSport,
        filteredLeagues,
        clearFilters,
        isFiltered,
    };
};
