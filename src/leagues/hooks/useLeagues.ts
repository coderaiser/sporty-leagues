import {useEffect, useState} from 'react';
import {tryToCatch} from 'try-to-catch';
import {fetchLeagues} from '../services/leagueService';
import type {League} from '../types';
import {parseError} from '../../shared/error.ts';

interface UseLeaguesResult {
    leagues: League[];
    loading: boolean;
    error: string | null;
}

export const useLeagues = (): UseLeaguesResult => {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const loadLeagues = async () => {
            const [error, data] = await tryToCatch(fetchLeagues);
            
            if (error)
                setError(parseError(error));
            else
                setLeagues(data);
            
            setLoading(false);
        };
        
        loadLeagues();
    }, []);
    
    return {
        leagues,
        loading,
        error,
    };
};
