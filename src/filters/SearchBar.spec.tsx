import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SearchBar} from './SearchBar';

const noop = () => {};

describe('SearchBar', () => {
    it('renders input', () => {
        render(
            <SearchBar
                value=""
                onChange={noop}
            />,
        );
        
        expect(screen.getByLabelText('Search leagues')).toBeInTheDocument();
    });
    
    it('calls onChange when user types', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        
        render(
            <SearchBar
                value=""
                onChange={onChange}
            />,
        );
        
        await user.type(screen.getByLabelText('Search leagues'), 'Premier');
        
        expect(onChange).toHaveBeenCalled();
    });
});
