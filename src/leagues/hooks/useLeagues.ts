import {useEffect, useState} from 'react';
import {tryToCatch} from 'try-to-catch';
import {fetchLeagues} from '../services/leagueService';
import type {League} from '../types';

interface UseLeaguesResult {
    leagues: League[];
    loading: boolean;
    error: string | null;
}

const isError = (a: unknown) => a instanceof Error;
const parseError = (error: Error) => isError(error) ? error.message : 'Unknown error';

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
