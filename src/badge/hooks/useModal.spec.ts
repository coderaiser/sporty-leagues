import {renderHook, act} from '@testing-library/react';
import {useModal} from './useModal';

describe('useModal', () => {
    it('has null selectedId initially', () => {
        const {result} = renderHook(() => useModal());
        
        expect(result.current.selectedId).toBeNull();
    });
    
    it('sets selectedId when open is called', () => {
        const {result} = renderHook(() => useModal());
        
        act(() => {
            result.current.open('4328');
        });
        
        expect(result.current.selectedId).toBe('4328');
    });
    
    it('resets selectedId when close is called', () => {
        const {result} = renderHook(() => useModal());
        
        act(() => {
            result.current.open('4328');
        });
        
        act(() => {
            result.current.close();
        });
        
        expect(result.current.selectedId).toBeNull();
    });
    
    it('updates selectedId when opened with a different id', () => {
        const {result} = renderHook(() => useModal());
        
        act(() => {
            result.current.open('4328');
        });
        
        act(() => {
            result.current.open('4387');
        });
        
        expect(result.current.selectedId).toBe('4387');
    });
});
