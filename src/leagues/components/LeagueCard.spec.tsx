import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {LeagueCard} from './LeagueCard';
import type {League} from '../types';

const league: League = {
    idLeague: '4328',
    strLeague: 'English Premier League',
    strSport: 'Soccer',
    strLeagueAlternate: 'EPL',
};

describe('LeagueCard', () => {
    it('renders strLeague', () => {
        render(<LeagueCard league={league} onClick={() => {}}/>);
        expect(screen.getByText('English Premier League')).toBeInTheDocument();
    });
    
    it('renders strSport', () => {
        render(<LeagueCard league={league} onClick={() => {}}/>);
        expect(screen.getByText('Soccer')).toBeInTheDocument();
    });
    
    it('renders strLeagueAlternate', () => {
        render(<LeagueCard league={league} onClick={() => {}}/>);
        expect(screen.getByText('EPL')).toBeInTheDocument();
    });
    
    it('renders "—" when strLeagueAlternate is empty string', () => {
        render(<LeagueCard league={{...league, strLeagueAlternate: ''}} onClick={() => {}}/>);
        expect(screen.getByText('—')).toBeInTheDocument();
    });
    
    it('renders "—" when strLeagueAlternate is null', () => {
        render(<LeagueCard league={{...league, strLeagueAlternate: null}} onClick={() => {}}/>);
        expect(screen.getByText('—')).toBeInTheDocument();
    });
    
    it('calls onClick with idLeague on click', async () => {
        const onClick = vi.fn();
        render(<LeagueCard league={league} onClick={onClick}/>);
        await userEvent.click(screen.getByText('English Premier League'));
        expect(onClick).toHaveBeenCalledWith('4328');
    });
});
