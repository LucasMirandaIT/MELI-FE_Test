const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", 
    "!src/**/*.d.ts", 
    "!src/app/constants/**", 
    "!src/app/interfaces/**"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/app/$1",
  },
  modulePaths: ["<rootDir>/src"]
};

module.exports = createJestConfig(customJestConfig);
