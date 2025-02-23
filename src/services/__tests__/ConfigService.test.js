import { ConfigService } from '../ConfigService';

describe('ConfigService', () => {
  let configService;
  let consoleSpy;

  beforeEach(() => {
    configService = new ConfigService();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should get configuration values correctly', () => {
    console.log('Testing config value retrieval...');
    
    const musicVolume = configService.get('audio.musicVolume');
    console.log('Retrieved music volume:', musicVolume);
    expect(musicVolume).toBe(0.5);

    const keyboardControls = configService.get('controls.keyboard');
    console.log('Retrieved keyboard controls:', keyboardControls);
    expect(keyboardControls.up).toBe('W');

    const nonExistent = configService.get('nonexistent.path', 'default');
    console.log('Retrieved non-existent path with default:', nonExistent);
    expect(nonExistent).toBe('default');
  });

  test('should set configuration values correctly', () => {
    console.log('Testing config value updates...');

    configService.set('audio.musicVolume', 0.8);
    console.log('Updated music volume to 0.8');
    expect(configService.get('audio.musicVolume')).toBe(0.8);

    configService.set('gameplay.difficulty', 'hard');
    console.log('Updated difficulty to hard');
    expect(configService.get('gameplay.difficulty')).toBe('hard');

    // Test nested path creation
    configService.set('newSection.newValue', 42);
    console.log('Created new config section with value');
    expect(configService.get('newSection.newValue')).toBe(42);
  });

  test('should update multiple values correctly', () => {
    console.log('Testing multiple config updates...');

    const updates = {
      'audio.musicVolume': 0.3,
      'gameplay.difficulty': 'easy',
      'graphics.shadows': false
    };

    configService.updateMultiple(updates);
    console.log('Applied multiple updates:', updates);

    expect(configService.get('audio.musicVolume')).toBe(0.3);
    expect(configService.get('gameplay.difficulty')).toBe('easy');
    expect(configService.get('graphics.shadows')).toBe(false);
  });

  test('should get all configuration', () => {
    console.log('Testing full config retrieval...');

    const fullConfig = configService.getAll();
    console.log('Retrieved full configuration:', fullConfig);

    expect(fullConfig).toEqual(expect.objectContaining({
      audio: expect.any(Object),
      gameplay: expect.any(Object),
      graphics: expect.any(Object),
      controls: expect.any(Object)
    }));
  });
}); 