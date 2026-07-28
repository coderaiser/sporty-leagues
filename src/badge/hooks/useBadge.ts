import {useState} from 'react';
import {tryToCatch} from 'try-to-catch';
import {fetchBadge} from '../services/badgeService';
import {parseError} from '../../shared/error.ts';

interface UseBadgeResult {
    badge: string | null;
    loading: boolean;
    error: string | null;
    fetch: (id: string) => Promise<void>;
}

export const useBadge = (): UseBadgeResult => {
    const [badge, setBadge] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const fetch = async (id: string) => {
        setLoading(true);
        setError(null);
        
        const [error, data] = await tryToCatch(fetchBadge, id);
        
        if (error)
            setError(parseError(error));
        else
            setBadge(data);
        
        setLoading(false);
    };
    
    return {
        badge,
        loading,
        error,
        fetch,
    };
};
