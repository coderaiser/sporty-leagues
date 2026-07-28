import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SportFilter} from './SportFilter';

const noop = () => {};

const sportCounts = {
    Soccer: 2,
    Basketball: 1,
};

describe('SportFilter', () => {
    it('renders All Sports option', async () => {
        const user = userEvent.setup();
        
        render(
            <SportFilter
                sports={[
                    'Soccer',
                    'Basketball',
                ]}
                value=""
                onChange={noop}
                sportCounts={sportCounts}
            />,
        );
        
        await user.click(screen.getByRole('combobox'));
        
        expect(screen.getByText('All Sports')).toBeInTheDocument();
    });
    
    it('renders sport options', async () => {
        const user = userEvent.setup();
        
        render(
            <SportFilter
                sports={[
                    'Soccer',
                    'Basketball',
                ]}
                value=""
                onChange={noop}
                sportCounts={sportCounts}
            />,
        );
        
        await user.click(screen.getByRole('combobox'));
        
        expect(screen.getByText(/Soccer/)).toBeInTheDocument();
    });
    
    it('calls onChange when sport changes', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        
        render(
            <SportFilter
                sports={[
                    'Soccer',
                    'Basketball',
                ]}
                value=""
                onChange={onChange}
                sportCounts={sportCounts}
            />,
        );
        
        const select = screen.getByLabelText('Sport');
        
        await user.click(select);
        
        await user.click(screen.getByText('Basketball (1)'));
        
        expect(onChange).toHaveBeenCalledWith('Basketball');
    });
    
    it('renders league count next to sport name', async () => {
        const user = userEvent.setup();
        
        render(
            <SportFilter
                sports={[
                    'Soccer',
                    'Basketball',
                ]}
                value=""
                onChange={noop}
                sportCounts={sportCounts}
            />,
        );
        
        await user.click(screen.getByRole('combobox'));
        
        expect(screen.getByText('Soccer (2)')).toBeInTheDocument();
    });
});
