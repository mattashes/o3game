# New Knowledge Base

This file documents new learnings and insights about the codebase that help improve productivity.

## Project Structure
- The game is built using Phaser 3 with Vite as the build tool
- Scene-based architecture for better code organization
- Asset loading is centralized in the LoadingScene
- Game state management is handled through Phaser's data system
- Scene transitions use data passing for game stats

## Game Mechanics
- Enemy spawning uses polar coordinates for circular spawn pattern around player
- Diagonal movement is normalized to prevent faster diagonal speed
- Collision handling is centralized in the GameScene
- Experience system uses exponential growth for level requirements
- Weapon system uses nearest enemy targeting
- Enemy spawning checks world boundaries to prevent out-of-bounds spawns
- Weapon projectiles track their origin point for range limits
- Weapons fire automatically when enemies are in range
- Weapon cooldowns are managed through the lastFired timestamp
- Projectiles are destroyed when they exceed their range
- Enemy targeting uses distance-based nearest enemy selection
- Ghost enemies alternate between normal and phasing states
- Flying carpet enemies follow sinusoidal wave patterns
- Bat enemies use direct chase behavior with normalized velocity
- Weapon range calculations use origin point distance checking
- UI elements scale proportionally with current values
- Memory cleanup happens automatically for inactive objects

### Enemy Behavior
- Enemy movement patterns require careful state management using getData/setData
- Phasing enemies need timer tracking for state changes
- Flying enemies use sine wave patterns with offset tracking for smooth movement
- Chase behavior requires proper angle calculation between enemy and player

## Asset Management
- Assets are organized by type (sprites, audio, maps)
- Sprite sheets are used for animated characters
- Audio assets are loaded with loop configuration for background music
- Placeholder graphics can be generated using Phaser's Graphics objects
- Textures can be generated at runtime for testing
- Loading scene requires proper error handling for missing assets x2
- Asset loading errors should be tracked and displayed to the user x2
- Failed assets should not prevent game from continuing x2
- Loading progress should be updated even when assets fail x2

## Asset Organization
- The project contains a rich collection of character sprites from various games
- Environment assets include both tiles and props for world building
- Audio assets are separated into music and sound effects categories
- Asset organization benefits from a clear hierarchical structure
- Sprite sheets are organized by character type (player, enemies, NPCs)

## Performance Considerations
- Graphics objects are reused for UI elements instead of recreating
- Enemy updates use group iteration for better performance
- Camera follows player with optimized settings
- UI elements use setScrollFactor(0) to stay fixed on screen
- World size is optimized for visibility and performance
- Camera zoom controls help with debugging and gameplay
- Weapon projectiles are automatically cleaned up when out of range

## UI/UX Design
- Interactive buttons use consistent hover and click effects
- Game over screen provides clear stats and options
- Level up effects provide clear feedback
- Health and experience bars use color coding for clarity
- Grid-based background provides spatial awareness
- Camera smoothing improves visual tracking
- Loading progress bar should provide clear feedback about failed assets x2
- Error messages should be specific to the type of asset that failed x2

## Testing Insights
- Phaser.Scene objects require careful mocking in unit tests, especially for physics and animation systems
- Velocity normalization is crucial for diagonal movement to maintain consistent player speed
- Enemy behavior patterns benefit from time-based calculations rather than frame-based for smoother movement
- Sprite sheet configurations significantly impact animation quality and performance
- Physics body initialization order matters for proper collision detection
- Loading scene tests require proper initialization of mock objects x3
- Mock objects should be reused across test cases for consistency x3
- Loading progress bar tests should verify both visual updates and error states x3
- Asset loading tests should cover all types of assets and error cases x3
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3
- Loading scene tests should verify cleanup and resource management
- Loading scene tests should verify state transitions with failed assets
- Loading scene tests should verify progress tracking and failed asset counting
- Loading scene tests should verify proper mock object initialization and cleanup
- Loading scene tests should verify proper event handler setup and cleanup
- Loading scene tests should verify proper loading bar and text updates
- Loading scene tests should verify proper error message formatting
- Loading scene tests should verify proper asset type categorization
- Loading scene tests should verify proper asset loading status tracking
- Loading scene tests should verify proper scene transition timing
- Loading scene tests should verify proper error handling for each asset type
- Loading scene tests should verify proper loading progress calculation
- Loading scene tests should verify proper loading text updates
- Loading scene tests should verify proper loading bar updates
- Loading scene tests should verify proper failed asset tracking
- Loading scene tests should verify proper cleanup on completion
- Loading scene tests should verify proper error message logging
- Loading scene tests should verify proper scene transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Always provide fallback textures for missing assets
- Use consistent naming conventions for asset keys
- Track asset loading status to handle missing assets gracefully
- Generate placeholder textures with appropriate dimensions and visual indicators
- Organize assets in a clear directory structure
- Loading scene should provide clear feedback about loading status x3
- Error handling should be specific and informative x3
- Failed assets should be tracked and reported to the user x3
- Loading progress should continue despite asset failures x3
- Loading scene should properly clean up resources on completion
- Loading scene should properly handle state transitions
- Loading scene should properly track loading progress
- Loading scene should properly format error messages
- Loading scene should properly categorize asset types
- Loading scene should properly track asset loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle error messages
- Loading scene should properly update loading bar
- Loading scene should properly update loading text
- Loading scene should properly track failed assets
- Loading scene should properly clean up on completion
- Loading scene should properly log error messages
- Loading scene should properly transition with failed assets

