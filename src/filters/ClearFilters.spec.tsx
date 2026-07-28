import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ClearFilters} from './ClearFilters';

const noop = () => {};

describe('ClearFilters', () => {
    it('does not render when visible is false', () => {
        render(
            <ClearFilters
                visible={false}
                onClear={noop}
            />,
        );
        
        expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
    });
    
    it('renders when visible is true', () => {
        render(
            <ClearFilters
                visible={true}
                onClear={noop}
            />,
        );
        
        expect(screen.getByText('Clear filters')).toBeInTheDocument();
    });
    
    it('calls onClear on click', async () => {
        const user = userEvent.setup();
        const onClear = vi.fn();
        
        render(
            <ClearFilters
                visible={true}
                onClear={onClear}
            />,
        );
        
        await user.click(screen.getByText('Clear filters'));
        
        expect(onClear).toHaveBeenCalledOnce();
    });
});
