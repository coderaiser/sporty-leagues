import TextField from '@mui/material/TextField';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar = ({value, onChange}: SearchBarProps) => (
    <TextField
        label="Search leagues"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        size="small"
    />
);
