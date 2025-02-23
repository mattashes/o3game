import { renderHook } from '@testing-library/react-hooks';
import { useGameLoop } from '../useGameLoop';

describe('useGameLoop', () => {
    let mockCallback;
    let requestAnimationFrameSpy;
    let cancelAnimationFrameSpy;
    let performanceNowSpy;
    let currentTime;
    let frameId;
    let animationFrameCallback;

    beforeEach(() => {
        currentTime = 0;
        frameId = 0;
        mockCallback = jest.fn();
        animationFrameCallback = null;
        
        // Mock performance.now to return controlled time
        performanceNowSpy = jest.spyOn(performance, 'now')
            .mockImplementation(() => currentTime);
        
        // Mock requestAnimationFrame to store callback for manual triggering
        requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame')
            .mockImplementation(callback => {
                frameId++;
                animationFrameCallback = callback;
                return frameId;
            });
        
        // Mock cancelAnimationFrame
        cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame')
            .mockImplementation(() => {
                animationFrameCallback = null;
            });
    });

    afterEach(() => {
        jest.clearAllMocks();
        animationFrameCallback = null;
    });

    const triggerAnimationFrame = (time = currentTime) => {
        const callback = animationFrameCallback;
        if (callback) {
            callback(time);
        }
    };

    it('should start game loop when active', () => {
        renderHook(() => useGameLoop(mockCallback, true, 60));
        expect(requestAnimationFrameSpy).toHaveBeenCalled();

        // First frame
        currentTime = 0;
        triggerAnimationFrame();
        expect(mockCallback).not.toHaveBeenCalled(); // First frame only sets previousTimeRef
        
        // Second frame
        currentTime = 17; // ~60fps
        triggerAnimationFrame();
        expect(mockCallback).toHaveBeenCalledWith(17);
    });

    it('should respect FPS limit', () => {
        renderHook(() => useGameLoop(mockCallback, true, 30));
        expect(requestAnimationFrameSpy).toHaveBeenCalled();

        // First frame (sets up previousTimeRef)
        currentTime = 0;
        triggerAnimationFrame();
        expect(mockCallback).not.toHaveBeenCalled();

        // Second frame (16.67ms later, too soon for 30 FPS)
        currentTime = 17;
        triggerAnimationFrame();
        expect(mockCallback).not.toHaveBeenCalled();

        // Third frame (33.34ms total, enough time for 30 FPS)
        currentTime = 34;
        triggerAnimationFrame();
        expect(mockCallback).toHaveBeenCalledWith(34);
    });

    it('should not start loop when inactive', () => {
        renderHook(() => useGameLoop(mockCallback, false, 60));
        expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    });

    it('should clean up on unmount', () => {
        const { unmount } = renderHook(() => useGameLoop(mockCallback, true, 60));
        expect(requestAnimationFrameSpy).toHaveBeenCalled();
        
        unmount();
        expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    });

    it('should handle callback errors', () => {
        const error = new Error('Test error');
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockCallback.mockImplementation(() => {
            throw error;
        });

        renderHook(() => useGameLoop(mockCallback, true, 60));
        
        // First frame to set up previousTimeRef
        currentTime = 0;
        triggerAnimationFrame();
        
        // Second frame to trigger callback
        currentTime = 17;
        triggerAnimationFrame();
        
        expect(consoleSpy).toHaveBeenCalledWith(
            'Error in game loop callback:',
            error.message,
            '\n',
            error
        );
        consoleSpy.mockRestore();
    });

    it('should handle network errors', async () => {
        const networkError = new Error('Network error');
        mockCallback.mockReturnValue(Promise.reject(networkError));

        renderHook(() => useGameLoop(mockCallback, true, 60));
        
        // First frame to set up previousTimeRef
        currentTime = 0;
        triggerAnimationFrame();
        
        // Second frame to trigger callback
        currentTime = 17;
        triggerAnimationFrame();

        // Wait for the promise to reject
        await new Promise(resolve => setTimeout(resolve, 0));
        
        expect(mockCallback).toHaveBeenCalled();
    });
}); 