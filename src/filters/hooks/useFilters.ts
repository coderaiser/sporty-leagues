import {useState} from 'react';
import type {League} from '../../leagues/types';

interface UseFiltersResult {
    search: string;
    setSearch: (value: string) => void;
    sport: string;
    setSport: (value: string) => void;
    filteredLeagues: League[];
}

export const useFilters = (leagues: League[]): UseFiltersResult => {
    const [search, setSearch] = useState<string>('');
    const [sport, setSport] = useState<string>('');
    
    const normalizedSearch = search.toLowerCase();
    const filteredLeagues = leagues.filter((league) => {
        const matchesSearch = normalizedSearch === '' || league.strLeague
            .toLowerCase()
            .includes(normalizedSearch) || (league.strLeagueAlternate ?? '')
            .toLowerCase()
            .includes(normalizedSearch);
        
        const matchesSport = sport === '' || league.strSport === sport;
        
        return matchesSearch && matchesSport;
    });
    
    return {
        search,
        setSearch,
        sport,
        setSport,
        filteredLeagues,
    };
};
