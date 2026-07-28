import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useLeagues} from './leagues/hooks/useLeagues';
import {useFilters} from './filters/hooks/useFilters';
import {useModal} from './badge/hooks/useModal';
import {Spinner} from './shared/Spinner';
import {ErrorPage} from './shared/ErrorPage';
import {SearchBar} from './filters/SearchBar';
import {SportFilter} from './filters/SportFilter';
import {LeagueList} from './leagues/components/LeagueList';
import {BadgeModal} from './badge/components/BadgeModal';

const App = () => {
    const {
        leagues,
        loading,
        error,
    } = useLeagues();
    
    const {
        search,
        setSearch,
        sport,
        setSport,
        filteredLeagues,
    } = useFilters(leagues);
    
    const {
        selectedId,
        open,
        close,
    } = useModal();
    
    const sports = [...new Set(leagues.map((l) => l.strSport))].sort();
    const selectedLeague = leagues.find((l) => l.idLeague === selectedId);
    
    if (loading)
        return (
            <Spinner/>
        );
    
    if (error)
        return (
            <ErrorPage message={error}/>
        );
    
    return (
        <Box sx={{
            bgcolor: '#121212',
            minHeight: '100vh',
            p: 3,
        }}>
            <Typography variant="h4" sx={{
                color: '#e53935',
                mb: 3,
            }}>
                Sporty Leagues
            </Typography>
            <Stack direction="row" spacing={2} sx={{
                mb: 3,
            }}>
                <SearchBar value={search} onChange={setSearch}/>
                <SportFilter sports={sports} value={sport} onChange={setSport}/>
            </Stack>
            <LeagueList leagues={filteredLeagues} onLeagueClick={open}/>
            <BadgeModal
                id={selectedId}
                leagueName={selectedLeague?.strLeague ?? ''}
                onClose={close}
            />
        </Box>
    );
};

export default App;
