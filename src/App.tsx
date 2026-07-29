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
import {ClearFilters} from './filters/ClearFilters';
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
        clearFilters,
        isFiltered,
    } = useFilters(leagues);
    
    const {
        selectedId,
        open,
        close,
    } = useModal();
    
    const sports = [...new Set(leagues.map((l) => l.strSport))].sort();
    
    const sportCounts = leagues.reduce<Record<string, number>>((acc, l) => {
        acc[l.strSport] = (acc[l.strSport] ?? 0) + 1;
        return acc;
    }, {});
    
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
        <Box
            sx={{
                minHeight: '100vh',
                p: 3,
            }}
        >
            <Typography
                variant="h4"
                color="primary"
                sx={{
                    mb: 3,
                }}
            >
                Sporty Leagues
            </Typography>
            <Stack
                direction={{
                    xs: 'column',
                    sm: 'row',
                }}
                spacing={2}
                sx={{
                    mb: 3,
                }}
            >
                <SearchBar value={search} onChange={setSearch}/>
                <SportFilter sports={sports} value={sport} onChange={setSport} sportCounts={sportCounts}/>
                <ClearFilters visible={isFiltered} onClear={clearFilters}/>
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
