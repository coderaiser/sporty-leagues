import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface SportFilterProps {
    sports: string[];
    value: string;
    onChange: (value: string) => void;
    sportCounts: Record<string, number>;
}

export const SportFilter = ({sports, value, onChange, sportCounts}: SportFilterProps) => (
    <FormControl size="small" fullWidth>
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
                    {sport} ({sportCounts[sport]})
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);
