export default {
  testEnvironment: "jsdom", // Simulates a browser-like environment for React
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Adds extra matchers for testing
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Recognizes these file types
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy", // Mocks SCSS/CSS imports to avoid errors
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Uses Babel for transforming modern JavaScript
  },
};
