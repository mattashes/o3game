import { renderHook, act } from '@testing-library/react-hooks';
import { useGameEvent, useGameEventEmitter } from '../useGameEvent';
import { GAME_EVENTS } from '../../constants/events';

describe('useGameEvent', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should subscribe to events and receive updates', () => {
    console.log('Testing event subscription and updates...');
    
    const mockCallback = jest.fn();
    const { result } = renderHook(() => 
      useGameEvent(GAME_EVENTS.PLAYER_DAMAGE, mockCallback)
    );

    console.log('Emitting player damage event...');
    act(() => {
      result.current(10);
    });

    expect(mockCallback).toHaveBeenCalledWith(10);
    console.log('Event callback received damage value:', mockCallback.mock.calls[0]);
  });

  test('should handle one-time event subscriptions', () => {
    console.log('Testing one-time event subscription...');
    
    const mockCallback = jest.fn();
    const { result } = renderHook(() => 
      useGameEvent(GAME_EVENTS.PLAYER_LEVEL_UP, mockCallback, true)
    );

    console.log('Emitting level up events...');
    act(() => {
      result.current(2);
      result.current(3);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(2);
    console.log('One-time event callback was called once with level:', mockCallback.mock.calls[0]);
  });

  test('should clean up subscriptions on unmount', () => {
    console.log('Testing subscription cleanup...');
    
    const mockCallback = jest.fn();
    const { result, unmount } = renderHook(() => 
      useGameEvent(GAME_EVENTS.WEAPON_FIRE, mockCallback)
    );

    console.log('Emitting event before unmount...');
    act(() => {
      result.current();
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);

    console.log('Unmounting component...');
    unmount();

    console.log('Emitting event after unmount...');
    act(() => {
      result.current();
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    console.log('Event callback was not called after unmount');
  });
});

describe('useGameEventEmitter', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should create an event emitter function', () => {
    console.log('Testing event emitter creation...');
    
    const mockCallback = jest.fn();
    const { result: listenerHook } = renderHook(() => 
      useGameEvent(GAME_EVENTS.UI_UPDATE_SCORE, mockCallback)
    );
    
    const { result: emitterHook } = renderHook(() => 
      useGameEventEmitter(GAME_EVENTS.UI_UPDATE_SCORE)
    );

    console.log('Emitting score update event...');
    act(() => {
      emitterHook.current(100);
    });

    expect(mockCallback).toHaveBeenCalledWith(100);
    console.log('Event was emitted and received with score:', mockCallback.mock.calls[0]);
  });

  test('should maintain reference equality between renders', () => {
    console.log('Testing emitter function reference stability...');
    
    const { result, rerender } = renderHook(() => 
      useGameEventEmitter(GAME_EVENTS.GAME_START)
    );

    const firstEmitter = result.current;
    
    console.log('Rerendering component...');
    rerender();

    expect(result.current).toBe(firstEmitter);
    console.log('Emitter function reference remained stable');
  });
}); 