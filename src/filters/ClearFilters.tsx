import Button from '@mui/material/Button';

interface ClearFiltersProps {
    visible: boolean;
    onClear: () => void;
}

export const ClearFilters = ({visible, onClear}: ClearFiltersProps) => {
    if (!visible)
        return null;
    
    return (
        <Button
            variant="text"
            onClick={onClear}
        >
            Clear filters
        </Button>
    );
};
