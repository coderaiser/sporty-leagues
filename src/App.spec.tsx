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

const getSportDropdownItem = async (text: string) => {
    await userEvent
        .setup()
        .click(screen.getByLabelText('Sport'));
    return screen.getByText(text);
};

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
    
    it('sport filter shows count for a sport', async () => {
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('English Premier League'));
        const item = await getSportDropdownItem('Soccer (2)');
        
        expect(item).toBeInTheDocument();
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
    
    it('clear filters button appears when search is active', async () => {
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('English Premier League'));
        
        const searchInput = screen.getByLabelText('Search leagues');
        await userEvent.type(searchInput, 'Premier');
        
        expect(screen.getByText('Clear filters')).toBeInTheDocument();
    });
    
    it('clear filters button resets filters when clicked', async () => {
        const user = userEvent.setup();
        
        render(
            <App/>,
        );
        await waitFor(() => screen.getByText('English Premier League'));
        
        await user.type(screen.getByLabelText('Search leagues'), 'Premier');
        await user.click(screen.getByText('Clear filters'));
        
        expect(screen.getByLabelText('Search leagues')).toHaveValue('');
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
