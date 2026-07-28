import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ErrorPageProps {
    message: string;
}

export const ErrorPage = ({message}: ErrorPageProps) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            gap: 2,
            textAlign: 'center',
        }}
    >
        <Typography variant="h4" component="h1">
            Something went wrong
        </Typography>
        <Typography variant="body1">
            {message}
        </Typography>
    </Box>
);
