import userEvent from '@testing-library/user-event';
import {
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import App from '../src/App.tsx';

describe('league flow', () => {
    it('renders league list after load', async () => {
        render(
            <App/>,
        );
        await waitFor(() => expect(screen.getByText('English Premier League')).toBeInTheDocument());
    });
    
    it('search filters leagues', async () => {
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('English Premier League'));
        await userEvent.type(screen.getByLabelText('Search leagues'), 'EPL');
        expect(screen.getByText('English Premier League')).toBeInTheDocument();
        expect(screen.queryByText('NBA')).not.toBeInTheDocument();
    });
    
    it('sport filter shows only matching leagues', async () => {
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('NBA'));
        await userEvent.click(screen.getByRole('combobox'));
        await userEvent.click(screen.getByRole('option', {
            name: 'Basketball',
        }));
        expect(screen.getByText('NBA')).toBeInTheDocument();
        expect(screen.queryByText('English Premier League')).not.toBeInTheDocument();
    });
    
    it('opens badge modal when clicking a league card', async () => {
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('NBA'));
        await userEvent.click(screen.getByText('NBA'));
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
    
    it('badge image is visible in modal', async () => {
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('NBA'));
        await userEvent.click(screen.getByText('NBA'));
        await waitFor(() => expect(screen.getByRole('img', {
            name: /badge/i,
        })).toBeInTheDocument());
    });
});
