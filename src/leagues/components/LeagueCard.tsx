import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type {League} from '../types';

interface LeagueCardProps {
    league: League;
    onClick: (id: string) => void;
}

export const LeagueCard = ({league, onClick}: LeagueCardProps) => {
    const {
        idLeague,
        strLeague,
        strSport,
        strLeagueAlternate,
    } = league;
    
    return (
        <Card
            sx={{
                cursor: 'pointer',
                borderLeft: '3px solid #e53935',
            }}
            onClick={() => onClick(idLeague)}
        >
            <CardActionArea>
                <CardContent>
                    <Typography variant="h6">{strLeague}</Typography>
                    <Typography variant="body2" color="text.secondary">{strSport}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {strLeagueAlternate || '—'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