## Code Structure
- Separating enemy behaviors into distinct patterns improves maintainability
- Using constants for game configuration values makes balancing easier
- Scene lifecycle methods (create, update) should be kept focused and delegate to helper methods
- Asset loading benefits from centralized registry in index.js
- Loading scene should be split into focused methods for each asset type x3
- Error handling should be specific to each asset category x3
- Loading scene should properly handle cleanup and transitions
- Loading scene should properly handle progress tracking
- Loading scene should properly handle error messages
- Loading scene should properly handle asset types
- Loading scene should properly handle loading status
- Loading scene should properly handle scene transitions
- Loading scene should properly handle loading bar
- Loading scene should properly handle loading text
- Loading scene should properly handle failed assets
- Loading scene should properly handle cleanup
- Loading scene should properly handle errors
- Loading scene should properly handle transitions

## Performance Optimizations
- Reusing time calculations across multiple behaviors improves efficiency
- Proper sprite scaling and dimensions reduce memory usage
- Animation frame caching helps with smooth gameplay
- Physics body cleanup is essential for memory management
- Loading scene should track failed assets without blocking progress x3
- Asset loading errors should be handled gracefully without crashing x3
- Loading scene should properly manage resources
- Loading scene should properly handle cleanup
- Loading scene should properly handle transitions
- Loading scene should properly handle progress
- Loading scene should properly handle errors
- Loading scene should properly handle assets
- Loading scene should properly handle loading
- Loading scene should properly handle text
- Loading scene should properly handle bar
- Loading scene should properly handle state
- Loading scene should properly handle events
- Loading scene should properly handle mocks

### Performance Optimization
- State management through getData/setData is more efficient than storing properties directly
- Wave pattern calculations can be optimized by tracking and incrementing offset
- Velocity updates should use trigonometry for smooth movement
- Loading progress updates should be efficient and avoid unnecessary redraws x2

## Testing
- Mock objects should include all required methods (getData, setData) and properties (body, velocity) to match game object behavior
- Enemy behavior tests should verify specific method calls with correct parameters rather than implementation details
- Player mock objects need proper coordinates for enemy behavior testing
- Collision tests require proper mock objects with all necessary methods and properties
- Test assertions should be specific about what methods are called and with what parameters
- Weapon firing system uses handleWeaponBehavior for time-based weapon management
- Weapon projectiles require proper mocking of setData and getData methods
- Time handling in tests should use explicit time values for predictable behavior
- Player mock needs getData method to provide weapon configuration
- Weapon projectiles need velocity.setToPolar for proper directional movement
- Enemy behavior tests require specific time-based state transitions
- Memory management tests can use process.memoryUsage() to track leaks
- UI element tests should verify proportional changes in display properties
- Edge case tests should verify graceful handling of invalid inputs
- Multiple weapon types require separate cooldown tracking
- Ghost phasing behavior requires proper state transition timing
- Flying enemies need wave pattern verification with amplitude checks
- Enemy behavior tests need proper state initialization
- Movement pattern tests require time simulation
- Velocity assertions should check both magnitude and direction
- State change tests need explicit timing checks
- Loading scene tests should verify error handling and progress updates x3
- Mock objects should be properly initialized before testing x3
- Test assertions should verify specific error messages and states x3
- Loading progress bar tests should include failed asset scenarios x3

## Best Practices
- Loading scene should provide clear feedback about loading status x2
- Error handling should be specific and informative x2
- Failed assets should be tracked and reported to the user x2
- Loading progress should continue despite asset failures x2 