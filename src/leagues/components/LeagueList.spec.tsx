import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {LeagueList} from './LeagueList';
import type {League} from '../types';

const leagues: League[] = [{
    idLeague: '4328',
    strLeague: 'English Premier League',
    strSport: 'Soccer',
    strLeagueAlternate: 'EPL',
}, {
    idLeague: '4387',
    strLeague: 'NBA',
    strSport: 'Basketball',
    strLeagueAlternate: null,
}];

describe('LeagueList', () => {
    it('renders correct number of cards', () => {
        render(
            <LeagueList
                leagues={leagues}
                onLeagueClick={() => {}}
            />,
        );
        
        expect(
            screen.getByText('English Premier League'),
        ).toBeInTheDocument();
        
        expect(
            screen.getByText('NBA'),
        ).toBeInTheDocument();
    });
    
    it('renders empty state when leagues is empty', () => {
        render(
            <LeagueList
                leagues={[]}
                onLeagueClick={() => {}}
            />,
        );
        
        expect(
            screen.getByText('No leagues found'),
        ).toBeInTheDocument();
    });
    
    it('passes league id to onLeagueClick', async () => {
        const user = userEvent.setup();
        const onLeagueClick = vi.fn();
        
        render(
            <LeagueList
                leagues={[leagues[0]]}
                onLeagueClick={onLeagueClick}
            />,
        );
        
        await user.click(
            screen.getByText('English Premier League'),
        );
        
        expect(onLeagueClick)
            .toHaveBeenCalledWith('4328');
    });
});
