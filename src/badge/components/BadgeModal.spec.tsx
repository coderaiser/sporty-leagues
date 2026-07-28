import {
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {server} from '../../mocks/server';
import {endpoints} from '../../shared/api/endpoints';
import {BadgeModal} from './BadgeModal';

const defaultProps = {
    id: '4328',
    leagueName: 'English Premier League',
    onClose: () => {},
};

describe('BadgeModal', () => {
    it('renders spinner while loading', () => {
        server.use(http.get(endpoints.seasons, () => new Promise(() => {})));
        render(<BadgeModal {...defaultProps}/>);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
    
    it('renders badge image when url is available', async () => {
        render(<BadgeModal {...defaultProps}/>);
        await waitFor(() => expect(screen.getByRole('img', {name: /badge/i})).toBeInTheDocument());
    });
    
    it('renders error message on fetch failure', async () => {
        server.use(http.get(endpoints.seasons, () => HttpResponse.error()));
        render(<BadgeModal {...defaultProps}/>);
        await waitFor(() => expect(screen.getByText('Unable to load badge')).toBeInTheDocument());
    });
    
    it('renders trophy placeholder when badge is null', async () => {
        server.use(http.get(endpoints.seasons, () => HttpResponse.json({seasons: [{strSeason: '2020', strBadge: null}]})));
        render(<BadgeModal {...defaultProps}/>);
        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
    
    it('calls onClose on close button click', async () => {
        const onClose = vi.fn();
        render(<BadgeModal {...defaultProps} onClose={onClose}/>);
        await userEvent.click(screen.getByRole('button', {name: 'close'}));
        expect(onClose).toHaveBeenCalledOnce();
    });
    
    it('calls onClose on backdrop click', async () => {
        const onClose = vi.fn();
        render(<BadgeModal {...defaultProps} onClose={onClose}/>);
        await userEvent.click(document.querySelector('.MuiBackdrop-root')!);
        expect(onClose).toHaveBeenCalledOnce();
    });
});
