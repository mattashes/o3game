import { EventService } from '../EventService';
import { GAME_EVENTS } from '../../constants/events';

describe('EventService', () => {
  let eventService;
  let consoleSpy;

  beforeEach(() => {
    eventService = new EventService();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    eventService.clear();
  });

  test('should subscribe to and emit events correctly', () => {
    console.log('Testing basic event subscription and emission...');
    
    const mockCallback = jest.fn();
    eventService.on(GAME_EVENTS.PLAYER_DAMAGE, mockCallback);
    
    console.log('Emitting player damage event with value 10...');
    eventService.emit(GAME_EVENTS.PLAYER_DAMAGE, 10);
    
    expect(mockCallback).toHaveBeenCalledWith(10);
    console.log('Event callback was called with:', mockCallback.mock.calls[0]);
  });

  test('should handle multiple subscribers correctly', () => {
    console.log('Testing multiple event subscribers...');
    
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    
    eventService.on(GAME_EVENTS.GAME_START, mockCallback1);
    eventService.on(GAME_EVENTS.GAME_START, mockCallback2);
    
    console.log('Emitting game start event...');
    eventService.emit(GAME_EVENTS.GAME_START);
    
    expect(mockCallback1).toHaveBeenCalled();
    expect(mockCallback2).toHaveBeenCalled();
    console.log('Both callbacks were called successfully');
  });

  test('should handle once listeners correctly', () => {
    console.log('Testing one-time event listeners...');
    
    const mockCallback = jest.fn();
    eventService.once(GAME_EVENTS.PLAYER_LEVEL_UP, mockCallback);
    
    console.log('Emitting level up event twice...');
    eventService.emit(GAME_EVENTS.PLAYER_LEVEL_UP, 2);
    eventService.emit(GAME_EVENTS.PLAYER_LEVEL_UP, 3);
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(2);
    console.log('Once listener was called exactly once with level:', mockCallback.mock.calls[0]);
  });

  test('should unsubscribe from events correctly', () => {
    console.log('Testing event unsubscription...');
    
    const mockCallback = jest.fn();
    const unsubscribe = eventService.on(GAME_EVENTS.WEAPON_FIRE, mockCallback);
    
    console.log('Emitting weapon fire event before unsubscribe...');
    eventService.emit(GAME_EVENTS.WEAPON_FIRE);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    console.log('Unsubscribing from event...');
    unsubscribe();
    
    console.log('Emitting weapon fire event after unsubscribe...');
    eventService.emit(GAME_EVENTS.WEAPON_FIRE);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    console.log('Callback was not called after unsubscribe');
  });

  test('should handle errors in event callbacks', () => {
    console.log('Testing error handling in event callbacks...');
    
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockCallback = jest.fn(() => {
      throw new Error('Test error');
    });
    
    eventService.on(GAME_EVENTS.GAME_OVER, mockCallback);
    
    console.log('Emitting event that will cause an error...');
    eventService.emit(GAME_EVENTS.GAME_OVER);
    
    expect(errorSpy).toHaveBeenCalled();
    console.log('Error was caught and logged:', errorSpy.mock.calls[0]);
    
    errorSpy.mockRestore();
  });

  test('should track listener count correctly', () => {
    console.log('Testing listener count tracking...');
    
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    
    eventService.on(GAME_EVENTS.UI_UPDATE_SCORE, callback1);
    eventService.on(GAME_EVENTS.UI_UPDATE_SCORE, callback2);
    eventService.once(GAME_EVENTS.UI_UPDATE_SCORE, callback3);
    
    const count = eventService.listenerCount(GAME_EVENTS.UI_UPDATE_SCORE);
    console.log('Current listener count:', count);
    expect(count).toBe(3);
    
    console.log('Emitting event to trigger once listener...');
    eventService.emit(GAME_EVENTS.UI_UPDATE_SCORE);
    
    const newCount = eventService.listenerCount(GAME_EVENTS.UI_UPDATE_SCORE);
    console.log('Listener count after once triggered:', newCount);
    expect(newCount).toBe(2);
  });
}); 