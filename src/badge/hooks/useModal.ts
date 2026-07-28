import {useState} from 'react';

interface UseModalResult {
    selectedId: string | null;
    open: (id: string) => void;
    close: () => void;
}

export const useModal = (): UseModalResult => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    
    const open = (id: string) => {
        setSelectedId(id);
    };
    
    const close = () => {
        setSelectedId(null);
    };
    
    return {
        selectedId,
        open,
        close,
    };
};
