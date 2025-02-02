module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/no-babel', // Preset for Vue 3
    transform: {
      '^.+\\.vue$': 'vue-jest', // Handle .vue files using vue-jest
      '^.+\\.js$': 'babel-jest', // Handle .js files using babel-jest
    },
    moduleFileExtensions: ['js', 'json', 'vue'], // Extensions to resolve
    testEnvironment: 'jsdom', // Use jsdom for simulating a browser environment
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Alias for @ to src folder
    },
    setupFiles: ['<rootDir>/tests/setup.js'], // Optional: global setup file for tests
    collectCoverage: true, // Collect coverage data
    coverageReporters: ['html', 'text', 'lcov'], // Coverage reporters
    verbose: true, // Show detailed test results
  };
  