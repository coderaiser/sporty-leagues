import {
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {server} from './mocks/server';
import {endpoints} from './shared/api/endpoints';
import App from './App';

const noop = () => {};

describe('App', () => {
    it('toolbar renders search and sport filter', async () => {
        render(
            <App/>,
        );
        await waitFor(() => expect(screen.getByLabelText('Search leagues')).toBeInTheDocument());
        expect(screen.getByLabelText('Sport')).toBeInTheDocument();
    });
    
    it('shows spinner on load', () => {
        server.use(http.get(endpoints.leagues, () => new Promise(noop)));
        render(
            <App/>,
        );
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
    
    it('shows league list after load', async () => {
        render(
            <App/>,
        );
        await waitFor(() => expect(screen.getByText('English Premier League')).toBeInTheDocument());
    });
    
    it('shows error page on fetch failure', async () => {
        server.use(http.get(endpoints.leagues, () => HttpResponse.error()));
        render(
            <App/>,
        );
        await waitFor(() => expect(screen.getByText('Something went wrong')).toBeInTheDocument());
    });
    
    it('opens badge modal on card click', async () => {
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('English Premier League'));
        await userEvent.click(screen.getByText('English Premier League'));
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
    
    it('closes badge modal on close button click', async () => {
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('English Premier League'));
        await userEvent.click(screen.getByText('English Premier League'));
        await userEvent.click(screen.getByRole('button', {
            name: 'close',
        }));
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
});

