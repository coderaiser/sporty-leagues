import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface SportFilterProps {
    sports: string[];
    value: string;
    onChange: (value: string) => void;
}

export const SportFilter = ({sports, value, onChange}: SportFilterProps) => (
    <FormControl size="small">
        <InputLabel id="sport-label">
            Sport
        </InputLabel>
        <Select
            labelId="sport-label"
            label="Sport"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            <MenuItem value="">
                All Sports
            </MenuItem>
            {sports.map((sport) => (
                <MenuItem
                    key={sport}
                    value={sport}
                >
                    {sport}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);
