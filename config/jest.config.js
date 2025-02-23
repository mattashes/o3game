export default {
  rootDir: '../',
  setupFilesAfterEnv: ['<rootDir>/test/config/setup.js'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/config/__mocks__/fileMock.js'
  },
  verbose: true,
  testTimeout: 10000,
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|phaser)/)'
  ],
  moduleDirectories: ['node_modules', 'src']
}; 