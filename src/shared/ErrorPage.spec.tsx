import {render, screen} from '@testing-library/react';
import {ErrorPage} from './ErrorPage';

describe('ErrorPage', () => {
    it('renders heading', () => {
        render(<ErrorPage message="Network error" />);
        
        expect(
            screen.getByRole('heading', {
                name: 'Something went wrong',
            }),
        ).toBeInTheDocument();
    });
    
    it('renders error message', () => {
        render(<ErrorPage message="Network error" />);
        
        expect(
            screen.getByText('Network error'),
        ).toBeInTheDocument();
    });
});
