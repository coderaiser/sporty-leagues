import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        }}
    >
        <CircularProgress size={48}/>
    </Box>
);
