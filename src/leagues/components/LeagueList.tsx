import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {LeagueCard} from './LeagueCard';
import type {League} from '../types';

interface LeagueListProps {
    leagues: League[];
    onLeagueClick: (id: string) => void;
}

export const LeagueList = ({leagues, onLeagueClick}: LeagueListProps) => {
    if (!leagues.length)
        return (
            <Typography>No leagues found</Typography>
        );
    
    return (
        <Grid container spacing={2}>
            {leagues.map((league) => (
                <Grid key={league.idLeague} size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                }}>
                    <LeagueCard league={league} onClick={onLeagueClick}/>
                </Grid>
            ))}
        </Grid>
    );
};
