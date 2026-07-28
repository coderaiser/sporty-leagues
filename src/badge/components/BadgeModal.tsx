import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {useEffect} from 'react';
import {useBadge} from '../hooks/useBadge';

interface BadgeModalProps {
    id: string | null;
    leagueName: string;
    onClose: () => void;
}

const boxSx = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: {
        xs: 0,
        sm: 2,
    },
    p: {
        xs: 2,
        sm: 4,
    },
    width: {
        xs: '100vw',
        sm: 'auto',
    },
    minWidth: {
        sm: 280,
    },
    minHeight: {
        xs: '100dvh',
        sm: 'auto',
    },
    textAlign: 'center',
};

export const BadgeModal = ({id, leagueName, onClose}: BadgeModalProps) => {
    const {
        badge,
        loading,
        error,
        fetch,
    } = useBadge();
    
    useEffect(() => {
        if (id)
            fetch(id);
    }, [id, fetch]);
    
    return (
        <Modal open={Boolean(id)} onClose={onClose}>
            <Box sx={boxSx}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                    }}
                >{leagueName}</Typography>
                {loading && <CircularProgress/>}
                {!loading && error && <Typography>Unable to load badge</Typography>}
                {!loading && !error && badge && <img src={badge} alt={`${leagueName} badge`}/>}
                {!loading && !error && !badge && <EmojiEventsIcon
                    sx={{
                        fontSize: 64,
                    }}
                />}
            </Box>
        </Modal>
    );
};
