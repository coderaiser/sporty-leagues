import {parseError} from './error';

describe('parseError', () => {
    it('returns error message when given an Error instance', () => {
        expect(parseError(Error('something failed'))).toBe('something failed');
    });
    
    it('returns Unknown error when given a non-Error value', () => {
        expect(parseError('not an error' as unknown as Error)).toBe('Unknown error');
    });
});
