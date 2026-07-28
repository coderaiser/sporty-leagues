import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SportFilter} from './SportFilter';

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
                onChange={() => {}}
            />,
        );
        
        await user.click(
            screen.getByRole('combobox'),
        );
        
        expect(
            screen.getByText('All Sports'),
        ).toBeInTheDocument();
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
                onChange={() => {}}
            />,
        );
        
        await user.click(
            screen.getByRole('combobox'),
        );
        
        expect(
            screen.getByText('Soccer'),
        ).toBeInTheDocument();
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
            />,
        );
        
        const select = screen.getByLabelText('Sport');
        
        await user.click(select);
        
        await user.click(
            screen.getByText('Basketball'),
        );
        
        expect(onChange).toHaveBeenCalledWith('Basketball');
    });
});
